import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const times = [
  { label: 'Morning', value: 'morning' },
  { label: 'Afternoon', value: 'afternoon' },
  { label: 'Evening', value: 'evening' },
];

export default function App() {
  const [location, setLocation] = React.useState('Dolores Park, SF');
  const [day, setDay] = React.useState('Friday');
  const [time, setTime] = React.useState('afternoon');

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#fff5f6', minHeight: '100vh' }}>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: '#eee' }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, color: '#e74c3c', fontWeight: 700 }}
          >
            WHETHER.IO
          </Typography>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Button color="inherit">Help</Button>
            <Button color="inherit">Sign Out</Button>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon color="action" />
              <TextField
                variant="standard"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  style: { fontWeight: 600, fontSize: 20 },
                }}
                sx={{ minWidth: 180 }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'flex-start', md: 'center' },
              gap: 2,
            }}
          >
            <TextField
              select
              variant="standard"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              InputProps={{ disableUnderline: true }}
              sx={{ minWidth: 120 }}
            >
              {days.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              variant="standard"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputProps={{ disableUnderline: true }}
              sx={{ minWidth: 120 }}
            >
              {times.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              xs={1}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconButton>
                <ArrowBackIosNewIcon />
              </IconButton>
            </Grid>
            <Grid item xs={10} md={5}>
              <Paper
                elevation={2}
                sx={{ p: 2, minHeight: 320, bgcolor: '#fff' }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: '#e74c3c', fontWeight: 700 }}
                >
                  This Friday the 15th
                </Typography>
                <Box sx={{ mt: 2, mb: 2 }}>
                  {/* Weather icon and summary placeholder */}
                  <Typography variant="body1">Sunny 71°F</Typography>
                  <Typography variant="body2">winds 5mph, no rain</Typography>
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
                  {/* Chart placeholder */}
                  <Typography variant="caption" color="text.secondary">
                    [Chart Here]
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={10} md={5}>
              <Paper
                elevation={2}
                sx={{ p: 2, minHeight: 320, bgcolor: '#fff' }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: '#222', fontWeight: 700 }}
                >
                  Next Friday the 15th
                </Typography>
                <Box sx={{ mt: 2, mb: 2 }}>
                  {/* Weather icon and summary placeholder */}
                  <Typography variant="body1">Cloudy 62°F</Typography>
                  <Typography variant="body2">
                    winds 20mph, 40% chance rain
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
                  {/* Chart placeholder */}
                  <Typography variant="caption" color="text.secondary">
                    [Chart Here]
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid
              item
              xs={1}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconButton>
                <ArrowForwardIosIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
