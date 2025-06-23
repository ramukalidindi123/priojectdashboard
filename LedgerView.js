// components/LedgerView.js
import React from 'react';
import {
  Box,
  Typography,
  Stack, // Added Stack for better layout control
} from '@mui/material';
import {
  Table,
  Tag,
  Timeline,
} from 'antd';
import { Lock, FileText, CheckSquare, Clock } from 'lucide-react'; // Added Lock, FileText, CheckSquare icons
import Card from './Card';

const LedgerView = ({ data }) => {
  const transactionColumns = [
    {
      title: 'Transaction ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <Typography variant="body2" fontWeight="medium">{text}</Typography>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <Typography variant="body2" sx={{ fontWeight: 'bold' }}>${text.toFixed(2)}</Typography>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color;
        let icon;
        switch (status) {
          case 'completed':
            color = 'green';
            icon = <CheckSquare size={14} />;
            break;
          case 'pending':
            color = 'orange';
            icon = <Clock size={14} />;
            break;
          case 'contract enforced': // New status
            color = 'purple';
            icon = <Lock size={14} />;
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
      title: 'Date & Time (UTC)', // Changed to emphasize timestamping
      dataIndex: 'timestamp', // Changed from 'date' to 'timestamp'
      key: 'timestamp',
      render: (text) => <Typography variant="body2" color="text.secondary">{text}</Typography>
    },
    {
      title: 'Smart Contract', // New column
      dataIndex: 'smartContract',
      key: 'smartContract',
      render: (text) => text ? <Tag icon={<FileText size={14} />} color="geekblue">{text}</Tag> : <Tag>N/A</Tag>
    }
  ];

  const auditLogItems = data.auditLog.map((log, index) => ({
    key: index,
    color: log.type === 'security' ? 'red' : log.type === 'data' ? 'blue' : 'gray',
    children: (
      <Box>
        <Typography variant="subtitle2" fontWeight="medium">
          {log.event}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {log.timestamp} by {log.user}
        </Typography>
        {log.details && ( // Display additional details if available
          <Typography variant="caption" color="text.disabled">
            Details: {log.details}
          </Typography>
        )}
      </Box>
    ),
  }));

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
        Smart Ledger View
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 3 }}>
        <Card title="Total Transactions">
          <Typography variant="h5" fontWeight="bold">{data.transactions.length}</Typography>
          <Typography variant="body2" color="text.secondary">Immutable record count</Typography>
        </Card>
        <Card title="Smart Contracts Enforced">
          <Typography variant="h5" fontWeight="bold">{data.transactions.filter(t => t.smartContract).length}</Typography>
          <Typography variant="body2" color="text.secondary">Automated rule executions</Typography>
        </Card>
      </Stack>

      <Card title="Recent Ledger Entries" sx={{ mb: 3 }}>
        <Table
          dataSource={data.transactions}
          columns={transactionColumns}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          locale={{ emptyText: 'No ledger entries found.' }}
        />
      </Card>

      <Card title="Immutable Audit Trail">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          All changes are timestamped and auditable.
        </Typography>
        <Timeline items={auditLogItems} />
      </Card>
    </Box>
  );
};

export default LedgerView;