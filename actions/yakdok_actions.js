import { AsyncStorage } from 'react-native';
import moment from 'moment/min/moment-with-locales.min.js';
import {
  GET_YD, SET_YD, SET_TODO, GET_TODO, SELECT_DAY, ADD_MEMBERS
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

export const setYakdok = (id, yakdoks) => {
  return async (dispatch) => {
    dispatch({ type: SET_YD, payload: {...yakdoks[id]}});
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



export const inviteMember = (navigate, newData, oldData) => {
  let members = { ...newData }
  return async (dispatch) => {
    dispatch({ type: ADD_MEMBERS, payload: members });
  }

}
