import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useSnackbar } from 'material-ui-snackbar-provider';
import { getWeekNumberSince } from '../common';

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(4),
}));

export default function OptionsForm(props) {


  const [birthday, setBirthday] = useState(moment(props.birthday));
  const [ageGoal, setAgeGoal] = useState(props.ageGoal);
  const [weekBeginTime, setWeekBeginTime] = useState('2000-01-01T09');
  const [weekBeginDay, setWeekBeginDay] = useState(1);

  const snackbar = useSnackbar();

  const handleWeekBeginDayChange = (event) => {
    setWeekBeginDay(event.target.value);
  };

  const handleAgeGoalChange = (event) => {
    setAgeGoal(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!ageGoal || ageGoal < 50 || ageGoal > 98) {
      // TODO: this restores to the very initial value even when the setting is modified many times.
      setAgeGoal(props.ageGoal);
      snackbar.showMessage('Please enter an age goal between 50 and 98.');
      return;
    }
    props.updateOptions(birthday.format('YYYY-MM-DD'), ageGoal);
    chrome.action.setBadgeText({
      text: getWeekNumberSince(birthday).toString(),
    });

    snackbar.showMessage('Saved! Open the extension on the top-right to begin.');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DatePicker
              disableFuture
              fullWidth
              value={birthday}
              onChange={setBirthday}
              openTo="year"
              format="MMMM Do, YYYY"
              inputVariant="outlined"
              label="My birthday"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField variant="outlined" label="Age goal" type="number" fullWidth value={ageGoal} onChange={handleAgeGoalChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="weekBeginDaySelect">Week begins on</InputLabel>
              <Select id="weekBeginDaySelect" value={weekBeginDay} disabled onChange={handleWeekBeginDayChange} label="Week begins on">
                <MenuItem value={1}>Monday</MenuItem>
                <MenuItem value={2}>Tuesday</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TimePicker inputVariant="outlined" disabled onChange={setWeekBeginTime} label="At" />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox disabled color="primary" />}
              label="Also show on the New Tab (coming soon!)"
            />
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
