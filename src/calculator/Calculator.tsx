import React from 'react';
import { Link, Paper, Container, ThemeProvider, Divider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box } from '@mui/system';
import BottomNav from '../bottom-nav/BottomNav';

const user_home_url = 'https://rmcghee.github.io/'

function Calculator() {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ flexGrow: 0}} style={{ padding: 0, marginTop: 30 }}>
        <h1>joule-home</h1>
      </Box>
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
      </Box>
      <BottomNav/>
    </Container>
  );
}

export default Calculator;
