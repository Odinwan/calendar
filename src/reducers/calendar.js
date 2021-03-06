
import { CHOSE_DAY,CHOSE_ALL_DATE,ADD_ENTRY,CHOSE_WEEK_INDEX,CHOSE_WEEK_ARR,ADD_ALL_DAY_MONTH,DELETE_ENTRY } from '../../constants';

const initialState = {
  choseDay: '',
  choseAllDate: '',
  choseWeekIndex: 0,
  choseWeekArr: [],
  allDayMonth: [],
  entryMass: {
      '06.08.2020' : {day:'06.08.2020',first : { entry:'first',startHour: 10,startMinutes: 0, endHour: 10, endMinutes:30, message: "Useless Placeholder"}},
      '07.08.2020' : {day:'07.08.2020',first : { entry:'first',startHour: 10,startMinutes: 0, endHour: 10, endMinutes:59, message: "Uselessasff Placeholder"}},
      '08.08.2020' : {day:'08.08.2020',first : { entry:'first',startHour: 10,startMinutes: 0, endHour: 10, endMinutes:59, message: "Uselessasff Placeholder"}},
      '09.08.2020' : {day:'09.08.2020',first : { entry:'first',startHour: 11,startMinutes: 0, endHour: 11, endMinutes:59, message: "Uselessasff Placeholder"}},
      '10.08.2020' : {day:'10.08.2020',first : { entry:'first',startHour: 10,startMinutes: 0, endHour: 10, endMinutes:30, message: "Useless Placeholder"}},
      '11.08.2020' : {day:'11.08.2020',first : { entry:'first',startHour: 10,startMinutes: 0, endHour: 10, endMinutes:59, message: "Uselessasff Placeholder"}},
      '12.08.2020' : {day:'12.08.2020',first : { entry:'first',startHour: 10,startMinutes: 0, endHour: 10, endMinutes:59, message: "Uselessasff Placeholder"}},
      '15.08.2020' : {day:'15.08.2020',first : { entry:'first',startHour: 11,startMinutes: 0, endHour: 11, endMinutes:59, message: "Uselessasff Placeholder"}},
    }
}

export default function peopleReducer(state = initialState, action) {
  switch (action.type) {
    case CHOSE_DAY:
      return {
        ...state,
        choseDay: action.payload
      };
    case ADD_ALL_DAY_MONTH:
      return {
        ...state,
        allDayMonth: action.payload
      };
    case DELETE_ENTRY: 
        return {
          ...state,
          entryMass:  {
            ...state.entryMass,
            ...{[Object.keys(action.payload)[0]] : Object.assign({},state.entryMass[Object.keys(action.payload)[0]], delete action.payload[Object.keys(action.payload)[0]])}
          }
        }
    case CHOSE_WEEK_INDEX:
      return {
        ...state,
        choseWeekIndex: action.payload
      };
    case CHOSE_ALL_DATE:
      return {
        ...state,
        choseAllDate: action.payload
      };
    case CHOSE_WEEK_ARR:
      return {
        ...state,
        choseWeekArr: action.payload
      };
    case ADD_ENTRY:
      return {
        ...state,
        entryMass:  {
          ...state.entryMass,
          ...{[Object.keys(action.payload)[0]] : Object.assign({},state.entryMass[Object.keys(action.payload)[0]],action.payload[Object.keys(action.payload)[0]])}
        }
      };
    default:
      return state;
  }
}
