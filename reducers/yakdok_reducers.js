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

    default:
      return state;
  }
}
