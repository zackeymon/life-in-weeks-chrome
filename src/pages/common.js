import moment from 'moment';

export function getWeekNumberSince(pastMoment) {
  return moment().diff(pastMoment, 'week') + 1;
}

export function getWeekNumberUntil(futureMoment) {
  return futureMoment.diff(moment(), 'week');
}
