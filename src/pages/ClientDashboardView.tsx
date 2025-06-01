
import React from 'react';
import { useParams } from 'react-router-dom';
import Dashboard from './Dashboard';

const ClientDashboardView = () => {
  const { clientId } = useParams();
  
  // This component renders the client dashboard but in the context
  // of a professional viewing it. The actual client dashboard logic
  // remains in Dashboard.tsx, but the routing context changes the sidebar behavior
  
  return <Dashboard />;
};

export default ClientDashboardView;
