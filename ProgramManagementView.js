// components/ProgramManagementView.js
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Input,
} from '@mui/material';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, List, message, Card as AntCard } from 'antd';
import Card from './Card';
import * as XLSX from 'xlsx';

const tools = ['Jira', 'Monday.com', 'Azure DevOps', 'Smartsheet'];

const ProgramManagementView = () => {
  const [uploadedItems, setUploadedItems] = useState([]);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    const fileExtension = file.name.split('.').pop();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      const headers = jsonData[0];
      const rows = jsonData.slice(1).map(row => {
        const item = {};
        headers.forEach((h, i) => {
          item[h] = row[i];
        });
        return item;
      });

      setUploadedItems(rows);
    };

    if (fileExtension === 'csv' || fileExtension === 'xlsx' || fileExtension === 'xls') {
      reader.readAsArrayBuffer(file);
    } else {
      message.error('Only CSV or Excel files are supported.');
    }

    return false; // prevent default upload
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
        Program Management
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {tools.map((tool) => (
          <Grid item xs={12} md={6} lg={3} key={tool}>
            <Card title={tool}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Connect your {tool} workspace.
              </Typography>
              <Button variant="outlined" size="small">
                Connect {tool}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card title="Import Tasks from Excel or CSV">
        <Upload
          accept=".csv,.xlsx,.xls"
          beforeUpload={handleFileUpload}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>

        {uploadedItems.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Imported Tasks
            </Typography>
            <List
              bordered
              dataSource={uploadedItems}
              renderItem={(item) => (
                <List.Item>
                  {Object.entries(item).map(([key, value], index) => (
                    <span key={index} style={{ marginRight: 16 }}>
                      <strong>{key}:</strong> {value?.toString()}
                    </span>
                  ))}
                </List.Item>
              )}
            />
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default ProgramManagementView;
