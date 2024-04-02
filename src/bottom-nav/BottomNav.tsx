import React from 'react';
import { Link, Divider, Stack, Tooltip, Typography } from '@mui/material';
import { LeftGrow } from '../common/Basic';

import '../App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const user_home_url = 'https://rmcghee.github.io/portfolio/'

const BottomNav: React.FC = () => {
  const tooltipContent = (
    <React.Fragment>
      <Typography color="inherit">Want to connect?</Typography>
      <Link href="https://www.linkedin.com/in/rich-mcghee-18a41757" target="_blank" rel="noopener noreferrer">
        LinkedIn
      </Link><br/>
      <Link href={user_home_url} target="_self" rel="noopener noreferrer">
        Home
      </Link>
    </React.Fragment>
  );

  return (
    <LeftGrow>
      <Stack
        direction={'row'}
        spacing={3}
        alignItems={'flex-end'}
        justifyContent={'flex-start'}
      >
        <Tooltip title={tooltipContent} enterDelay={0}>
          <h2 style={{ cursor: 'pointer' }}>r.mcghee</h2>
        </Tooltip>
        <Divider orientation='vertical'/>
        <Link href="/">joule-home</Link><br />
      </Stack>
    </LeftGrow>
  );
}

export default BottomNav;
