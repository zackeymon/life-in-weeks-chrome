import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from './Popup';
import logo from '../../assets/img/icon-128.png';
import logoDark from '../../assets/img/icon-128-dark.png';

const Icon = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.action.active,
  marginRight: theme.spacing(0.5),
  '&:hover': {
    color: theme.palette.action.hover,
  },
}));

const Logo = styled('img')(() => ({
  width: '25px',
}));

const UncheckedPrompt = styled(Typography)(({ theme }) => ({
  color: theme.palette.accent.main,
}));

export default function HeaderBar({ checked, setDialogOpen, uncheckHack }) {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const logoSrc = theme.palette.mode === 'light' ? logoDark : logo;
  return (
    <Grid container sx={{ paddingBottom: theme.spacing(0.4) }}>
      <Grid item xs={1}>
        <Logo src={logoSrc} alt="logo" onDoubleClick={uncheckHack} />
      </Grid>
      <Grid item xs={9}>
        {checked
          ? <Typography variant="subtitle1">Make this week count.</Typography>
          : <UncheckedPrompt variant="subtitle1">Click on the box to check off this week.</UncheckedPrompt>}
      </Grid>
      <Grid item xs={2}>
        <Grid container justifyContent="flex-end">
          <Icon onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </Icon>
          <Icon>
            <InfoOutlinedIcon
              onClick={() => setDialogOpen(true)}
            />
          </Icon>
          <Icon>
            <SettingsOutlinedIcon
              onClick={() => chrome.runtime.openOptionsPage()}
            />
          </Icon>
        </Grid>
      </Grid>
    </Grid>
  );
}
