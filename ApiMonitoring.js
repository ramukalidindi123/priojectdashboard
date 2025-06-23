// components/ApiMonitoring.js
import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Stack,
  Chip,
    Grid,
  Button
} from '@mui/material';
import {
  Table,
  Tag,
  Statistic,
  Row,
  Col
} from 'antd';
import { Zap, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import Card from './Card';

const ApiMonitoring = ({ data }) => {
  const endpointColumns = [
    {
      title: 'Endpoint',
      dataIndex: 'endpoint',
      key: 'endpoint',
      render: (text) => <Typography variant="body2" fontWeight="medium">{text}</Typography>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'active' ? 'green' : 'red';
        const icon = status === 'active' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />;
        return <Tag icon={icon} color={color}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag>;
      },
    },
    {
      title: 'Latency (ms)',
      dataIndex: 'latency',
      key: 'latency',
      render: (text) => <Typography variant="body2">{text}</Typography>
    },
    {
      title: 'Error Rate (%)',
      dataIndex: 'errorRate',
      key: 'errorRate',
      render: (rate) => (
        <Tag color={rate > 5 ? 'error' : 'success'}>
          {rate}%
        </Tag>
      ),
    },
  ];

  const alertColumns = [
    {
      title: 'Alert',
      dataIndex: 'message',
      key: 'message',
      render: (text) => <Typography variant="body2" fontWeight="medium">{text}</Typography>
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity) => {
        const color = severity === 'high' ? 'red' : severity === 'medium' ? 'orange' : 'blue';
        return <Tag color={color}>{severity.charAt(0).toUpperCase() + severity.slice(1)}</Tag>;
      },
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text) => <Typography variant="body2" color="text.secondary">{text}</Typography>
    },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
        API Monitoring
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card title="Total Endpoints">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Zap size={36} color="#1976d2" />
              <Typography variant="h5" fontWeight="bold">{data.totalEndpoints}</Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card title="Average Latency">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Activity size={36} color="#ed6c02" />
              <Typography variant="h5" fontWeight="bold">{data.avgLatency}ms</Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card title="Total Alerts">
            <Stack direction="row" alignItems="center" spacing={2}>
              <AlertTriangle size={36} color="#d32f2f" />
              <Typography variant="h5" fontWeight="bold">{data.totalAlerts}</Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Card title="Endpoint Performance" sx={{ mb: 3 }}>
        <Table
          dataSource={data.endpoints}
          columns={endpointColumns}
          pagination={{ pageSize: 5 }}
          rowKey="endpoint"
          locale={{ emptyText: 'No API endpoints monitored.' }}
        />
      </Card>

      <Card title="Recent Alerts">
        <Table
          dataSource={data.alerts}
          columns={alertColumns}
          pagination={{ pageSize: 3 }}
          rowKey="id"
          locale={{ emptyText: 'No recent alerts.' }}
        />
      </Card>
    </Box>
  );
};

export default ApiMonitoring;