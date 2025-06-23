import React from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import {
  Table,
  Tag,
  List as AntList,
} from 'antd';
import Card from './Card';

const ComplianceDashboard = ({ data }) => {
  const sbomColumns = [
    {
      title: 'Component',
      dataIndex: 'component',
      key: 'component',
      render: (text) => <Typography variant="body2" fontWeight="medium">{text}</Typography>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'compliant' ? 'success' : 'error'}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      )
    },
    {
      title: 'Trigger Log',
      dataIndex: 'triggerLog',
      key: 'triggerLog',
    },
  ];

  const securityColumns = [
    {
      title: 'Finding',
      dataIndex: 'finding',
      key: 'finding',
      render: (text) => <Typography variant="body2" fontWeight="medium">{text}</Typography>
    },
    {
      title: 'Remediation',
      dataIndex: 'remediation',
      key: 'remediation',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'open' ? 'error' : 
                     status === 'in progress' ? 'processing' : 'success';
        return <Tag color={color}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag>;
      }
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity) => {
        const color = severity === 'high' ? 'error' : 
                     severity === 'medium' ? 'warning' : 'success';
        return <Tag color={color}>{severity.charAt(0).toUpperCase() + severity.slice(1)}</Tag>;
      }
    },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
        Compliance Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card title="SBOM Status & Trigger Log">
            <Table 
              dataSource={data.sbomStatus}
              columns={sbomColumns}
              pagination={false}
              locale={{ emptyText: 'No SBOM data available.' }}
            />
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card title="Security Findings">
            <Table 
              dataSource={data.securityFindings}
              columns={securityColumns}
              pagination={false}
              locale={{ emptyText: 'No security findings.' }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card title="Requirement to Code Mapping">
            <AntList
              dataSource={data.requirementToCodeMapping}
              locale={{ emptyText: 'No requirement to code mappings.' }}
              renderItem={(item) => (
                <AntList.Item>
                  <AntList.Item.Meta
                    title={item.requirement}
                    description={item.codeFile}
                  />
                  <Tag color={item.status === 'mapped' ? 'success' : 'processing'}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Tag>
                </AntList.Item>
              )}
            />
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card title="Test Cases to Requirement Mapping">
            <AntList
              dataSource={data.testCasesToRequirementMapping}
              locale={{ emptyText: 'No test cases to requirement mappings.' }}
              renderItem={(item) => (
                <AntList.Item>
                  <AntList.Item.Meta
                    title={item.testCase}
                    description={`Requirement: ${item.requirement}`}
                  />
                  <Tag color={item.status === 'passed' ? 'success' : 'error'}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Tag>
                </AntList.Item>
              )}
            />
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card title="Policy Adherence Checklist">
            <AntList
              dataSource={data.policyAdherence}
              locale={{ emptyText: 'No policy adherence data.' }}
              renderItem={(item) => (
                <AntList.Item>
                  <AntList.Item.Meta title={item.policy} />
                  <Tag color={item.status === 'compliant' ? 'success' : 'warning'}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Tag>
                </AntList.Item>
              )}
            />
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card title="Audit Trail Viewer">
            <AntList
              dataSource={data.auditTrail}
              locale={{ emptyText: 'No audit trail events.' }}
              renderItem={(item) => (
                <AntList.Item>
                  <Typography variant="body2">
                    <strong>{item.timestamp}:</strong> {item.event}{' '}
                    <Typography component="span" color="text.secondary">
                      ({item.user})
                    </Typography>
                  </Typography>
                </AntList.Item>
              )}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ComplianceDashboard;
