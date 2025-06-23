// components/UserManagement.js
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
   Chip
} from '@mui/material';
import {
  Table,
  Tag,
  Popconfirm,
  message,
} from 'antd';
import { UserPlus, UserX, Key } from 'lucide-react';
import Card from './Card';

const UserManagement = ({ data }) => {
  const [users, setUsers] = useState(data.users);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'viewer', status: 'active' });

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setNewUser({ name: '', email: '', role: 'viewer', status: 'active' });
      message.success('User added successfully!');
    } else {
      message.error('User name and email are required.');
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    message.success('User deleted successfully!');
  };

  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Typography variant="body2" fontWeight="medium">{text}</Typography>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <Typography variant="body2">{text}</Typography>
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        const color = role === 'admin' ? 'purple' : role === 'editor' ? 'blue' : 'green';
        return <Tag color={color}>{role.charAt(0).toUpperCase() + role.slice(1)}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'active' ? 'green' : 'red';
        return <Tag color={color}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => handleDeleteUser(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button size="small" color="error" startIcon={<UserX size={16} />}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
        User & Role Management
      </Typography>

      <Card title="Manage Users" sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <TextField
            label="User Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            size="small"
            sx={{ flexGrow: 1, minWidth: 150 }}
          />
          <TextField
            label="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            type="email"
            size="small"
            sx={{ flexGrow: 1, minWidth: 200 }}
          />
          <FormControl size="small" sx={{ flexGrow: 1, minWidth: 120 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={newUser.role}
              label="Role"
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="viewer">Viewer</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ flexGrow: 1, minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={newUser.status}
              label="Status"
              onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<UserPlus size={16} />}
            onClick={handleAddUser}
            sx={{ minWidth: 120 }}
          >
            Add User
          </Button>
        </Box>
        <Table
          dataSource={users}
          columns={userColumns}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          locale={{ emptyText: 'No users found.' }}
        />
      </Card>

      <Card title="Role Permissions">
        <Table
          dataSource={data.roles}
          columns={[
            {
              title: 'Role',
              dataIndex: 'name',
              key: 'name',
              render: (text) => <Typography variant="body2" fontWeight="medium">{text}</Typography>
            },
            {
              title: 'Permissions',
              dataIndex: 'permissions',
              key: 'permissions',
              render: (permissions) => (
                <Box>
                  {permissions.map((p, i) => (
                    <Chip key={i} label={p} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                  ))}
                </Box>
              ),
            },
            {
              title: 'Actions',
              key: 'actions',
              render: () => (
                <Button size="small" startIcon={<Key size={16} />}>
                  Edit Permissions
                </Button>
              ),
            },
          ]}
          pagination={false}
          rowKey="name"
          locale={{ emptyText: 'No roles defined.' }}
        />
      </Card>
    </Box>
  );
};

export default UserManagement;