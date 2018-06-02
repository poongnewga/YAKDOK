import {
  GET_YD, SET_TODO
} from '../actions/types';

const INITIAL_STATE = {
  todos: [],
  marked: {},
  yakdoks: [],
  yakdok: {
    title: '가족식사',
    location: '@내찜닭',
    date: 1527918072710,
    enrolled: 2,
    all: 5
  }
};

export default function ( state = INITIAL_STATE, action ) {
  switch (action.type) {

    case GET_YD:
      // console.warn(action)
      return {...state, yakdoks: action.payload};
    case SET_TODO:
      return {...state, marked: action.payload.marked_temp}

    default:
      return state;
  }
}
