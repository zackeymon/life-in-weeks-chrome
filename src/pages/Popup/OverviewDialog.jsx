import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ConfettiExplosion from 'react-confetti-explosion';
import CoffeeIcon from '@mui/icons-material/Coffee';


const CheckedChip = styled(Chip)(({ theme }) => ({
  color: 'white',
  backgroundColor: theme.palette.grey[300],
}));

const UncheckedChip = styled(Chip)(({ theme }) => ({
  color: 'white',
  backgroundColor: theme.palette.accent.main,
}));

const CheckButton = styled(Button)(({ theme }) => ({
  color: theme.palette.accent.main,
}));


export default function OverviewDialog({
  open,
  setOpen,
  thisWeek,
  remainingWeeks,
  checked,
  ageGoal,
  checkThisWeek,
}) {
  const theme = useTheme();

  const [isExploding, setIsExploding] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheck = () => {
    checkThisWeek();
    setIsExploding(true);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        {`Week ${thisWeek} `}
        {checked ? (
          <CheckedChip size="small" label="checked" />
        ) : (
          <UncheckedChip size="small" label="unchecked" />
        )}
      </DialogTitle>
      {checked
        ? (
          <DialogContent sx={{ minHeight: '100px', minWidth: '400px' }} >
            <DialogContentText>
              {`It's been ${thisWeek} weeks since you are born.`}
            </DialogContentText>
            <DialogContentText>
              {`You have ${remainingWeeks} weeks until you turn ${ageGoal}.`}
            </DialogContentText>
            <DialogContentText>
              Make this one count.
            </DialogContentText>
            <Button href='https://www.buymeacoffee.com/zackx' target='_blank' variant="outlined" size="small" sx={{ marginTop: theme.spacing(1) }} startIcon={<CoffeeIcon />}>
              buy me a coffee
            </Button>
          </DialogContent>
        )
        : (
          <DialogContent sx={{ minHeight: '100px', minWidth: '400px' }}>
            <DialogContentText>
              Check to reveal more information.
            </DialogContentText>
          </DialogContent>
        )
      }
      <DialogActions>
        {isExploding && <ConfettiExplosion force={0.2} particleCount={30} width={500} zIndex={9001} />}
        <CheckButton
          onClick={handleCheck}
          disabled={checked}
        >
          Check!
        </CheckButton>
        <Button onClick={handleClose} disabled={!checked} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}