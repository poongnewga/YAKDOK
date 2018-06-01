import {
  GET_YD
} from '../actions/types';

const INITIAL_STATE = {
  todos: [],
  yakdoks: []
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
