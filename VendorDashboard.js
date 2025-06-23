// components/VendorDashboard.js
import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Avatar,
  Stack
} from '@mui/material';
import {
  Table,
  List as AntList,
  Tag,
  Progress
} from 'antd';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import Card from './Card';

const VendorDashboard = ({ data }) => {
  const vendorColumns = [
    {
      title: 'Vendor Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Typography variant="body2" fontWeight="medium">{text}</Typography>
    },
    {
      title: 'Compliance Score',
      dataIndex: 'complianceScore',
      key: 'complianceScore',
      render: (score) => (
        <Progress
          percent={score}
          size="small"
          status={score > 80 ? 'success' : score > 50 ? 'normal' : 'exception'}
        />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'compliant' ? 'green' : status === 'non-compliant' ? 'red' : 'orange';
        return <Tag color={color}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag>;
      },
    },
    {
      title: 'Last Audit',
      dataIndex: 'lastAudit',
      key: 'lastAudit',
      render: (text) => <Typography variant="body2" color="text.secondary">{text}</Typography>
    },
  ];

  const contractColumns = [
    {
      title: 'Contract ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <Typography variant="body2" fontWeight="medium">{text}</Typography>
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
      render: (text) => <Typography variant="body2">{text}</Typography>
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: (text) => <Typography variant="body2" color="text.secondary">{text}</Typography>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const icon = status === 'active' ? <CheckCircle size={16} color="green" /> : <Clock size={16} color="orange" />;
        const color = status === 'active' ? 'green' : 'orange';
        return (
          <Tag icon={icon} color={color}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Tag>
        );
      },
    },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
        Vendor/Partner Dashboard
      </Typography>

      <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
        <Card title="Total Vendors">
          <Typography variant="h5" fontWeight="bold">{data.totalVendors}</Typography>
        </Card>
        <Card title="Active Contracts">
          <Typography variant="h5" fontWeight="bold">{data.activeContracts}</Typography>
        </Card>
        <Card title="Expiring Soon">
          <Typography variant="h5" fontWeight="bold" color="warning.main">{data.expiringContracts}</Typography>
        </Card>
      </Stack>

      <Card title="Vendor Compliance Overview" sx={{ mb: 3 }}>
        <Table
          dataSource={data.vendorCompliance}
          columns={vendorColumns}
          pagination={false}
          rowKey="name"
          locale={{ emptyText: 'No vendor data available.' }}
        />
      </Card>

      <Card title="Contract Management">
        <Table
          dataSource={data.contracts}
          columns={contractColumns}
          pagination={false}
          rowKey="id"
          locale={{ emptyText: 'No contract data available.' }}
        />
      </Card>
    </Box>
  );
};

export default VendorDashboard;