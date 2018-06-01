import {
  ENROLL_USER
} from '../actions/types';

const INITIAL_STATE = {
  email: '',


  user_token: null,
  password: '',
  error: '',
  loading: false,

  sign_nickname: '',
  sign_password: '',
  sign_password_check: '',
  sign_gender: null,
  sign_age: "26",
  sign_agree_all : false,
  sign_agree_privacy: false,
  sign_agree_service: false,
  sign_agree_location: false,
  logout: null,
};

export default function ( state = INITIAL_STATE, action ) {
  switch (action.type) {
    case ENROLL_USER:
      return {...state, email: action.payload};

    default:
      return state;
  }
}
