import { useState } from 'react';
import { Container, ThemeProvider } from '@mui/material';

import './App.css';
import { CssBaseline } from '@mui/material';
import theme from './base-theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box } from '@mui/system';
import BottomNav from './bottom-nav/BottomNav';
import { LeftGrow } from './common/Basic';
import Calculator from './calculator/Calculator';

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
      <LeftGrow><Box sx={{ flexGrow: 0}} style={{ marginTop: 15 }}>
        <h1>joule-home</h1>
      </Box></LeftGrow>
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'top',
        maxWidth: '400px',
      }}>
        <Calculator/>
      </Box>
      <BottomNav/>
    </Container>
    </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
