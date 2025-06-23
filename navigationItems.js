import { 
  Home, 
  ClipboardList, 
  Package, 
  Users, 
  Settings, 
  BarChart, 
  Bell, 
  Info, 
  Workflow, 
  Folder 
} from 'lucide-react';

export const navigationItems = [
  { id: 'project-dashboard', name: 'Project Dashboard', icon: <Home size={20} /> },
  { id: 'compliance-dashboard', name: 'Compliance Dashboard', icon: <ClipboardList size={20} /> },
  { id: 'vendor-dashboard', name: 'Vendor/Partner Dashboard', icon: <Users size={20} /> },
  { id: 'workflow-view', name: 'AI Assisted WorkFlow', icon: <Workflow size={20} /> },
  { id: 'ledger-view', name: 'Smart Ledger', icon: <Folder size={20} /> },
  { id: 'sbom-editor', name: 'SBOM & Policy Editor', icon: <Package size={20} /> },
  { id: 'api-monitoring', name: 'API Monitoring', icon: <BarChart size={20} /> },
  { id: 'user-management', name: 'User & Role Management', icon: <Users size={20} /> },
  { id: 'program-management', name: 'Project Management', icon: <BarChart size={20} /> },
  { id: 'ai-insights', name: 'AI Insights', icon: <Info size={20} /> },
  { id: 'notifications', name: 'Notifications', icon: <Bell size={20} /> },
  { id: 'settings-admin', name: 'Settings & Admin', icon: <Settings size={20} /> },
];
