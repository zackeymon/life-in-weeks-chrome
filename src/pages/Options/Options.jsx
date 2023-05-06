import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { SnackbarProvider } from 'material-ui-snackbar-provider';
import OptionsForm from './OptionsForm';
import Description from './Description';
import { useTheme } from '@mui/material/styles';

export default function Options() {
  const [ready, setReady] = useState(false);
  const [birthday, setBirthday] = useState(null);
  const [ageGoal, setAgeGoal] = useState(null);

  useEffect(() => {
    chrome.storage.sync.get(['birthday', 'ageGoal'], ({ birthday: currentBirthday, ageGoal: currentAgeGoal }) => {
      setBirthday(currentBirthday);
      setAgeGoal(currentAgeGoal);
      setReady(true);
    });
  });

  const updateOptions = (newBirthday, newAgeGoal) => {
    chrome.storage.sync.set({ birthday: newBirthday, ageGoal: newAgeGoal, checked: false });
  };

  const theme = useTheme();

  return (
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 8000 }}>
      <Container component="div" maxWidth="xs" sx={{
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <CssBaseline />
        {!ready
          ? <CircularProgress />
          : (
            <Grid container>
              <Grid item xs={12}>
                <OptionsForm birthday={birthday} ageGoal={ageGoal} updateOptions={updateOptions} />
              </Grid>
              <Grid item xs={12}>
                <Description />
              </Grid>
            </Grid>
          )}
      </Container>
    </SnackbarProvider>
  );
}
