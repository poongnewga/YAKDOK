import { AsyncStorage } from 'react-native';
import moment from 'moment/min/moment-with-locales.min.js';
import {
  GET_YD, SET_TODO, GET_TODO, SELECT_DAY
} from './types.js';


// TODO: id값을 인덱스값으로 삼자.
export const getYakdoks = () => {
  // console.warn('약똑 리스트 가져오기')
  return async (dispatch) => {
    // dispatch({ type: GET_YD, payload: [
    //   {
    //     title: '가족식사',
    //     location: '@내찜닭',
    //     date: '날짜'
    //   }
    // ]});

  }

}

export const getYakdok = (id) => {
  return async (dispatch) => {
    dispatch({ type: GET_YD, payload: [
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      },
      {
        title: '가족식사',
        location: '@내찜닭',
        date: '날짜'
      }
    ]});
  }

}



export const inviteMember = (id) => {
  console.warn('hi')
  return async (dispatch) => {
    // dispatch({ type: GET_YD, payload: [
    //   {
    //     title: '가족식사',
    //     location: '@내찜닭',
    //     date: '날짜'
    //   }
    // ]});
  }

}
