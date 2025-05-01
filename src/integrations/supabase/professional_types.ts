
// This file contains additional type definitions for tables not included in the auto-generated types
import { Database as OriginalDatabase } from './types';

export interface ProfessionalProfile {
  id: string;
  user_id: string;
  professional_type: 'CA' | 'CS';
  full_name: string | null;
  license_number: string | null;
  is_onboarding_complete: boolean;
  created_at: string;
  updated_at: string | null;
}

export type Database = OriginalDatabase & {
  public: {
    Tables: {
      professional_profiles: {
        Row: ProfessionalProfile;
        Insert: Partial<ProfessionalProfile> & { user_id: string; professional_type: 'CA' | 'CS' };
        Update: Partial<ProfessionalProfile>;
        Relationships: [
          {
            foreignKeyName: "professional_profiles_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ]
      }
    } & OriginalDatabase['public']['Tables'];
  } & Omit<OriginalDatabase['public'], 'Tables'>;
};

// Export the extended client type for use in our application
export * from './types';
