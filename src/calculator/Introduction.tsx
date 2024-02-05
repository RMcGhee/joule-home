import React from 'react';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { LeftGrow } from '../common/Basic';

const Introduction: React.FC = () => {
  return (
    <LeftGrow>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2 }}>
        <h2>This is a work in progress, and is not currently functional.</h2>
        joule-home is a free calculator to help you figure out how much you could save on home heating and cooling if you replaced
        your gas furnace/AC combo with a heat pump.
        <br/>With just a few pieces of information about your home, your current system, how much energy you currently use,
        and location, we should be able to get a decent picture of your overall conditioning needs, and how that would
        be affected by an upgrade.
        <br/>
        For most people and situations, replacing a working, moderately efficient gas furnace/AC combo before its end of life won't
        be a big savings, but if you're looking at replacing them anyways, it may be much more efficient to switch to a heat pump.
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} textAlign='center' justifyContent={'center'}>
                <Paper>
                    <Typography variant="h6">Required</Typography>
                    <Divider />
                    {["Nearest Zipcode", "Current Furnace efficiency (%)", 
                        "Current AC efficiency (SEER)", 
                        "Gas/electric price per unit"].map(item => (
                        <Typography key={item} sx={{ marginBottom: 1.3, padding: 1 }}>
                            {item}
                        </Typography>
                     ))}
                </Paper>
            </Grid>
            {/* <Grid item xs={12} sm={6} textAlign='center'>
                <Paper>
                    <Typography variant="h6">Optional</Typography>
                    <Divider />
                    {["Gas/electric bill by month", "Home sqft",].map(item => (
                        <Typography key={item} sx={{ marginBottom: 1.3, padding: 1 }}>
                            {item}
                        </Typography>
                     ))}
                </Paper>
            </Grid> */}
        </Grid>
        Don't worry, we won't hide your results at the end by asking for your email or phone number.
        <br/>We don't wan't those.
      </Box>
    </LeftGrow>
  );
};

export default Introduction;
