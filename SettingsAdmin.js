// components/SettingsAdmin.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Stack,  FormGroup 
} from '@mui/material';
import {
  message,
} from 'antd';
import { ExpandMore } from '@mui/icons-material'; 
import { Save, RefreshCcw, Database, Shield, Users, Bell } from 'lucide-react';
import Card from './Card';

const SettingsAdmin = ({ data }) => {
  const [systemSettings, setSystemSettings] = useState(data.systemSettings);
  const [securitySettings, setSecuritySettings] = useState(data.securitySettings);
  const [logSettings, setLogSettings] = useState(data.logSettings);

  const handleSystemSettingChange = (e) => {
    setSystemSettings({ ...systemSettings, [e.target.name]: e.target.value });
  };

  const handleSecuritySettingChange = (e) => {
    setSecuritySettings({ ...securitySettings, [e.target.name]: e.target.checked });
  };

  const handleLogSettingChange = (e) => {
    setLogSettings({ ...logSettings, [e.target.name]: e.target.value });
  };

  const handleSaveSettings = (settingType) => {
    message.success(`${settingType} settings saved successfully!`);
  };

  const handleResetSettings = (settingType) => {
    // In a real app, you'd fetch initial settings or reset to defaults
    message.info(`${settingType} settings reset.`);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
        Settings & Admin
      </Typography>

      <Accordion defaultExpanded sx={{ mb: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Database size={20} />
            <Typography variant="h6">General System Settings</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            label="Application Name"
            name="appName"
            value={systemSettings.appName}
            onChange={handleSystemSettingChange}
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label="Default Timezone"
            name="timezone"
            value={systemSettings.timezone}
            onChange={handleSystemSettingChange}
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label="Data Retention Period (days)"
            name="dataRetention"
            value={systemSettings.dataRetention}
            onChange={handleSystemSettingChange}
            type="number"
            margin="normal"
            size="small"
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<Save size={16} />}
              onClick={() => handleSaveSettings('System')}
            >
              Save System Settings
            </Button>
            <Button
              variant="outlined"
              startIcon={<RefreshCcw size={16} />}
              onClick={() => handleResetSettings('System')}
            >
              Reset
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{ mb: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Shield size={20} />
            <Typography variant="h6">Security Settings</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={securitySettings.mfaEnabled}
                  onChange={handleSecuritySettingChange}
                  name="mfaEnabled"
                />
              }
              label="Enable Multi-Factor Authentication (MFA)"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={securitySettings.passwordPolicyEnforced}
                  onChange={handleSecuritySettingChange}
                  name="passwordPolicyEnforced"
                />
              }
              label="Enforce Strong Password Policy"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={securitySettings.autoLogoutEnabled}
                  onChange={handleSecuritySettingChange}
                  name="autoLogoutEnabled"
                />
              }
              label="Enable Auto-Logout for Inactivity (30 min)"
            />
          </FormGroup>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<Save size={16} />}
              onClick={() => handleSaveSettings('Security')}
            >
              Save Security Settings
            </Button>
            <Button
              variant="outlined"
              startIcon={<RefreshCcw size={16} />}
              onClick={() => handleResetSettings('Security')}
            >
              Reset
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{ mb: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Bell size={20} />
            <Typography variant="h6">Logging & Audit</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            label="Log Level"
            name="logLevel"
            value={logSettings.logLevel}
            onChange={handleLogSettingChange}
            margin="normal"
            size="small"
          />
          <FormControlLabel
            control={
              <Switch
                checked={logSettings.auditTrailEnabled}
                onChange={(e) => setLogSettings({ ...logSettings, auditTrailEnabled: e.target.checked })}
                name="auditTrailEnabled"
              />
            }
            label="Enable Detailed Audit Trail"
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<Save size={16} />}
              onClick={() => handleSaveSettings('Logging')}
            >
              Save Logging Settings
            </Button>
            <Button
              variant="outlined"
              startIcon={<RefreshCcw size={16} />}
              onClick={() => handleResetSettings('Logging')}
            >
              Reset
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SettingsAdmin;