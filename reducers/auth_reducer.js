import {
  ENROLL_USER
} from '../actions/types';

const INITIAL_STATE = {
  email: '',

};

export default function ( state = INITIAL_STATE, action ) {
  switch (action.type) {
    case ENROLL_USER:
      return {...state, email: action.payload};

    default:
      return state;
  }
}
