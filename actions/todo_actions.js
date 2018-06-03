import { AsyncStorage } from 'react-native';
import moment from 'moment/min/moment-with-locales.min.js';
import {
  SET_TODO, GET_TODO, SELECT_DAY
} from './types.js';

// 일정 가져오기
export const getTodos = (email, marked) => {
  return async (dispatch) => {
    // console.warn(user + '_Todos');
    let todos_temp = await AsyncStorage.getItem(email + '_todos');
    todos_temp = JSON.parse(todos_temp);
    // console.warn(todos_temp);

    // todos_temp 에 스토리지에서 로드한 todos가 저장되어 있음.
    let marked_temp = {...marked}
    let s='',e='',t='';
    let schedules_temp = {};

    for (let id in todos_temp) {

      s = todos_temp[id]["begin"];
      e = todos_temp[id]["end"];
      t = s;

      while (moment(t).isSameOrBefore(moment(e))) {
        marked_temp[moment(t).format("YYYY-MM-DD")] = {
          ...marked_temp[moment(t).format("YYYY-MM-DD")],
          marked: true,
          dotColor: '#654EA3'
        };


        if (schedules_temp[moment(t).format("YYYY-MM-DD")] == undefined) {
          schedules_temp[moment(t).format("YYYY-MM-DD")] = [];
        } else {
          schedules_temp[moment(t).format("YYYY-MM-DD")] = [...schedules_temp[moment(t).format("YYYY-MM-DD")]];
        }

        schedules_temp[moment(t).format("YYYY-MM-DD")].push({
          title: todos_temp[id]["title"],
          location: todos_temp[id]["location"],
          begin: s,
          end: e,
          id: id
        });

        t = moment(t).add(1,'day').valueOf()
      }

    }
    // console.warn(marked_temp)
    dispatch({
      type: GET_TODO,
      marked: marked_temp,
      payload: {...todos_temp},
      schedules: schedules_temp
    });
  }

}

// Redux와 로컬 스토리지에 모두 저장.
// 일단 앱이 켜지면서 기본적인 일정은 다 로드된 상태.
// id : { yakdok } 형태로 저장
export const setTodo = (navigate, email, title, location, begin, end, todos, marked, schedules) => {
  return async (dispatch) => {

    // 일정 로드
    let todos_temp = await AsyncStorage.getItem(email + '_todos');
    // console.warn(email + '_todos');
    // console.warn(todos_temp)
    todos_temp = JSON.parse(todos_temp);
    // 아이디 지정을 위한 카운터
    let cnt = await AsyncStorage.getItem('cnt');
    cnt = parseInt(cnt);
    // console.warn(cnt);

    // store 저장용
    let temp = {...todos};
    temp[cnt] = { email, title, location, begin, end }
    // storage 저장용
    todos_temp[cnt] = { email, title, location, begin, end }
    cnt++;
    await AsyncStorage.setItem('cnt', cnt.toString());
    await AsyncStorage.setItem((email + '_todos'), (JSON.stringify(todos_temp)));


    // todos_temp 에 새로운 일정이 추가된 새로운 todos가 저장되어 있음.
    let marked_temp = {...marked}
    let s='',e='',t='';

    let schedules_temp = {};
    for (let id in todos_temp) {

      s = todos_temp[id]["begin"];
      e = todos_temp[id]["end"];
      t = s;

      while (moment(t).isSameOrBefore(moment(e))) {
        marked_temp[moment(t).format("YYYY-MM-DD")] = {
          ...marked_temp[moment(t).format("YYYY-MM-DD")],
          marked: true,
          dotColor: '#654EA3'
        };

        if (schedules_temp[moment(t).format("YYYY-MM-DD")] == undefined) {
          schedules_temp[moment(t).format("YYYY-MM-DD")] = [];
        } else {
          schedules_temp[moment(t).format("YYYY-MM-DD")] = [...schedules_temp[moment(t).format("YYYY-MM-DD")]];
        }

        schedules_temp[moment(t).format("YYYY-MM-DD")].push({
          title: todos_temp[id]["title"],
          location: todos_temp[id]["location"],
          begin: s,
          end: e,
          id: id
        });

        t = moment(t).add(1,'day').valueOf()
      }

    }

    // console.warn(marked_temp)

    // store 갱신
    dispatch({ type: SET_TODO, marked: marked_temp, payload: {...temp}, schedules: schedules_temp });
    navigate('언제');
  }

}

export const modifyTodo = (navigate, email, title, location, begin, end, todos, marked, schedules, modifyID) => {
  return async (dispatch) => {

    // 일정 로드
    let todos_temp = await AsyncStorage.getItem(email + '_todos');
    todos_temp = JSON.parse(todos_temp);

    // store 저장용
    let temp = {...todos};
    temp[modifyID] = { email, title, location, begin, end }
    // storage 저장용
    todos_temp[modifyID] = { email, title, location, begin, end }
    await AsyncStorage.setItem((email + '_todos'), (JSON.stringify(todos_temp)));


    // todos_temp 에 새로운 일정이 추가된 새로운 todos가 저장되어 있음.
    let marked_temp = {...marked}
    let s='',e='',t='';

    let schedules_temp = {};
    for (let id in todos_temp) {

      s = todos_temp[id]["begin"];
      e = todos_temp[id]["end"];
      t = s;

      while (moment(t).isSameOrBefore(moment(e))) {
        marked_temp[moment(t).format("YYYY-MM-DD")] = {
          ...marked_temp[moment(t).format("YYYY-MM-DD")],
          marked: true,
          dotColor: '#654EA3'
        };

        if (schedules_temp[moment(t).format("YYYY-MM-DD")] == undefined) {
          schedules_temp[moment(t).format("YYYY-MM-DD")] = [];
        } else {
          schedules_temp[moment(t).format("YYYY-MM-DD")] = [...schedules_temp[moment(t).format("YYYY-MM-DD")]];
        }

        schedules_temp[moment(t).format("YYYY-MM-DD")].push({
          title: todos_temp[id]["title"],
          location: todos_temp[id]["location"],
          begin: s,
          end: e,
          id: id
        });

        t = moment(t).add(1,'day').valueOf()
      }

    }

    // store 갱신
    dispatch({ type: SET_TODO, marked: marked_temp, payload: {...temp}, schedules: schedules_temp });
    navigate('언제');
  }

}

// 선택한 날짜 하이라이팅
export const selectDay = (day, current, last, marked, todos) => {
  return async (dispatch) => {
    // console.warn(day.dateString)
    // console.warn(todos)

    dispatch({ type: SELECT_DAY, payload: {
      current: day.dateString,
      marked: {
        ...marked,
        [last]: {...marked[last], selected: false},
        [day.dateString]: {...marked[day.dateString], selected: true, selectedColor: '#654EA3'}
      },
      last: day.dateString
    }});


    // TODO: 선택한 날에 대한 일정을 보여줘야 한다.
    // day.dateString이 현재 선택한 날.
    let schedules = [];
    for (let id in todos) {
      // console.warn(id)
      todos[id]
    }

  }

}
