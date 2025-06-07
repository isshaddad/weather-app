import React from 'react';
import {
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  useMediaQuery,
} from '@mui/material';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import WeatherChart from './WeatherChart';

function getWeatherIcon(desc) {
  // Simple mapping for demo; expand as needed
  if (desc.toLowerCase().includes('sun'))
    return <WbSunnyOutlinedIcon sx={{ fontSize: 48 }} />;
  if (desc.toLowerCase().includes('cloud'))
    return <CloudOutlinedIcon sx={{ fontSize: 48 }} />;
  // Add more mappings as needed
  return <WbSunnyOutlinedIcon sx={{ fontSize: 48 }} />;
}

export default function WeatherCard({
  title,
  summary,
  hours,
  timeRange,
  loading,
  error,
}) {
  const isSmall = useMediaQuery('(max-width:600px)');
  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        minHeight: 520,
        bgcolor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: title.startsWith('This') ? '#e74c3c' : '#222',
          fontWeight: 700,
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          mt: 2,
          mb: 2,
          display: 'flex',
          flexDirection: isSmall ? 'column' : 'row',
          alignItems: isSmall ? 'flex-start' : 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', mr: isSmall ? 0 : 2 }}
        >
          {getWeatherIcon(summary.desc)}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 400, fontSize: 20, color: '#222' }}
          >
            {summary.desc} {summary.temp}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AirOutlinedIcon sx={{ fontSize: 20, mr: 0.5 }} />
            <Typography variant="body2" sx={{ fontSize: 14, color: '#222' }}>
              {summary.wind}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <OpacityOutlinedIcon sx={{ fontSize: 20, mr: 0.5 }} />
            <Typography variant="body2" sx={{ fontSize: 14, color: '#222' }}>
              {summary.rain}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Box
          sx={{
            borderRadius: 2,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
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
      </Box>
    </Paper>
  );
}
