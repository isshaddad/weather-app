import React from 'react';
import { Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';
import WeatherChart from './WeatherChart';

export default function WeatherCard({
  title,
  summary,
  hours,
  timeRange,
  loading,
  error,
}) {
  return (
    <Paper elevation={2} sx={{ p: 2, minHeight: 320, bgcolor: '#fff' }}>
      <Typography
        variant="h6"
        sx={{
          color: title.startsWith('This') ? '#e74c3c' : '#222',
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="body1">
          {summary.desc} {summary.temp}
        </Typography>
        <Typography variant="body2">
          {summary.wind}, {summary.rain}
        </Typography>
      </Box>
      <Box
        sx={{
          height: 140,
          bgcolor: '#f9f9f9',
          borderRadius: 2,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <CircularProgress size={32} />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <WeatherChart hours={hours} timeRange={timeRange} />
        )}
      </Box>
    </Paper>
  );
}
