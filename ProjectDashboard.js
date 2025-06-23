// components/ProjectDashboard.js
import React, { useState } from 'react';
import { Info, Folder, Workflow, CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react'; // Added icons
import {
  Box,
  Grid,
  LinearProgress,
  Chip,
  Avatar,
  Typography,
  Select, // Added Select
  MenuItem, // Added MenuItem
  FormControl, // Added FormControl
  InputLabel, // Added InputLabel
  OutlinedInput, // Added OutlinedInput for multiselect
  Badge as MuiBadge, // Renamed to avoid conflict with Ant Design Badge
  Stack, // Added Stack for consistent spacing
} from '@mui/material';
import {
  Table,
  Timeline,
  Tag,
  Badge,
  List as AntList,
  Progress, // Added Ant Design Progress for a different look
} from 'antd';
import Card from './Card'; // Assuming your Card component path

// Helper function for Ant Design Tag colors
const getAntTagStatusColor = (status) => {
  switch (status) {
    case 'completed': return 'success';
    case 'upcoming': return 'processing';
    case 'delayed': return 'error';
    case 'active': return 'blue';
    case 'critical': return 'red';
    case 'stable': return 'green';
    default: return 'default';
  }
};

const ProjectDashboard = ({ allProjects, selectedProjectData, onProjectChange }) => {
  const getComplianceStatusColor = (status) => {
    switch (status) {
      case 'green': return 'success';
      case 'yellow': return 'warning';
      case 'red': return 'error';
      default: return 'default';
    }
  };

  const getHandoffStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'processing';
      case 'Pending': return 'warning';
      default: return 'default';
    }
  };

  const handoffColumns = [
    {
      title: 'Phase',
      dataIndex: 'phase',
      key: 'phase',
      render: (text) => <Typography variant="body2" fontWeight="medium">{text}</Typography>
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      render: (text) => <Typography variant="body2" color="text.secondary">{text}</Typography>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={getHandoffStatusColor(status)}>{status}</Tag>
    },
  ];

  const milestoneTimelineItems = selectedProjectData.milestones.map((milestone, index) => ({
    key: index,
    dot: milestone.status === 'completed' ?
      <Badge status="success" /> :
      milestone.status === 'delayed' ?
        <Badge status="error" /> :
        <Badge status="processing" />,
    children: (
      <Box>
        <Typography variant="subtitle1" fontWeight="medium">
          {milestone.name}
          {milestone.status === 'completed' && (
            <Tag color="success" style={{ marginLeft: 8 }}>Completed</Tag>
          )}
          {milestone.status === 'delayed' && (
            <Tag color="error" style={{ marginLeft: 8 }}>Delayed</Tag>
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Due: {milestone.date}
        </Typography>
      </Box>
    ),
  }));

  const dependencyColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Typography variant="body2" fontWeight="medium">{text}</Typography>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color;
        let icon;
        switch (status) {
          case 'stable':
            color = 'green';
            icon = <CheckCircle size={14} />;
            break;
          case 'critical':
            color = 'red';
            icon = <XCircle size={14} />;
            break;
          case 'pending':
            color = 'orange';
            icon = <Clock size={14} />;
            break;
          default:
            color = 'default';
            icon = null;
        }
        return (
          <Tag icon={icon} color={color}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Tag>
        );
      },
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      render: (text) => <Typography variant="body2" color="text.secondary">{text}</Typography>
    },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Project Dashboard
        </Typography>
        <FormControl sx={{ minWidth: 200, maxWidth: 300 }}>
          <InputLabel id="project-select-label">Select Projects</InputLabel>
          <Select
            labelId="project-select-label"
            id="project-select"
            multiple
            value={onProjectChange.selectedIds} // This will be an array of selected project IDs
            onChange={onProjectChange.handleChange}
            input={<OutlinedInput label="Select Projects" />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>All Projects</em>;
              }
              if (selected.length === allProjects.length) {
                return <em>All Projects</em>;
              }
              const selectedNames = allProjects
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
            {allProjects.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Project Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6} lg={4}>
          <Card title="Project Progress Summary">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {selectedProjectData.summary}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              <Progress
                percent={selectedProjectData.progress}
                status={selectedProjectData.progress === 100 ? 'success' : 'active'}
                strokeColor={{ from: '#108ee9', to: '#87d068' }}
                showInfo
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Current phase: {selectedProjectData.currentPhase}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card title="Overall Compliance Status">
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
              <MuiBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  selectedProjectData.complianceStatus === 'green' ?
                    <CheckCircle color="success" /> :
                    selectedProjectData.complianceStatus === 'yellow' ?
                      <Clock color="warning" /> :
                      <XCircle color="error" />
                }
              >
                <Avatar sx={{ bgcolor: getComplianceStatusColor(selectedProjectData.complianceStatus), width: 56, height: 56 }}>
                  <Info sx={{ color: 'white', fontSize: 32 }} />
                </Avatar>
              </MuiBadge>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {selectedProjectData.complianceStatus.charAt(0).toUpperCase() + selectedProjectData.complianceStatus.slice(1)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Checks for security, policy, and legal adherence.
                </Typography>
              </Box>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={selectedProjectData.complianceScore} // Assuming a score is now available
              color={getComplianceStatusColor(selectedProjectData.complianceStatus)}
              sx={{ height: 8, borderRadius: 4, mb: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              Compliance Score: {selectedProjectData.complianceScore}%
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card title="Key Performance Indicators">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Team Velocity</Typography>
                <Typography variant="h6" fontWeight="bold">{selectedProjectData.kpis.velocity} pts/sprint</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Open Bugs</Typography>
                <Typography variant="h6" fontWeight="bold">{selectedProjectData.kpis.openBugs}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Risk Level</Typography>
                <Chip
                  label={selectedProjectData.kpis.riskLevel.toUpperCase()}
                  color={selectedProjectData.kpis.riskLevel === 'high' ? 'error' : selectedProjectData.kpis.riskLevel === 'medium' ? 'warning' : 'success'}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Budget Adherence</Typography>
                <Typography variant="h6" fontWeight="bold">{selectedProjectData.kpis.budgetAdherence}%</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      {/* Milestone Timeline & Upcoming Deliverables */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={6}>
          <Card title="Milestone Timeline & Health">
            <Timeline items={milestoneTimelineItems} />
            <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(25, 118, 210, 0.05)', borderRadius: 2 }}>
              <Typography variant="body2" color="primary" fontWeight="medium">
                Next Major Milestone: {selectedProjectData.nextMajorMilestone.name} (Due: {selectedProjectData.nextMajorMilestone.date})
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card title="Upcoming Deliverables">
            <AntList
              dataSource={selectedProjectData.upcomingDeliverables}
              locale={{ emptyText: 'No upcoming deliverables.' }}
              renderItem={(item) => (
                <AntList.Item>
                  <AntList.Item.Meta
                    title={
                      <Typography variant="subtitle1" fontWeight="medium">
                        {item.name}
                      </Typography>
                    }
                    description={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Tag color={getAntTagStatusColor(item.status || 'upcoming')}>
                          {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'Upcoming'}
                        </Tag>
                        <Typography variant="body2" color="text.secondary">
                          Due: {item.dueDate}
                        </Typography>
                      </Stack>
                    }
                  />
                  <Chip
                    label={item.owner}
                    avatar={<Avatar>{item.owner.charAt(0)}</Avatar>}
                    size="small"
                  />
                </AntList.Item>
              )}
            />
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity & Handoff Tracking */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={6}>
          <Card title="Recent Activity Feed">
            <AntList
              dataSource={selectedProjectData.recentActivity}
              locale={{ emptyText: 'No recent activity.' }}
              renderItem={(item) => (
                <AntList.Item>
                  <AntList.Item.Meta
                    avatar={
                      <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                        {item.type === 'Comment' ? <Info size={18} /> :
                         item.type === 'File Upload' ? <Folder size={18} /> :
                         <Workflow size={18} />}
                      </Avatar>
                    }
                    title={
                      <Typography variant="body2">
                        <strong>{item.user}</strong> {item.description}
                      </Typography>
                    }
                    description={
                      <Typography variant="caption" color="text.secondary">
                        {item.timestamp}
                      </Typography>
                    }
                  />
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <Chip
                        label="View"
                        icon={<ExternalLink size={14} />}
                        onClick={() => window.open(item.link, '_blank')}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </a>
                  )}
                </AntList.Item>
              )}
            />
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card title="Handoff Tracking & Ownership">
            <Table
              dataSource={selectedProjectData.handoffTracking}
              columns={handoffColumns}
              pagination={false}
              size="small"
              locale={{ emptyText: 'No handoff data available.' }}
            />
             <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(25, 118, 210, 0.05)', borderRadius: 2 }}>
              <Typography variant="body2" color="primary" fontWeight="medium">
                Current Bottleneck: {selectedProjectData.bottlenecks.current || 'None'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Last identified: {selectedProjectData.bottlenecks.lastIdentified || 'N/A'}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* New Row for External Dependencies and Team Health */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Card title="External Dependencies">
            <Table
              dataSource={selectedProjectData.externalDependencies}
              columns={dependencyColumns}
              pagination={{ pageSize: 5 }}
              size="small"
              locale={{ emptyText: 'No external dependencies tracked.' }}
            />
             <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(25, 118, 210, 0.05)', borderRadius: 2 }}>
              <Typography variant="body2" color="primary" fontWeight="medium">
                Critical Dependencies: {selectedProjectData.externalDependencies.filter(dep => dep.status === 'critical').length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Ensure timely communication for updates and issues.
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card title="Team Health & Resource Utilization">
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Team Morale</Typography>
                <Chip
                  label={selectedProjectData.teamHealth.morale.toUpperCase()}
                  color={selectedProjectData.teamHealth.morale === 'high' ? 'success' : selectedProjectData.teamHealth.morale === 'medium' ? 'warning' : 'error'}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Burnout Risk</Typography>
                <Chip
                  label={selectedProjectData.teamHealth.burnoutRisk.toUpperCase()}
                  color={selectedProjectData.teamHealth.burnoutRisk === 'low' ? 'success' : selectedProjectData.teamHealth.burnoutRisk === 'medium' ? 'warning' : 'error'}
                  size="small"
                />
              </Grid>
            </Grid>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">Resource Utilization:</Typography>
            {selectedProjectData.teamHealth.resourceUtilization.map((resource, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">{resource.role}</Typography>
                <LinearProgress
                  variant="determinate"
                  value={resource.utilization}
                  sx={{ height: 6, borderRadius: 3 }}
                  color={resource.utilization > 90 ? 'error' : resource.utilization > 70 ? 'warning' : 'primary'}
                />
                <Typography variant="caption" color="text.secondary">{resource.utilization}%</Typography>
              </Box>
            ))}
             <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(25, 118, 210, 0.05)', borderRadius: 2 }}>
              <Typography variant="body2" color="primary" fontWeight="medium">
                Action Required: Consider re-allocating resources or hiring.
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Identified high utilization in {selectedProjectData.teamHealth.resourceUtilization.filter(r => r.utilization > 90).map(r => r.role).join(', ') || 'no roles'}.
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectDashboard;