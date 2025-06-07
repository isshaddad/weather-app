import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function TopBar({ onHelp, onSignOut }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => setDrawerOpen((open) => !open);

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: '#eee', maxWidth: 1200, mx: 'auto' }}
    >
      <Toolbar sx={{ px: { xs: 1, md: 2 } }}>
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
          <Button color="inherit" onClick={onHelp}>
            Help
          </Button>
          <Button color="inherit" onClick={onSignOut}>
            Sign Out
          </Button>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          sx={{ display: { xs: 'flex', md: 'none' } }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Box
          sx={{ width: 220 }}
          role="presentation"
          onClick={handleDrawerToggle}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={onHelp}>
                <ListItemText primary="Help" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={onSignOut}>
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
