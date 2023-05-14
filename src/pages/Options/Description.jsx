import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';
import { useTheme, ThemeProvider } from '@mui/material/styles';

export default function Description() {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={10} sx={{ padding: theme.spacing(2) }}>
        <Typography variant="caption" paragraph>
          <i>Life in Weeks - Checked</i>
          {' '}
          is intended to introduce a little urgency to life
          with a gentle weekly nudge, reminding us that our time is finite.
        </Typography>
        <Typography variant="caption" paragraph>
          Inspired by
          {' '}
          <Link href="https://waitbutwhy.com/2014/05/life-weeks.html" target="_blank" noreferrer>
            an article
          </Link>
          {' '}
          from Wait But Why.
        </Typography>
        <Typography variant="caption">
          Made with
          {' '}
          <FavoriteIcon sx={{ fontSize: 11 }} />
          {' '}
          by Zack.
        </Typography>
      </Paper>
    </ThemeProvider>
  );
}
