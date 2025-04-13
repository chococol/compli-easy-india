
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get today's date and the date 7 days from now
    const today = new Date();
    const reminderDate = new Date();
    reminderDate.setDate(today.getDate() + 7); // 7 days in the future
    
    // Format dates for comparison with Postgres timestamp
    const todayFormatted = today.toISOString();
    const reminderDateFormatted = reminderDate.toISOString();
    
    // Get all upcoming deadlines within reminder period (next 7 days) that haven't been notified
    const { data: upcomingDeadlines, error: deadlinesError } = await supabase
      .from('compliance_deadlines')
      .select(`
        *,
        notification_preferences(email_notifications, reminder_days_before)
      `)
      .eq('notification_sent', false)
      .eq('status', 'pending')
      .gte('due_date', todayFormatted)
      .lte('due_date', reminderDateFormatted);
    
    if (deadlinesError) {
      throw deadlinesError;
    }
    
    console.log(`Found ${upcomingDeadlines?.length || 0} upcoming deadlines`);
    
    // Process each deadline
    const processedDeadlines = [];
    
    for (const deadline of upcomingDeadlines || []) {
      try {
        // In a real implementation, we'd send an email notification here
        console.log(`Would send notification for deadline: ${deadline.title} due on ${deadline.due_date}`);
        
        // Mark as notified in the database
        const { error: updateError } = await supabase
          .from('compliance_deadlines')
          .update({ notification_sent: true })
          .eq('id', deadline.id);
        
        if (updateError) {
          console.error(`Failed to update notification status for deadline ${deadline.id}:`, updateError);
          continue;
        }
        
        processedDeadlines.push(deadline.id);
      } catch (err) {
        console.error(`Error processing deadline ${deadline.id}:`, err);
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `Processed ${processedDeadlines.length} deadline notifications`,
        processedDeadlines
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
    
  } catch (error) {
    console.error("Error in deadline-reminders function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
