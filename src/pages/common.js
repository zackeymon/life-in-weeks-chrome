import moment from 'moment';

function calculateDiffInWeeks(olderMoment, newerMoment) {
  const beginningOfWeek = olderMoment.clone()
    .isoWeekday(1)
    .hour(9)
    .startOf('hour')
    .subtract(1, 'seconds');
  return newerMoment.diff(beginningOfWeek, 'week');
}

export function getWeekNumberSince(pastMoment) {
  return calculateDiffInWeeks(pastMoment, moment()) + 1;
}

export function getWeekNumberUntil(futureMoment) {
  return calculateDiffInWeeks(moment(), futureMoment);
}
