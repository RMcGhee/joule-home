import React from 'react';
import { Box } from '@mui/material';
import { LeftGrow } from '../common/Basic';

const Introduction: React.FC = () => {
  return (
    <LeftGrow>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2 }}>
        Hi, this is just some text we put in here.
      </Box>
    </LeftGrow>
  );
};

export default Introduction;
