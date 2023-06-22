import '../../assets/img/icon-128.png';

import moment from 'moment';
import { getWeekNumberSince } from '../common';

chrome.runtime.onInstalled.addListener(() => {
  const DEFAULT_PARAMS = {
    'birthday': '1999-01-01',
    'ageGoal': 90,
    'checked': false,
    'weekBeginDay': 1,
    'weekBeginTime': '09:00',
    'colorMode': 'light',
  };
  chrome.storage.sync.get(DEFAULT_PARAMS, ({ birthday, ageGoal, checked, weekBeginDay, weekBeginTime, colorMode }) => {
    chrome.storage.sync.set({ birthday, ageGoal, checked, weekBeginDay, weekBeginTime, colorMode }, () => {
      setNextAlarm();
      chrome.runtime.openOptionsPage();
    });
    if (!checked) {
      chrome.action.setBadgeText({ text: getWeekNumberSince(moment(birthday)).toString() });
    }
  });
});


export function setNextAlarm() {
  chrome.storage.sync.get(['weekBeginDay', 'weekBeginTime'], ({ weekBeginDay, weekBeginTime }) => {
    const weekBeginTimeMoment = moment(weekBeginTime, 'HH:mm');
    const nextAlarmTime = moment().isoWeekday(weekBeginDay).hour(weekBeginTimeMoment.hour()).minute(weekBeginTimeMoment.minute()).startOf('minute');
    // Check if nextAlarmTime has already passed
    if (nextAlarmTime.isBefore(moment())) {
      // If it has, add one week to nextAlarmTime
      nextAlarmTime.add(1, 'week');
    }

    console.log(nextAlarmTime.format('dddd, MMMM Do YYYY, h:mm:ss a'));
    chrome.alarms.create('newWeek', { when: nextAlarmTime.valueOf() });
  });
}


chrome.alarms.onAlarm.addListener(() => {
  chrome.storage.sync.get(['birthday'], ({ birthday }) => {
    const weekNumber = getWeekNumberSince(moment(birthday)).toString();
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon-128.png',
      title: `Week ${weekNumber} has begun`,
      message: 'Click on the extension icon to check this week off',
    });
    chrome.action.setBadgeText({ text: weekNumber });
    chrome.storage.sync.set({ checked: false });
    setNextAlarm();
  });
});
