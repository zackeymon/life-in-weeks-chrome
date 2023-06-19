import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { SnackbarProvider } from 'material-ui-snackbar-provider';
import OptionsForm from './OptionsForm';
import Description from './Description';
import { useTheme, styled } from '@mui/material/styles';
import moment from 'moment';
import { setNextAlarm } from '../Background/index';
import logo from '../../assets/img/icon-128-dark.png';

const Logo = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export default function Options() {
  const [ready, setReady] = useState(false);
  const [birthday, setBirthday] = useState(null);
  const [ageGoal, setAgeGoal] = useState(90);
  const [weekBeginDay, setWeekBeginDay] = useState(1);
  const [weekBeginTime, setWeekBeginTime] = useState(moment().hour(10).minute(0));

  useEffect(() => {
    chrome.storage.sync.get(['birthday', 'ageGoal', 'weekBeginDay', 'weekBeginTime'], ({ birthday: currentBirthday, ageGoal: currentAgeGoal, weekBeginDay: currentWeekBeginDay, weekBeginTime: currentWeekBeginTime }) => {
      setBirthday(moment(currentBirthday));
      setAgeGoal(currentAgeGoal);
      setWeekBeginDay(currentWeekBeginDay);
      setWeekBeginTime(moment(currentWeekBeginTime, 'HH:mm'));
      setReady(true);
    });
  }, []);

  const updateOptions = (newBirthday, newAgeGoal, newWeekBeginDay, newWeekBeginTime) => {
    chrome.storage.sync.set({
      birthday: newBirthday,
      ageGoal: newAgeGoal,
      weekBeginDay: newWeekBeginDay,
      weekBeginTime: newWeekBeginTime,
      checked: false
    }, () => { setNextAlarm(); });
  };

  const theme = useTheme();

  return (
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 8000 }}>
      <Container component="div" maxWidth="xs" sx={{
        marginTop: theme.spacing(8),
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
                <Logo src={logo} alt='logo' />
              </Grid>
              <Grid item xs={12}>
                <OptionsForm
                  birthday={birthday}
                  setBirthday={setBirthday}
                  ageGoal={ageGoal}
                  setAgeGoal={setAgeGoal}
                  weekBeginDay={weekBeginDay}
                  setWeekBeginDay={setWeekBeginDay}
                  weekBeginTime={weekBeginTime}
                  setWeekBeginTime={setWeekBeginTime}
                  updateOptions={updateOptions} />
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
