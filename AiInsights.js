// components/AiInsights.js
import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Stack,
  Chip, 
  Grid
} from '@mui/material';
import {
  List as AntList,
  Progress,
  Row,
  Col,
  Statistic
} from 'antd';
import { Lightbulb, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import Card from './Card';

const AiInsights = ({ data }) => {
  const getInsightTypeColor = (type) => {
    switch (type) {
      case 'optimization': return 'blue';
      case 'risk': return 'red';
      case 'prediction': return 'green';
      default: return 'gray';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'success';
      case 'negative': return 'error';
      case 'neutral': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
        AI Insights
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6} lg={4}>
          <Card title="Overall Insight Score">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <Progress
                type="circle"
                percent={data.overallScore}
                size={100}
                status={data.overallScore > 70 ? 'success' : data.overallScore > 40 ? 'normal' : 'exception'}
              />
            </Box>
            <Typography variant="body1" textAlign="center" color="text.secondary">
              Based on code quality, security, and project health.
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Card title="Key Recommendations">
            <AntList
              dataSource={data.recommendations}
              renderItem={(item) => (
                <AntList.Item>
                  <AntList.Item.Meta
                    avatar={<Lightbulb size={24} color="#fdd835" />}
                    title={
                      <Typography variant="body2" fontWeight="medium">
                        {item.title}
                      </Typography>
                    }
                    description={
                      <Chip label={item.category} size="small" color={getInsightTypeColor(item.category)} />
                    }
                  />
                </AntList.Item>
              )}
              locale={{ emptyText: 'No AI recommendations.' }}
            />
          </Card>
        </Grid>
      </Grid>

      <Card title="Predictive Analytics" sx={{ mb: 3 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Statistic
              title="Project Completion Confidence"
              value={data.predictiveAnalytics.completionConfidence}
              suffix="%"
              valueStyle={{ color: data.predictiveAnalytics.completionConfidence > 70 ? '#3f8600' : '#cf1322' }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Estimated Bug Trends"
              value={data.predictiveAnalytics.bugTrend === 'up' ? 'Increasing' : 'Decreasing'}
              valueStyle={{ color: data.predictiveAnalytics.bugTrend === 'up' ? '#cf1322' : '#3f8600' }}
              prefix={data.predictiveAnalytics.bugTrend === 'up' ? <TrendingUp /> : <TrendingDown />}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Resource Allocation Suggestion"
              value={data.predictiveAnalytics.resourceSuggestion}
              valueStyle={{ color: '#0050b3' }}
            />
          </Col>
        </Row>
      </Card>

      <Card title="Sentiment Analysis (Recent Activity)">
        <AntList
          dataSource={data.sentimentAnalysis}
          renderItem={(item) => (
            <AntList.Item>
              <AntList.Item.Meta
                title={
                  <Typography variant="body2" fontWeight="medium">
                    {item.comment}
                  </Typography>
                }
                description={
                  <Chip label={item.sentiment} size="small" color={getSentimentColor(item.sentiment)} />
                }
              />
            </AntList.Item>
          )}
          locale={{ emptyText: 'No activity for sentiment analysis.' }}
        />
      </Card>
    </Box>
  );
};

export default AiInsights;