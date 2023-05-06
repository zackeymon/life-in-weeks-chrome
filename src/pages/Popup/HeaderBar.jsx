import React from 'react';
import { styled, useTheme, ThemeProvider } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import logo from '../../assets/img/icon-128.png';

const Icon = styled('div')(({ theme }) => ({
  cursor: 'pointer',
}));

const Logo = styled('img')(({ theme }) => ({
  width: '25px',
}));

const UncheckedPrompt = styled(Typography)(({ theme }) => ({
  color: theme.palette.accent.main,
}));

export default function HeaderBar(props) {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ paddingBottom: theme.spacing(0.4) }}>
        <Grid item xs={1}>
          <Logo src={logo} alt="logo" />
        </Grid>
        <Grid item xs={10}>
          {props.checked
            ? <Typography variant="subtitle1">Make this week count.</Typography>
            : <UncheckedPrompt variant="subtitle1">Time to check off this week.</UncheckedPrompt>}
        </Grid>
        <Grid item xs={1}>
          <Grid container justifyContent="flex-end">
            <Icon>
              <InfoOutlinedIcon onClick={() => props.setDialogOpen(true)} />
            </Icon>
            <Icon>
              <SettingsOutlinedIcon
                onClick={() => chrome.runtime.openOptionsPage()}
              />
            </Icon>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
