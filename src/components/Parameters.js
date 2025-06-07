import React from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClearIcon from '@mui/icons-material/Clear';

export default function Parameters({
  location,
  setLocation,
  day,
  setDay,
  time,
  setTime,
  days,
  times,
}) {
  return (
    <Box sx={{ mb: 2 }}>
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
                endAdornment: location ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setLocation('')}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
              sx={{ minWidth: 220 }}
              placeholder={'Boston, MA or 10016'}
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
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 400, color: '#222', mr: 1 }}
          >
            Every
          </Typography>
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
      <Box sx={{ mt: 2, mb: 1 }}>
        <hr style={{ border: 0, borderTop: '2px solid #ddd', width: '100%' }} />
      </Box>
    </Box>
  );
}
