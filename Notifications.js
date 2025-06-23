// components/Notifications.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  FormGroup,
  Divider,Grid, Stack
} from '@mui/material';
import {
  List as AntList,
  Tag,
  Badge,
  Empty, message
} from 'antd';
import { Bell, Settings, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import Card from './Card';

const Notifications = ({ data }) => {
  const [notificationSettings, setNotificationSettings] = useState(data.settings);

  const handleSettingChange = (event) => {
    setNotificationSettings({
      ...notificationSettings,
      [event.target.name]: event.target.checked,
    });
    message.success(`Notification setting updated: ${event.target.name}`);
  };

  const getNotificationStatusColor = (read) => (read ? 'default' : 'processing');

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
        Notifications
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card title="Your Notifications">
            {data.unreadNotifications.length > 0 ? (
              <AntList
                dataSource={data.unreadNotifications}
                renderItem={(item) => (
                  <AntList.Item>
                    <AntList.Item.Meta
                      avatar={<Badge status={getNotificationStatusColor(item.read)} />}
                      title={
                        <Typography variant="body2" fontWeight="medium">
                          {item.message}
                        </Typography>
                      }
                      description={
                        <Typography variant="caption" color="text.secondary">
                          {item.timestamp}
                        </Typography>
                      }
                    />
                    <Button size="small" variant="outlined">Mark as Read</Button>
                  </AntList.Item>
                )}
                locale={{ emptyText: <Empty description="No unread notifications" /> }}
              />
            ) : (
              <Empty description="No unread notifications" />
            )}
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={1}>
              <Button startIcon={<Bell size={16} />}>View All</Button>
              <Button startIcon={<CheckCircle size={16} />}>Mark All Read</Button>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card title="Notification Settings">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.emailAlerts}
                    onChange={handleSettingChange}
                    name="emailAlerts"
                  />
                }
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Mail size={20} /> <Typography variant="body2">Email Alerts</Typography>
                  </Stack>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.inAppNotifications}
                    onChange={handleSettingChange}
                    name="inAppNotifications"
                  />
                }
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Bell size={20} /> <Typography variant="body2">In-App Notifications</Typography>
                  </Stack>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.smsAlerts}
                    onChange={handleSettingChange}
                    name="smsAlerts"
                  />
                }
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <MessageSquare size={20} /> <Typography variant="body2">SMS Alerts</Typography>
                  </Stack>
                }
              />
            </FormGroup>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Configure specific alerts:
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.securityAlerts}
                    onChange={handleSettingChange}
                    name="securityAlerts"
                  />
                }
                label={<Typography variant="body2">Security Findings</Typography>}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.complianceUpdates}
                    onChange={handleSettingChange}
                    name="complianceUpdates"
                  />
                }
                label={<Typography variant="body2">Compliance Updates</Typography>}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.newFeatures}
                    onChange={handleSettingChange}
                    name="newFeatures"
                  />
                }
                label={<Typography variant="body2">New Features & Announcements</Typography>}
              />
            </FormGroup>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Notifications;