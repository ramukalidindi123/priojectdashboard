import React from 'react';
import { Box, Typography } from '@mui/material';
import Card from './Card';

const PlaceholderComponent = ({ title }) => {
  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
        {title}
      </Typography>
      <Card title="Coming Soon">
        <Typography variant="body1" color="text.secondary">
          Content for "{title}" will be implemented here.
        </Typography>
      </Card>
    </Box>
  );
};

export default PlaceholderComponent;
