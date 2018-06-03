import {
  ADD_MEMBERS, GET_YD
} from '../actions/types';
import moment from 'moment/min/moment-with-locales.min.js';
moment.locale('ko');

const INITIAL_STATE = {
  // 약똑을 잡기 위해 추가한 멤버 데이터
  members: {},
  // 해당 아이디가 가진 약똑 리스트를 위한 데이터
  yakdoks: {
    "1": {
      title: "채희재와 안운장의 오지고 지리는 긴 밤을 위한 맛있는 야식과 함께하는 즐거운 코딩 시간",
      location: "채희재와 안운장의 오지고 지리는 긴 밤을 위한 맛있는 야식과 함께하는 즐거운 코딩 시간을 희집에서",
      time: 2,
      begin: 1528016295893,
      end: 1528189109839,
      host: {
        name: '채희재',
        email: 'heejae@likelion.org'
      },
      members: {
        'heejae@likelion.org': '채희재',
        'woong@likelion.org': '안운장',
        'sim@likelion.org': '심건우'
      },
      options: [
        {
          begin: 1528189109839,
          yes: 3
        },
        {
          begin: 1528283756069,
          yes: 2
        }
      ],
      enrolled: 3,
      total: 3
    },
    "2": {
      title: "두 번째 약똑",
      location: "고려대 파이빌 S306",
      time: 1,
      begin: 1528016295893,
      end: 1528189109839,
      enrolled: 1,
      total: 3,
      host: {
        name: '채희재',
        email: 'heejae@likelion.org'
      },
      members: {
        'heejae@likelion.org': '채희재',
        'woong@likelion.org': '안운장',
        'sim@likelion.org': '심건우'
      },
      options: [
        {
          begin: 1528189109839,
          yes: 2
        },
        {
          begin: 1528283756069,
          yes: 2
        }
      ],
    }
  },
  // 상세 정보를 위한 약똑 정보
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
      return {...state}

    default:
      return state;
  }
}
