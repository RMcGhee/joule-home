import React from 'react';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { LeftGrow } from '../common/Basic';

const Introduction: React.FC = () => {
  return (
    <LeftGrow>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2 }}>
        joule-home is a free calculator to help you figure out how much you could save on home heating and cooling.
        <br/>with just a few pieces of information about your home, your current system, how much you currently spend,
        and location, we should be able to get a decent picture of your overall conditioning needs, and how that would
        be affected by an upgrade.
        <br/>
        <Grid container spacing={2}>
            <Grid item sm={6} textAlign='center'>
                <Paper>
                    <Typography variant="h6">Required</Typography>
                    <Divider />
                    {["Nearest Zipcode", "Current Furnace/Heatpump efficiency (% or HSPF)", 
                        "Current AC/Heatpump efficiency (SEER)", "Average gas/electric bill in winter and summer", 
                        "Gas/electric price per unit"].map(item => (
                        <Typography key={item} sx={{ marginBottom: 1.3, padding: 1 }}>
                            {item}
                        </Typography>
                     ))}
                </Paper>
            </Grid>
            <Grid item sm={6} textAlign='center'>
                <Paper>
                    <Typography variant="h6">Optional</Typography>
                    <Divider />
                    {["Monthly Gas/Electric Bill", "Home sqft",].map(item => (
                        <Typography key={item} sx={{ marginBottom: 1.3, padding: 1 }}>
                            {item}
                        </Typography>
                     ))}
                </Paper>
            </Grid>
        </Grid>
        don't worry, we won't hide your results at the end by asking for your email or phone number.
        <br/>we don't wan't those.
      </Box>
    </LeftGrow>
  );
};

export default Introduction;
