import React from 'react';
import { Box, Grid, CircularProgress, Alert } from '@mui/material';
import { fetchWeather } from './api/weather';
import {
  getNextDate,
  formatDate,
  formatDisplayDateWithSuffix,
  addDays,
} from './utils/dateHelpers';
import { getSummary } from './utils/weatherSummary';
import WeatherCard from './components/WeatherCard';
import LoginForm from './components/LoginForm';
import TopBar from './components/TopBar';
import Parameters from './components/Parameters';

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
  const [userEmail, setUserEmail] = React.useState(
    () => localStorage.getItem('userEmail') || ''
  );
  const [location, setLocation] = React.useState(
    () => localStorage.getItem('location') || 'Dolores Park, SF'
  );
  const [day, setDay] = React.useState(
    () => localStorage.getItem('day') || 'Friday'
  );
  const [time, setTime] = React.useState(
    () => localStorage.getItem('time') || 'afternoon'
  );
  const [weather, setWeather] = React.useState({
    thisWeek: null,
    nextWeek: null,
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [requestedDates, setRequestedDates] = React.useState({
    thisDay: null,
    nextDay: null,
  });

  const API_KEY = '88CC5DNF452PHS2VUSYE6RR6R';

  React.useEffect(() => {
    let isMounted = true;
    async function loadWeather() {
      setLoading(true);
      setError(null);
      try {
        // Get the next two dates for the selected day
        const dayIdx = days.indexOf(day);
        const thisDay = addDays(getNextDate(dayIdx, 0), 1);
        const nextDay = addDays(getNextDate(dayIdx, 1), 1);
        // Fetch both weeks in parallel for scalability
        const [thisWeekData, nextWeekData] = await Promise.all([
          fetchWeather(location, formatDate(thisDay), API_KEY),
          fetchWeather(location, formatDate(nextDay), API_KEY),
        ]);
        if (isMounted) {
          console.log('thisWeekData', thisWeekData);
          console.log('nextWeekData', nextWeekData);
          setWeather({ thisWeek: thisWeekData, nextWeek: nextWeekData });
          setRequestedDates({ thisDay, nextDay });
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

  // Persist location, day, and time to localStorage on change
  React.useEffect(() => {
    localStorage.setItem('location', location);
  }, [location]);
  React.useEffect(() => {
    localStorage.setItem('day', day);
  }, [day]);
  React.useEffect(() => {
    localStorage.setItem('time', time);
  }, [time]);

  const thisSummary = getSummary(weather.thisWeek);
  const nextSummary = getSummary(weather.nextWeek);

  const handleLogin = (email) => {
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
  };
  const handleLogout = () => {
    setUserEmail('');
    localStorage.removeItem('userEmail');
  };

  const handleHelp = () => {
    window.open('https://www.youtube.com/watch?v=2Q_ZzBGPdqE', '_blank');
  };

  if (!userEmail) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: '#fff5f6',
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        overflowX: 'hidden',
      }}
    >
      <TopBar onHelp={handleHelp} onSignOut={handleLogout} />
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          maxWidth: 1200,
          mx: 'auto',
          width: '100%',
          overflowX: 'hidden',
        }}
      >
        <Parameters
          location={location}
          setLocation={setLocation}
          day={day}
          setDay={setDay}
          time={time}
          setTime={setTime}
          days={days}
          times={times}
        />
        <Box sx={{ mt: 4 }}>
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          )}
          {error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Grid
              container
              spacing={3}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} md={5}>
                <WeatherCard
                  title={`This ${day} ${formatDisplayDateWithSuffix(
                    requestedDates.thisDay
                  )}`}
                  summary={thisSummary}
                  hours={weather.thisWeek?.days?.[0]?.hours || []}
                  timeRange={time}
                  loading={loading}
                  error={error}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <WeatherCard
                  title={`Next ${day} ${formatDisplayDateWithSuffix(
                    requestedDates.nextDay
                  )}`}
                  summary={nextSummary}
                  hours={weather.nextWeek?.days?.[0]?.hours || []}
                  timeRange={time}
                  loading={loading}
                  error={error}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
}
