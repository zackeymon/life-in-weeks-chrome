import React from 'react';
import { ThemeProvider, styled, useTheme } from '@mui/material/styles';

const Grid = styled('div')`
  display: grid;
  grid-template-rows: repeat(auto-fill, 8px);
  grid-template-columns: repeat(auto-fill, 8px);
`;

const Cell = styled('div')(({ theme }) => ({
  width: '8px',
  height: '8px',
  boxSizing: 'border-box',
}));

const Past = styled(Cell)(({ theme }) => ({
  backgroundColor: theme.palette.action.disabled,
}));

const Future = styled(Cell)(({ theme }) => ({
  backgroundColor: theme.palette.action.disabledBackground,
}));

const Current = styled(Cell)(({ theme }) => ({
  cursor: 'pointer',
  border: `1.5px solid ${theme.palette.accent.main}`,
  backgroundColor: theme.palette.action.disabledBackground,
  zIndex: 1,
  "@keyframes pulsate": {
    from: {
      boxShadow: `0 0 0 0px ${theme.palette.accent.main}`
    },
    to: {
      boxShadow: `0 0 5px 8px rgba(0, 0, 0, 0)`
    }
  },
  animation: "pulsate 1s infinite ease",
  '&:hover': {
    borderWidth: '1px',
    transform: 'scale(2.5)',
  },
  '&:active': {
    backgroundColor: theme.palette.accent.main,
  },
}));

const CurrentChecked = styled(Cell)(({ theme }) => ({
  border: `1.5px solid ${theme.palette.accent.main}`,
  backgroundColor: theme.palette.action.disabled,
  zIndex: 1,
  "@keyframes pulsate": {
    from: {
      boxShadow: `0 0 0 0px ${theme.palette.accent.main}`
    },
    to: {
      boxShadow: `0 0 5px 8px rgba(0, 0, 0, 0)`
    }
  },
  animation: "pulsate 3s infinite ease",
}));

export default function LifeGrid(props) {
  const { thisWeek, totalWeeks, checked, setDialogOpen } = props;
  const weekNumbers = Array.from({ length: totalWeeks }, (_, i) => i + 1);
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Grid>
        {weekNumbers.map((weekNumber) => {
          if (weekNumber < thisWeek) {
            return <Past key={weekNumber} />;
          }

          if (weekNumber > thisWeek) {
            return <Future key={weekNumber} />;
          }

          if (checked) {
            return <CurrentChecked key={weekNumber} />;
          }

          return (
            <Current key={weekNumber} onClick={() => setDialogOpen(true)} />
          );
        })}
      </Grid>
    </ThemeProvider>
  );
}
