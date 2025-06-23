// components/SbomEditor.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import {
  Table,
  Tag,
  Popconfirm,
  message,
} from 'antd';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import Card from './Card';

const SbomEditor = ({ data }) => {
  const [components, setComponents] = useState(data.sbomComponents);
  const [policies, setPolicies] = useState(data.policies);
  const [newComponent, setNewComponent] = useState({ name: '', version: '', license: '', status: 'compliant' });
  const [newPolicy, setNewPolicy] = useState({ name: '', description: '', severity: 'medium', enforce: true });

  const handleAddComponent = () => {
    if (newComponent.name && newComponent.version) {
      setComponents([...components, { ...newComponent, id: components.length + 1 }]);
      setNewComponent({ name: '', version: '', license: '', status: 'compliant' });
      message.success('Component added successfully!');
    } else {
      message.error('Component name and version are required.');
    }
  };

  const handleDeleteComponent = (id) => {
    setComponents(components.filter(comp => comp.id !== id));
    message.success('Component deleted successfully!');
  };

  const handleAddPolicy = () => {
    if (newPolicy.name && newPolicy.description) {
      setPolicies([...policies, { ...newPolicy, id: policies.length + 1 }]);
      setNewPolicy({ name: '', description: '', severity: 'medium', enforce: true });
      message.success('Policy added successfully!');
    } else {
      message.error('Policy name and description are required.');
    }
  };

  const handleDeletePolicy = (id) => {
    setPolicies(policies.filter(policy => policy.id !== id));
    message.success('Policy deleted successfully!');
  };

  const sbomColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Typography variant="body2" fontWeight="medium">{text}</Typography>
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
      render: (text) => <Typography variant="body2">{text}</Typography>
    },
    {
      title: 'License',
      dataIndex: 'license',
      key: 'license',
      render: (text) => <Typography variant="body2">{text}</Typography>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'compliant' ? 'green' : 'red';
        return <Tag color={color}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this component?"
          onConfirm={() => handleDeleteComponent(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button size="small" color="error" startIcon={<Trash2 size={16} />}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const policyColumns = [
    {
      title: 'Policy Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Typography variant="body2" fontWeight="medium">{text}</Typography>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <Typography variant="body2">{text}</Typography>
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
      title: 'Enforced',
      dataIndex: 'enforce',
      key: 'enforce',
      render: (enforce) => (
        <Tag color={enforce ? 'green' : 'red'}>
          {enforce ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this policy?"
          onConfirm={() => handleDeletePolicy(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button size="small" color="error" startIcon={<Trash2 size={16} />}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
        SBOM & Policy Editor
      </Typography>

      <Card title="SBOM Components" sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Component Name"
            value={newComponent.name}
            onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
            size="small"
            sx={{ flexGrow: 1, minWidth: 150 }}
          />
          <TextField
            label="Version"
            value={newComponent.version}
            onChange={(e) => setNewComponent({ ...newComponent, version: e.target.value })}
            size="small"
            sx={{ flexGrow: 1, minWidth: 100 }}
          />
          <TextField
            label="License"
            value={newComponent.license}
            onChange={(e) => setNewComponent({ ...newComponent, license: e.target.value })}
            size="small"
            sx={{ flexGrow: 1, minWidth: 100 }}
          />
          <FormControl size="small" sx={{ flexGrow: 1, minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={newComponent.status}
              label="Status"
              onChange={(e) => setNewComponent({ ...newComponent, status: e.target.value })}
            >
              <MenuItem value="compliant">Compliant</MenuItem>
              <MenuItem value="vulnerable">Vulnerable</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<PlusCircle size={16} />}
            onClick={handleAddComponent}
            sx={{ minWidth: 120 }}
          >
            Add Component
          </Button>
        </Box>
        <Table
          dataSource={components}
          columns={sbomColumns}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          locale={{ emptyText: 'No SBOM components.' }}
        />
      </Card>

      <Card title="Policy Management">
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Policy Name"
            value={newPolicy.name}
            onChange={(e) => setNewPolicy({ ...newPolicy, name: e.target.value })}
            size="small"
            sx={{ flexGrow: 1, minWidth: 150 }}
          />
          <TextField
            label="Description"
            value={newPolicy.description}
            onChange={(e) => setNewPolicy({ ...newPolicy, description: e.target.value })}
            size="small"
            sx={{ flexGrow: 1, minWidth: 200 }}
          />
          <FormControl size="small" sx={{ flexGrow: 1, minWidth: 120 }}>
            <InputLabel>Severity</InputLabel>
            <Select
              value={newPolicy.severity}
              label="Severity"
              onChange={(e) => setNewPolicy({ ...newPolicy, severity: e.target.value })}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ flexGrow: 1, minWidth: 100 }}>
            <InputLabel>Enforce</InputLabel>
            <Select
              value={newPolicy.enforce}
              label="Enforce"
              onChange={(e) => setNewPolicy({ ...newPolicy, enforce: e.target.value })}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<PlusCircle size={16} />}
            onClick={handleAddPolicy}
            sx={{ minWidth: 120 }}
          >
            Add Policy
          </Button>
        </Box>
        <Table
          dataSource={policies}
          columns={policyColumns}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          locale={{ emptyText: 'No policies defined.' }}
        />
      </Card>
    </Box>
  );
};

export default SbomEditor;