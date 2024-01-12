import React from 'react';
import { Link, Paper, Container, ThemeProvider, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import '../App.css';
import { CssBaseline } from '@mui/material';
import { theme } from '../base-theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const user_home_url = 'https://rmcghee.github.io/'

function BottomNav() {
  return (
    <Stack
      direction={'row'}
      spacing={3}
      alignItems={'flex-end'}
      justifyContent={'flex-start'}
    >
      <h2>r.mcghee</h2>
      <Divider orientation='vertical'/>
      <Link href={user_home_url + "synbio.html"}>Synthetic Biology</Link><br />
      <Link href={user_home_url + "photography.html"}>Photography</Link><br />
      <Link href="/">joule-home</Link><br />
    </Stack>
  );
}

export default BottomNav;
