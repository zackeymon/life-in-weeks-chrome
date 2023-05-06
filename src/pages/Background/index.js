import '../../assets/img/icon-128.png';

import moment from 'moment';
import { getWeekNumberSince } from '../common';

const DEFAULT_AGE_GOAL = 90;

console.log("Hello from the background script!");

function nextMonday9AM() {
  // return moment().add(15, 'seconds');
  const thisMonday9AM = moment().isoWeekday(1).hour(9).startOf('hour');
  return moment() < thisMonday9AM ? thisMonday9AM : thisMonday9AM.add(1, 'weeks');
}

function setNextAlarm() {
  chrome.alarms.create('newWeek', { when: nextMonday9AM().valueOf() });
}

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    chrome.storage.sync.set({ ageGoal: DEFAULT_AGE_GOAL });
    chrome.runtime.openOptionsPage();
  }
  chrome.storage.sync.get(['birthday', 'checked'], ({ birthday, checked }) => {
    if (!birthday) {
      return;
    }
    if (!checked) {
      chrome.action.setBadgeText({ text: getWeekNumberSince(moment(birthday)).toString() });
    }
  });
  setNextAlarm();
});

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
