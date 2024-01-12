import React, { useState } from 'react';
import { Link, Paper, Container, ThemeProvider, Divider, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import './App.css';
import { CssBaseline } from '@mui/material';
import theme from './base-theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box } from '@mui/system';
import BottomNav from './bottom-nav/BottomNav';
import LeftGrow from './common/Basic';

const user_home_url = 'https://rmcghee.github.io/'

function App() {
  const [animate, setAnimate] = useState(false);

  const toggleAnimation = () => {
    setAnimate(prev => !prev); // Toggle the state
  };
  
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline>
    <Container sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <LeftGrow trigger={animate}><Box sx={{ flexGrow: 0}} style={{ marginTop: 15 }}>
        <h1>joule-home</h1>
      </Box></LeftGrow>
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'top',
      }}>
        <Button onClick={toggleAnimation} sx={{ alignSelf: 'flex-start' }}>Toggle Animation</Button>
      </Box>
      <BottomNav/>
    </Container>
    </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
