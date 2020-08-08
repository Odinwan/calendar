import {CHOSE_DAY, ADD_ENTRY, CHOSE_ALL_DATE, CHOSE_WEEK_INDEX, CHOSE_WEEK_ARR,ADD_ALL_DAY_MONTH} from '../../constants';

export function choseDay(day) {
  return {
    type: 'CHOSE_DAY',
    payload: day,
  };
}

export function choseAllDate(date) {
  return {
    type: 'CHOSE_ALL_DATE',
    payload: date
  }
}

export function addEntry(element) {
  return {
    type: 'ADD_ENTRY',
    payload: element
  }
}

export function choseWeekDay(index) {
  return {
    type: 'CHOSE_WEEK_INDEX',
    payload: index
  }
}
export function choseWeekArr(arr) {
  return {
    type: 'CHOSE_WEEK_ARR',
    payload: arr
  }
}
export function addAllDayMonth(arr) {
  return {
    type: 'ADD_ALL_DAY_MONTH',
    payload: arr
  }
}
