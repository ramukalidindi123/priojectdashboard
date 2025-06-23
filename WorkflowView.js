import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  Grid,
  Menu,
  MenuItem,
  Chip,
  LinearProgress,
  Card as MuiCard,
  CardContent,
  CardActions,
  Divider,
  Stack,
  Alert,
} from '@mui/material';
import { 
  List, 
  Tag, 
  Table, 
  Progress, 
  Row, 
  Col, 
  Statistic, 
  Badge,
  Space,
  Tooltip
} from 'antd';
import {
  FileText,
  Code,
  TestTube,
  Bug,
  Rocket,
  BarChart3,
  FileSpreadsheet,
  FileImage,
  Download,
  Upload,
  Cloud,
  BookOpen,
  Users,
  Workflow,
  FileCode,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Card from './Card';
import { dummyComplianceData } from '../data/dummyData';

const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
  </div>
);

const WorkflowView = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [importMenuAnchor, setImportMenuAnchor] = useState(null);
  const [exportMenuAnchor, setExportMenuAnchor] = useState(null);
  const [fetchMenuAnchor, setFetchMenuAnchor] = useState(null);
  
  const handleTabChange = (_, newValue) => setTabIndex(newValue);

  const {
    requirementToCodeMapping,
    testCasesToRequirementMapping,
    unitTests,
    bugs,
    deployments,
    codeQuality,
    documentation
  } = dummyComplianceData;

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'success';
      case 'moderate': return 'warning';
      case 'bad': return 'error';
      default: return 'default';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} color="green" />;
      case 'down': return <TrendingDown size={16} color="red" />;
      case 'stable': return <Minus size={16} color="gray" />;
      default: return null;
    }
  };

  const getDocStatusIcon = (status) => {
    switch (status) {
      case 'complete': return <CheckCircle size={20} color="green" />;
      case 'in-progress': return <AlertTriangle size={20} color="orange" />;
      case 'pending': return <XCircle size={20} color="red" />;
      default: return null;
    }
  };

  const importOptions = [
    { name: 'Excel', icon: <FileSpreadsheet size={16} /> },
    { name: 'Word', icon: <FileText size={16} /> },
    { name: 'PDF', icon: <FileText size={16} /> },
    { name: 'Image', icon: <FileImage size={16} /> },
  ];

  const exportOptions = [
    { name: 'Excel', icon: <FileSpreadsheet size={16} /> },
    { name: 'Word', icon: <FileText size={16} /> },
    { name: 'PDF', icon: <FileText size={16} /> },
  ];

  const fetchOptions = [
    { name: 'Jira', icon: <Cloud size={16} /> },
    { name: 'Monday', icon: <Cloud size={16} /> },
    { name: 'Azure DevOps', icon: <Cloud size={16} /> },
    { name: 'Smart Sheet', icon: <Cloud size={16} /> },
  ];

  const tabs = [
    { label: 'Requirements', icon: <FileText size={18} /> },
    { label: 'Code', icon: <Code size={18} /> },
    { label: 'Unit', icon: <TestTube size={18} /> },
    { label: 'Test Case', icon: <Bug size={18} /> },
    { label: 'Bugs', icon: <AlertTriangle size={18} /> },
    { label: 'Code Quality', icon: <BarChart3 size={18} /> },
    { label: 'Documentation', icon: <BookOpen size={18} /> },
    { label: 'Deployment', icon: <Rocket size={18} /> },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
        Workflow View
      </Typography>

      <Tabs 
        value={tabIndex} 
        onChange={handleTabChange} 
        sx={{ mb: 3 }}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab, index) => (
          <Tab 
            key={index}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {tab.icon}
                {tab.label}
              </Box>
            }
          />
        ))}
      </Tabs>

      {/* Requirements Tab */}
      <TabPanel value={tabIndex} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card title="Requirements Management">
              <Box sx={{ mb: 3 }}>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<Upload size={16} />}
                    onClick={(e) => setImportMenuAnchor(e.currentTarget)}
                    color="primary"
                  >
                    Import
                  </Button>
                  <Menu
                    anchorEl={importMenuAnchor}
                    open={Boolean(importMenuAnchor)}
                    onClose={() => setImportMenuAnchor(null)}
                  >
                    {importOptions.map((option) => (
                      <MenuItem key={option.name} onClick={() => setImportMenuAnchor(null)}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {option.icon}
                          {option.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Menu>

                  <Button
                    variant="contained"
                    startIcon={<Download size={16} />}
                    onClick={(e) => setExportMenuAnchor(e.currentTarget)}
                    color="secondary"
                  >
                    Export
                  </Button>
                  <Menu
                    anchorEl={exportMenuAnchor}
                    open={Boolean(exportMenuAnchor)}
                    onClose={() => setExportMenuAnchor(null)}
                  >
                    {exportOptions.map((option) => (
                      <MenuItem key={option.name} onClick={() => setExportMenuAnchor(null)}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {option.icon}
                          {option.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Menu>

                  <Button
                    variant="outlined"
                    startIcon={<Cloud size={16} />}
                    onClick={(e) => setFetchMenuAnchor(e.currentTarget)}
                  >
                    Fetch
                  </Button>
                  <Menu
                    anchorEl={fetchMenuAnchor}
                    open={Boolean(fetchMenuAnchor)}
                    onClose={() => setFetchMenuAnchor(null)}
                  >
                    {fetchOptions.map((option) => (
                      <MenuItem key={option.name} onClick={() => setFetchMenuAnchor(null)}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {option.icon}
                          {option.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Menu>
                </Stack>
              </Box>

              <List
                dataSource={requirementToCodeMapping}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta 
                      title={
                        <Typography variant="subtitle1" fontWeight="medium">
                          {item.requirement}
                        </Typography>
                      } 
                      description={
                        <Typography variant="body2" color="text.secondary">
                          {item.codeFile}
                        </Typography>
                      } 
                    />
                    <Tag color={item.status === 'mapped' ? 'green' : 'orange'}>
                      {item.status}
                    </Tag>
                  </List.Item>
                )}
              />
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Code Tab */}
      <TabPanel value={tabIndex} index={1}>
        <Card title="Code Integration">
          <Typography variant="body1" sx={{ mb: 3 }}>
            Connect your code to tracer flow to minimize context switching and gain visibility of your team's pull requests and development workflow.
          </Typography>
          <Grid container spacing={2}>
            {['GitHub', 'GitLab', 'Bitbucket'].map((platform) => (
              <Grid item key={platform}>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<Code size={16} />}
                  sx={{ minWidth: 140 }}
                >
                  Connect {platform}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Card>
      </TabPanel>

      {/* Unit Tab */}
      <TabPanel value={tabIndex} index={2}>
        <Card title="Unit Tests">
          <List
            dataSource={unitTests}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta 
                  title={
                    <Typography variant="subtitle1" fontWeight="medium">
                      {item.name}
                    </Typography>
                  }
                  description={
                    <Typography variant="body2" color="text.secondary">
                      Coverage: {item.coverage}
                    </Typography>
                  }
                />
                <Tag color={item.status === 'passed' ? 'green' : 'red'}>
                  {item.status}
                </Tag>
              </List.Item>
            )}
          />
        </Card>
      </TabPanel>

      {/* Test Case Tab */}
      <TabPanel value={tabIndex} index={3}>
        <Card title="Test Case Mapping">
          <List
            dataSource={testCasesToRequirementMapping}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Typography variant="subtitle1" fontWeight="medium">
                      {item.testCase}
                    </Typography>
                  }
                  description={
                    <Typography variant="body2" color="text.secondary">
                      Linked to: {item.requirement}
                    </Typography>
                  }
                />
                <Tag color={item.status === 'passed' ? 'green' : 'red'}>
                  {item.status}
                </Tag>
              </List.Item>
            )}
          />
        </Card>
      </TabPanel>

      {/* Bugs Tab */}
      <TabPanel value={tabIndex} index={4}>
        <Card title="Bug Tracker">
          <Table
            dataSource={bugs}
            rowKey="id"
            columns={[
              { 
                title: 'ID', 
                dataIndex: 'id',
                render: (text) => <Typography variant="body2" fontWeight="medium">{text}</Typography>
              },
              { 
                title: 'Title', 
                dataIndex: 'title',
                render: (text) => <Typography variant="body2">{text}</Typography>
              },
              {
                title: 'Severity',
                dataIndex: 'severity',
                render: (sev) => {
                  const color = sev === 'high' ? 'red' : sev === 'medium' ? 'orange' : 'green';
                  return <Tag color={color}>{sev}</Tag>;
                },
              },
              {
                title: 'Status',
                dataIndex: 'status',
                render: (status) => {
                  const color = status === 'open' ? 'red' : status === 'in progress' ? 'blue' : 'green';
                  return <Tag color={color}>{status}</Tag>;
                },
              },
              { 
                title: 'Assignee', 
                dataIndex: 'assignee',
                render: (text) => <Typography variant="body2">{text}</Typography>
              },
            ]}
            pagination={false}
          />
        </Card>
      </TabPanel>

      {/* Code Quality Tab */}
      <TabPanel value={tabIndex} index={5}>
        <Grid container spacing={3}>
          {/* Overall Score */}
          <Grid item xs={12} md={4}>
            <MuiCard sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Overall Code Quality
                </Typography>
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                  <Progress
                    type="circle"
                    percent={codeQuality.overallScore}
                    size={120}
                    status={codeQuality.status === 'good' ? 'success' : 
                           codeQuality.status === 'moderate' ? 'normal' : 'exception'}
                  />
                </Box>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {codeQuality.overallScore}
                </Typography>
                <Chip 
                  label={codeQuality.status.toUpperCase()} 
                  color={getStatusColor(codeQuality.status)}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </MuiCard>
          </Grid>

          {/* Quality Metrics */}
          <Grid item xs={12} md={8}>
            <Card title="Quality Metrics">
              <Grid container spacing={2}>
                {codeQuality.metrics.map((metric, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" fontWeight="medium">
                          {metric.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getTrendIcon(metric.trend)}
                          <Chip 
                            label={metric.status} 
                            color={getStatusColor(metric.status)} 
                            size="small" 
                          />
                        </Box>
                      </Box>
                      <Typography variant="h6" fontWeight="bold">
                        {metric.value}{metric.unit || ''}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Target: {metric.target}{metric.unit || ''}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>

          {/* Code Smells */}
          <Grid item xs={12} md={6}>
            <Card title="Code Smells">
              <List
                dataSource={codeQuality.codeSmells}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Typography variant="body2" fontWeight="medium">
                          {item.file} (Line {item.line})
                        </Typography>
                      }
                      description={item.issue}
                    />
                    <Tag color={item.severity === 'high' ? 'red' : 
                              item.severity === 'medium' ? 'orange' : 'green'}>
                      {item.severity}
                    </Tag>
                  </List.Item>
                )}
              />
            </Card>
          </Grid>

          {/* Security Issues */}
          <Grid item xs={12} md={6}>
            <Card title="Security Issues">
              <List
                dataSource={codeQuality.securityIssues}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Typography variant="body2" fontWeight="medium">
                          {item.file} (Line {item.line})
                        </Typography>
                      }
                      description={item.issue}
                    />
                    <Tag color={item.severity === 'high' ? 'red' : 
                              item.severity === 'medium' ? 'orange' : 'green'}>
                      {item.severity}
                    </Tag>
                  </List.Item>
                )}
              />
            </Card>
          </Grid>

          {/* Performance Metrics */}
          <Grid item xs={12}>
            <Card title="Performance Metrics">
              <Row gutter={16}>
                {codeQuality.performanceMetrics.map((metric, index) => (
                  <Col span={8} key={index}>
                    <Statistic
                      title={metric.metric}
                      value={metric.value}
                      suffix={
                        <Chip 
                          label={metric.status} 
                          color={getStatusColor(metric.status)} 
                          size="small" 
                        />
                      }
                    />
                    <Typography variant="caption" color="text.secondary">
                      Target: {metric.target}
                    </Typography>
                  </Col>
                ))}
              </Row>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Documentation Tab */}
      <TabPanel value={tabIndex} index={6}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MuiCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  {getDocStatusIcon(documentation.userDocumentation.status)}
                  <Typography variant="h6" color="primary">
                    Generate User Documentation
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Create comprehensive user guides and tutorials
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={documentation.userDocumentation.coverage} 
                  sx={{ mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {documentation.userDocumentation.coverage}% Complete
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {documentation.userDocumentation.sections.map((section, index) => (
                    <Chip key={index} label={section} size="small" sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<FileText size={16} />}>
                  Generate
                </Button>
                <Button size="small" startIcon={<Users size={16} />}>
                  Review
                </Button>
              </CardActions>
            </MuiCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <MuiCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  {getDocStatusIcon(documentation.userFlows.status)}
                  <Typography variant="h6" color="primary">
                    Generate User Flows
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Create visual user journey maps and flow diagrams
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={documentation.userFlows.coverage} 
                  sx={{ mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {documentation.userFlows.coverage}% Complete
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {documentation.userFlows.flows.map((flow, index) => (
                    <Chip key={index} label={flow} size="small" sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<Workflow size={16} />}>
                  Generate
                </Button>
                <Button size="small" startIcon={<Zap size={16} />}>
                  Auto-Map
                </Button>
              </CardActions>
            </MuiCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <MuiCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  {getDocStatusIcon(documentation.technicalDocumentation.status)}
                  <Typography variant="h6" color="primary">
                    Technical Documentation
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Maintain architecture docs, API references, and technical guides
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={documentation.technicalDocumentation.coverage} 
                  sx={{ mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {documentation.technicalDocumentation.coverage}% Complete
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {documentation.technicalDocumentation.sections.map((section, index) => (
                    <Chip key={index} label={section} size="small" sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<FileCode size={16} />}>
                  Update
                </Button>
                <Button size="small" startIcon={<Download size={16} />}>
                  Export
                </Button>
              </CardActions>
            </MuiCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <MuiCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  {getDocStatusIcon(documentation.apiDocumentation.status)}
                  <Typography variant="h6" color="primary">
                    API Documentation
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Auto-generate and maintain API documentation
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">
                    Endpoints: {documentation.apiDocumentation.endpoints}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {documentation.apiDocumentation.coverage}% Coverage
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={documentation.apiDocumentation.coverage} 
                />
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<Zap size={16} />}>
                  Auto-Generate
                </Button>
                <Button size="small" startIcon={<TestTube size={16} />}>
                  Test
                </Button>
              </CardActions>
            </MuiCard>
          </Grid>

          <Grid item xs={12}>
            <Card title="Release Notes & Change Log">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                    Recent Versions
                  </Typography>
                  <List
                    dataSource={documentation.releaseNotes.versions}
                    renderItem={(version) => (
                      <List.Item>
                        <List.Item.Meta
                          title={version}
                          description={`Released on ${documentation.releaseNotes.lastUpdated}`}
                        />
                        <Tag color="blue">Released</Tag>
                      </List.Item>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button variant="outlined" startIcon={<FileText size={16} />}>
                      Generate Release Notes
                    </Button>
                    <Button variant="outlined" startIcon={<BookOpen size={16} />}>
                      Installation Guide
                    </Button>
                    <Button variant="outlined" startIcon={<AlertTriangle size={16} />}>
                      Troubleshooting
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Deployment Tab */}
      <TabPanel value={tabIndex} index={7}>
        <Card title="Deployment History">
          <Table
            dataSource={deployments}
            rowKey="id"
            columns={[
              { 
                title: 'ID', 
                dataIndex: 'id',
                render: (text) => <Typography variant="body2" fontWeight="medium">{text}</Typography>
              },
              { 
                title: 'Environment', 
                dataIndex: 'environment',
                render: (env) => <Tag color="blue">{env}</Tag>
              },
              { 
                title: 'Version', 
                dataIndex: 'version',
                render: (text) => <Typography variant="body2" fontFamily="monospace">{text}</Typography>
              },
              {
                title: 'Status',
                dataIndex: 'status',
                render: (status) => {
                  const color = status === 'successful' ? 'green' : 
                               status === 'pending' ? 'orange' : 'red';
                  return <Tag color={color}>{status}</Tag>;
                },
              },
              { 
                title: 'Deployed By', 
                dataIndex: 'deployedBy',
                render: (text) => <Typography variant="body2">{text}</Typography>
              },
              { 
                title: 'Timestamp', 
                dataIndex: 'timestamp',
                render: (text) => <Typography variant="body2" color="text.secondary">{text}</Typography>
              },
            ]}
            pagination={false}
          />
        </Card>
      </TabPanel>
    </Box>
  );
};

export default WorkflowView;
