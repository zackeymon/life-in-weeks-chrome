import React from 'react';
import { ThemeProvider, styled, useTheme } from '@mui/material/styles';

const Grid = styled('div')`
  display: grid;
  gap: 1px;
  grid-template-rows: repeat(auto-fill, 8px);
  grid-template-columns: repeat(auto-fill, 8px);
`;

const Cell = styled('div')(({ theme }) => ({
  width: '8px',
  height: '8px',
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: '2px',
  boxSizing: 'border-box',
  backgroundColor: 'white',
}));

const Past = styled(Cell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
}));

const Future = styled(Cell)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

const Current = styled(Cell)(({ theme }) => ({
  cursor: 'pointer',
  border: `2px solid ${theme.palette.accent.main}`,
  animation: 'pulse 2s infinite',
  '&:hover': {
    animation: '0',
    borderWidth: '1px',
    transform: 'scale(2.5)',
  },
  '&:active': {
    backgroundColor: theme.palette.accent.main,
  },
}));

const CurrentChecked = styled(Cell)(({ theme }) => ({
  border: `1px solid ${theme.palette.accent.main}`,
  backgroundColor: theme.palette.grey[300],
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
