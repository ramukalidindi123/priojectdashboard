import React from 'react';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(MuiCard)(({ theme }) => ({
  height: '100%',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  borderRadius: 12,
  '&:hover': {
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    transform: 'translateY(-2px)',
    transition: 'all 0.3s ease'
  }
}));

const Card = ({ title, children, className = '' }) => (
  <StyledCard className={className}>
    <CardContent>
      <Typography variant="h6" gutterBottom color="primary">
        {title}
      </Typography>
      {children}
    </CardContent>
  </StyledCard>
);

export default Card;
