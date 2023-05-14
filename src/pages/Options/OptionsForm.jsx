import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
// eslint-disable-next-line no-unused-vars
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import FeedbackIcon from '@mui/icons-material/Feedback';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useSnackbar } from 'material-ui-snackbar-provider';
import { getWeekNumberSince } from '../common';

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(4),
}));

export default function OptionsForm({ birthday, setBirthday, ageGoal, setAgeGoal, weekBeginDay, setWeekBeginDay, weekBeginTime, setWeekBeginTime, updateOptions }) {
  const MIN_AGE_GOAL = 50;
  const MAX_AGE_GOAL = 99;

  const snackbar = useSnackbar();

  const handleWeekBeginDayChange = (event) => {
    setWeekBeginDay(event.target.value);
  };

  const handleAgeGoalChange = (event) => {
    setAgeGoal(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!ageGoal || ageGoal < MIN_AGE_GOAL || ageGoal > MAX_AGE_GOAL) {
      setAgeGoal(ageGoal);
      snackbar.showMessage(`Please enter an age goal between ${MIN_AGE_GOAL} and ${MAX_AGE_GOAL}.`);
      return;
    }
    updateOptions(
      birthday.format('YYYY-MM-DD'),
      ageGoal,
      weekBeginDay,
      weekBeginTime.format('HH:mm'),
    );
    chrome.action.setBadgeText({
      text: getWeekNumberSince(birthday).toString(),
    });

    snackbar.showMessage('Saved! Open the extension on the top-right to begin.');
  };

  const theme = useTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <DatePicker
              disableFuture
              sx={{ width: '100%' }}
              value={birthday}
              onChange={setBirthday}
              openTo="year"
              format="MMMM Do, YYYY"
              label="My birthday"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Age goal" type="number" value={ageGoal} onChange={handleAgeGoalChange} />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: theme.spacing(1) }}>
            <Chip label={"New!"} size='small' color='warning' sx={{ marginBottom: theme.spacing(1.5) }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="weekBeginDaySelect">Week begins on</InputLabel>
                  <Select id="weekBeginDaySelect" value={weekBeginDay} onChange={handleWeekBeginDayChange} label="Week begins on">
                    <MenuItem value={1}>Monday</MenuItem>
                    <MenuItem value={2}>Tuesday</MenuItem>
                    <MenuItem value={3}>Wednesday</MenuItem>
                    <MenuItem value={4}>Thursday</MenuItem>
                    <MenuItem value={5}>Friday</MenuItem>
                    <MenuItem value={6}>Saturday</MenuItem>
                    <MenuItem value={7}>Sunday</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                  value={weekBeginTime}
                  inputVariant="outlined"
                  onChange={setWeekBeginTime}
                  label="At"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox disabled color="primary" />}
              label="Also show on the New Tab page"
            />
            <Chip label={"Coming soon!"} size='small' />
          </Grid>
          <Grid item xs={12}>
            <StyledButton
              variant="contained"
              type="submit"
              startIcon={<SaveIcon />}
            >
              Save
            </StyledButton>
            <StyledButton
              variant="outlined"
              startIcon={<FeedbackIcon />}
              href="https://forms.gle/7HWYXsDNSBWCNfrP9"
              target="_blank"
            >
              Feedback
            </StyledButton>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
}
