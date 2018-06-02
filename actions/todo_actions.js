import { AsyncStorage } from 'react-native';
import moment from 'moment/min/moment-with-locales.min.js';
import {
  GET_YD, SET_TODO
} from './types.js';

// TODO: id값을 인덱스값으로 삼자.
export const getYakdoks = () => {
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


// 일정 가져오기
export const getTodos = (user, data) => {
  return async (dispatch) => {
    // console.warn(user + '_Todos');
    let todos = await AsyncStorage.getItem(user + '_Todos');

    // console.warn(todos);


    dispatch({ type: GET_YD, payload: []});
  }

}

// Redux와 로컬 스토리지에 모두 저장.
// 일단 앱이 켜지면서 기본적인 일정은 다 로드된 상태.
export const setTodo = (navigate, email, title, begin, end, todos, marked) => {
  return async (dispatch) => {
    console.warn(marked);
    let marked_temp = {};
    let temp = moment(begin).format('YYYY-MM-DD');
    let s = temp, e = moment(end).format('YYYY-MM-DD');

    while (moment(temp).isSameOrBefore(e)) {
      marked_temp[temp] = {...marked_temp[temp], marked: true, dotColor: '#654EA3'};

      temp = moment(temp).add(1, 'day').format('YYYY-MM-DD');
    }

    console.warn(marked_temp);
    // 기존에 마크된 것은 그대로 두고, 안된 경우 마크한다.




    // console.warn(email + " " + title + " " + moment(begin).format('YYYY-MM-DD hh:mm A') + " " + end);
    // let todos = await AsyncStorage.getItem(user + '_Todos');

    // console.warn(todos);


    dispatch({ type: SET_TODO, payload: { marked_temp }});
  }

}
