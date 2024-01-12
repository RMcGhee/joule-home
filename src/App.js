import React from 'react';
import { ThemeProvider, Grid, Link, Paper, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './App.css';

const user_home_url = "http://rmcghee.github.io/";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Paper style={{ padding: 20, marginTop: 30 }}>
          <Grid container direction="column" alignItems="center" justify="center">
            <Grid item>
              <h1>RMcGhee.GitHub.io</h1>
            </Grid>
            <Grid item>
              <Link href={user_home_url + "cs_projects.html"}>CS Projects</Link>
            </Grid>
            <Grid item>
              <Link href="synbio.html">Synthetic Biology</Link><br />
            </Grid>
            <Grid item>
              <Link href="photography.html">Photography</Link><br />
            </Grid>
            <Grid item>
              <Link href="index.html">Home</Link><br />
            </Grid>
            <Grid item>
            <Link href="https://github.com/RMcGhee">My GitHub</Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
