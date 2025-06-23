// App.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  // ADD THESE IMPORTS:
  FormControl, // Added
  InputLabel, // Added
  Select,      // Added
  MenuItem,    // Added
  OutlinedInput, // Added

} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Import components
import ProjectDashboard from './components/ProjectDashboard';
import ComplianceDashboard from './components/ComplianceDashboard';
import PlaceholderComponent from './components/PlaceholderComponent';
import WorkflowView from './components/WorkflowView';
import ProgramManagementView from './components/ProgramManagementView';
import VendorDashboard from './components/VendorDashboard';
import LedgerView from './components/LedgerView';
import SbomEditor from './components/SbomEditor';
import ApiMonitoring from './components/ApiMonitoring';
import UserManagement from './components/UserManagement';
import AiInsights from './components/AiInsights';
import Notifications from './components/Notifications';
import SettingsAdmin from './components/SettingsAdmin';


// Import data
import { dummyProjectData, dummyComplianceData } from './data/dummyData';
import { navigationItems } from './data/navigationItems';

const drawerWidth = 280;

function App() {
  const [currentPage, setCurrentPage] = useState('project-dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const handleDrawerToggle = () => { // <--- This is the definition
    setMobileOpen(!mobileOpen);
    };
  // Project Dashboard Multi-select State
  const allProjectsList = Object.keys(dummyProjectData).map(key => ({
    id: key,
    name: key.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }));
  const [selectedProjectIds, setSelectedProjectIds] = useState([allProjectsList[0]?.id || 'project-alpha']); // Default to the first project or 'project-alpha'

  const handleProjectSelectChange = (event) => {
    const {
      target: { value },
    } = event;

    if (value.includes('all')) {
      setSelectedProjectIds(allProjectsList.map(p => p.id));
    } else if (value.length === 0) {
      setSelectedProjectIds([]); // Allow no projects to be selected
    } else {
      setSelectedProjectIds(typeof value === 'string' ? value.split(',') : value);
    }
  };


  const getSelectedProjectData = () => {
    if (selectedProjectIds.length === 0 || selectedProjectIds.length === allProjectsList.length) {
      // If 'All Projects' or no projects are selected, consolidate data
      // This is a simplified consolidation; in a real app, you'd aggregate metrics
      const firstProjectKey = Object.keys(dummyProjectData)[0];
      return dummyProjectData[firstProjectKey]; // Just return the first project's data for simplicity
    } else {
      // Return data for the first selected project for now, as the current dashboard displays one project's data.
      // For true multi-select, the dashboard components would need to be re-architected to handle aggregated data.
      return dummyProjectData[selectedProjectIds[0]];
    }
  };


const renderContent = () => {
  const currentProjectData = getSelectedProjectData();
  switch (currentPage) {
    case 'project-dashboard':
      return (
        <ProjectDashboard
          allProjects={allProjectsList}
          selectedProjectData={currentProjectData}
          onProjectChange={{
            selectedIds: selectedProjectIds,
            handleChange: handleProjectSelectChange,
          }}
        />
      );
    case 'compliance-dashboard':
      return <ComplianceDashboard data={dummyComplianceData} />;
    case 'workflow-view':
      return <WorkflowView />;
    case 'program-management':
      return <ProgramManagementView />;
    case 'vendor-dashboard':
      return <VendorDashboard data={dummyComplianceData.vendorData} />;
    case 'ledger-view':
      return <LedgerView data={dummyComplianceData.ledgerData} />;
    case 'sbom-editor':
      return <SbomEditor data={dummyComplianceData.sbomEditorData} />;
    case 'api-monitoring':
      return <ApiMonitoring data={dummyComplianceData.apiMonitoringData} />;
    case 'user-management':
      return <UserManagement data={dummyComplianceData.userManagementData} />;
    case 'ai-insights':
      return <AiInsights data={dummyComplianceData.aiInsightsData} />;
    case 'notifications':
      return <Notifications data={dummyComplianceData.notificationsData} />;
    case 'settings-admin':
      return <SettingsAdmin data={dummyComplianceData.settingsAdminData} />;
    default:
      const currentItem = navigationItems.find(item => item.id === currentPage);
      return <PlaceholderComponent title={currentItem?.name || 'Dashboard'} />;
  }
};


  const drawer = (
    <Box sx={{ height: '100%', backgroundColor: '#1a1a1a', color: 'white' }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ color: '#64b5f6', mb: 3 }}>
          Project Console
        </Typography>
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                selected={currentPage === item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  '&.Mui-selected': {
                    backgroundColor: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                  },
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          backgroundColor: 'white',
          color: 'text.primary',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}> {/* Adjusted Toolbar for spacing */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle} // This is defined now
            sx={{ mr: 2, display: { lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" fontWeight="medium">
            {navigationItems.find(item => item.id === currentPage)?.name || 'Dashboard'}
          </Typography>
          {currentPage === 'project-dashboard' && ( // Show project selector only on Project Dashboard
            <FormControl sx={{ m: 1, minWidth: 120, display: { xs: 'none', md: 'block' } }} size="small">
              <InputLabel id="appbar-project-select-label">Project</InputLabel>
              <Select
                labelId="appbar-project-select-label"
                id="appbar-project-select"
                multiple
                value={selectedProjectIds}
                onChange={handleProjectSelectChange}
                input={<OutlinedInput label="Project" />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>All Projects</em>;
                  }
                  if (selected.length === allProjectsList.length) {
                    return <em>All Projects</em>;
                  }
                  const selectedNames = allProjectsList
                    .filter(project => selected.includes(project.id))
                    .map(project => project.name);
                  return selectedNames.join(', ');
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 224,
                      width: 250,
                    },
                  },
                }}
              >
                <MenuItem value="all">
                  <em>All Projects</em>
                </MenuItem>
                {allProjectsList.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle} // This is defined now
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#f5f5f5'
        }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
}

export default App;