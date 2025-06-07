import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { fetchWeather } from './api/weather';
import { getNextDate, formatDate, addOneDay } from './utils/dateHelpers';
import { getSummary } from './utils/weatherSummary';
import WeatherCard from './components/WeatherCard';

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
  const [weather, setWeather] = React.useState({
    thisWeek: null,
    nextWeek: null,
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const API_KEY = process.env.REACT_APP_VISUAL_CROSSING_API_KEY;

  React.useEffect(() => {
    let isMounted = true;
    async function loadWeather() {
      setLoading(true);
      setError(null);
      try {
        // Get the next two dates for the selected day
        const dayIdx = days.indexOf(day);
        const thisFriday = getNextDate(dayIdx, 0);
        const nextFriday = getNextDate(dayIdx, 1);
        // Fetch both weeks in parallel for scalability
        const [thisWeekData, nextWeekData] = await Promise.all([
          fetchWeather(location, formatDate(thisFriday), API_KEY),
          fetchWeather(location, formatDate(nextFriday), API_KEY),
        ]);
        if (isMounted) {
          console.log('thisWeekData', thisWeekData);
          console.log('nextWeekData', nextWeekData);
          setWeather({ thisWeek: thisWeekData, nextWeek: nextWeekData });
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadWeather();
    return () => {
      isMounted = false;
    };
  }, [location, day, time, API_KEY]);

  const thisSummary = getSummary(weather.thisWeek);
  const nextSummary = getSummary(weather.nextWeek);

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
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          )}
          {error && <Alert severity="error">{error}</Alert>}
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
              <WeatherCard
                title={`This ${day} the ${addOneDay(
                  weather.thisWeek?.days?.[0]?.datetime
                )}`}
                summary={thisSummary}
                hours={weather.thisWeek?.days?.[0]?.hours || []}
                timeRange={time}
                loading={loading}
                error={error}
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <WeatherCard
                title={`Next ${day} the ${addOneDay(
                  weather.nextWeek?.days?.[0]?.datetime
                )}`}
                summary={nextSummary}
                hours={weather.nextWeek?.days?.[0]?.hours || []}
                timeRange={time}
                loading={loading}
                error={error}
              />
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
