import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import LifeGrid from './LifeGrid';
import HeaderBar from './HeaderBar';
import OverviewDialog from './OverviewDialog';
import { getWeekNumberSince, getWeekNumberUntil } from '../common';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  width: '798px',
  minHeight: '300px',
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default function Popup() {
  const [ready, setReady] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [ageGoal, setAgeGoal] = useState(undefined);
  const [thisWeek, setThisWeek] = useState(undefined);
  const [remainingWeeks, setRemainingWeeks] = useState(undefined);

  useEffect(() => {
    chrome.storage.sync.get(['birthday', 'ageGoal', 'checked'], (data) => {
      const birthday = moment(data.birthday);
      setChecked(data.checked);
      setAgeGoal(data.ageGoal);
      setThisWeek(getWeekNumberSince(birthday));
      setRemainingWeeks(getWeekNumberUntil(birthday.add(ageGoal, 'years')));

      setReady(!!ageGoal);
    });
  });

  const checkThisWeek = () => {
    setChecked(true);
    chrome.storage.sync.set({ checked: true });
    chrome.action.setBadgeText({
      text: '',
    });
  };

  const uncheckHack = () => {
    setChecked(false);
    chrome.storage.sync.set({ checked: false });
  }

  const theme = createTheme({
    palette: {
      accent: {
        main: 'rgb(235, 141, 0)',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer component="div">
        <CssBaseline />
        {!ready
          ? <CircularProgress disableShrink />
          : (
            <Container disableGutters component="div">
              <OverviewDialog
                open={dialogOpen}
                checked={checked}
                thisWeek={thisWeek}
                ageGoal={ageGoal}
                remainingWeeks={remainingWeeks}
                setOpen={setDialogOpen}
                checkThisWeek={checkThisWeek}
              />

              <HeaderBar checked={checked} setDialogOpen={setDialogOpen} uncheckHack={uncheckHack} />

              <LifeGrid
                totalWeeks={thisWeek + remainingWeeks}
                thisWeek={thisWeek}
                checked={checked}
                setDialogOpen={setDialogOpen}
              />
            </Container>
          )}
      </StyledContainer>
    </ThemeProvider>
  );
}
