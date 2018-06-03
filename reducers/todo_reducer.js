import {
  GET_TODO, SET_TODO, SELECT_DAY
} from '../actions/types';
import moment from 'moment/min/moment-with-locales.min.js';
moment.locale('ko');

const INITIAL_STATE = {
  todos: {},
  marked: {},
  yakdoks: {},
  yakdok: {
    title: '가족식사',
    location: '@내찜닭',
    date: 1527918072710,
    enrolled: 2,
    all: 5
  },
  current: moment().format('YYYY-MM-DD'),
  last: moment().format('YYYY-MM-DD'),
  schedules: []
};

export default function ( state = INITIAL_STATE, action ) {
  switch (action.type) {

    case GET_TODO:
      return {...state, marked: action.marked, todos: action.payload, schedules: action.schedules};
    case SET_TODO:
      return {...state, marked: action.marked, todos: action.payload, schedules: action.schedules};
    case SELECT_DAY:
      return {
        ...state,
        current: action.payload.current,
        marked: action.payload.marked,
        last: action.payload.last
      }

    default:
      return state;
  }
}
