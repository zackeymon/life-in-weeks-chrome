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
import { grey } from '@mui/material/colors';

const StyledContainer = styled(Container)(({ theme }) => ({
  width: '798px',
  minHeight: '300px',
  padding: theme.spacing(3),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    accent: {
      main: 'rgb(235, 141, 0)',
    },
    ...(mode === 'light'
      ? {
        action: {
          hover: grey[400],
          disabledBackground: grey[300],
        }
      }
      : {
        background: {
          default: grey[900],
        },
        action: {
          hover: grey[700],
          disabledBackground: grey[800],
        }
      }),
  },
});


export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function Popup() {
  const [ready, setReady] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [ageGoal, setAgeGoal] = useState(undefined);
  const [thisWeek, setThisWeek] = useState(undefined);
  const [remainingWeeks, setRemainingWeeks] = useState(undefined);
  const [mode, setMode] = React.useState(undefined);

  useEffect(() => {
    chrome.storage.sync.get(['birthday', 'ageGoal', 'checked', 'colorMode'], (data) => {
      const birthday = moment(data.birthday);
      setChecked(data.checked);
      setAgeGoal(data.ageGoal);
      setThisWeek(getWeekNumberSince(birthday));
      setRemainingWeeks(getWeekNumberUntil(birthday.add(ageGoal, 'years')));
      setMode(data.colorMode);
      setReady(!!ageGoal);
    });
  });

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          chrome.storage.sync.set({ colorMode: newMode });
          return newMode;
        });
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme(getDesignTokens(mode)),
    [mode],
  );

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

  return (
    <ColorModeContext.Provider value={colorMode}>
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
    </ColorModeContext.Provider>
  );
}
