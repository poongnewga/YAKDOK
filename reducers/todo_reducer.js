import {
  GET_YD
} from '../actions/types';

const INITIAL_STATE = {
  todos: [],
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

    default:
      return state;
  }
}
