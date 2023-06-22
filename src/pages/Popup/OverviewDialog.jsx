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
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DoneIcon from '@mui/icons-material/Done';
import Typography from '@mui/material/Typography';


const TitleChip = styled(Chip)(({ theme }) => ({
  color: 'white',
  borderRadius: '5px',
  fontWeight: 'bold',
  height: '35px',
  marginTop: theme.spacing(1),
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
        {checked
          ? <TitleChip icon={<DoneIcon fontSize='small' color='white' />} label={`Week ${thisWeek}`} sx={{ backgroundColor: theme.palette.grey[400] }} />
          : <TitleChip icon={<AutorenewIcon fontSize='small' color='white' />} label={`Week ${thisWeek}`} sx={{ backgroundColor: theme.palette.accent.main }} />
        }
      </DialogTitle>
      {checked
        ? (
          <DialogContent sx={{ minHeight: '150px', minWidth: '400px' }} >
            <DialogContentText>
              <Typography variant="subtitle1">
                {`It's been ${thisWeek} weeks since you were born.`}
              </Typography>
              <Typography variant="subtitle1">
                {`You have ${remainingWeeks} weeks until you turn ${ageGoal}.`}
              </Typography>
              <Typography variant="subtitle1">
                Make this one count.
              </Typography>
            </DialogContentText>
            <Button href='https://www.buymeacoffee.com/zackx' target='_blank' variant="outlined" size="small" sx={{ marginTop: theme.spacing(1) }} startIcon={<CoffeeIcon />}>
              Buy me a coffee
            </Button>
          </DialogContent>
        )
        : (
          <DialogContent sx={{ minHeight: '150px', minWidth: '400px' }}>
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