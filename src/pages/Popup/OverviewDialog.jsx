import React from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function OverviewDialog(props) {

  const {
    open,
    setOpen,
    thisWeek,
    remainingWeeks,
    checked,
    ageGoal,
    checkThisWeek,
  } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {`Week ${thisWeek} `}
          {checked
            ? <Chip size="small" label="checked" sx={{
              color: 'white',
              backgroundColor: theme.palette.grey[300],
            }} />
            : <Chip size="small" label="unchecked" sx={{
              color: 'white',
              backgroundColor: theme.palette.accent.main,
            }} />}
        </DialogTitle>
        {checked
          ? (
            <DialogContent>
              <DialogContentText>
                {`It's been ${thisWeek} weeks since you are born.`}
              </DialogContentText>
              <DialogContentText>
                {`You have ${remainingWeeks} weeks until your turn ${ageGoal}.`}
              </DialogContentText>
              <DialogContentText>
                Make this one count.
              </DialogContentText>
            </DialogContent>
          )
          : (
            <DialogContent>
              <DialogContentText>
                Check to reveal more information.
              </DialogContentText>
            </DialogContent>
          )}
        <DialogActions>
          <Button
            onClick={checkThisWeek}
            sx={{ color: theme.palette.accent.main }}
            disabled={checked}
          >
            Check!
          </Button>
          <Button onClick={handleClose} disabled={!checked} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}