import React from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment/min/moment-with-locales.min.js';
import { connect } from 'react-redux';
import * as actions from '../actions';

class TodoScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { title: '새로운 일정'}
  }

  constructor(props) {
    super(props);
    moment.locale('en');
  }

  componentDidMount () {
    let now = moment().subtract(moment().minute()%10, 'minutes').add(10, 'minutes');
    let todayDate = moment(now.format('YYYY-MM-DD'))
    let begin = moment(this.props.current).add(moment.duration(now.diff(todayDate))["_milliseconds"], 'millisecond').format('YYYY-MM-DD hh:mm A');
    this.setState({
      begin: begin,
      end: moment(begin, 'YYYY-MM-DD hh:mm A').add(1, 'hour').format('YYYY-MM-DD hh:mm A'),
    });
  }

  state = {
    title: "",
    location: "",
    error: ""
  }

  enrollTodo = ({navigate}) => {
    this.setState({error: ""})

    if (this.state.begin == this.state.end) {
      this.setState({error: "시작시간과 종료시간은 달라야 합니다."})
      return;
    }

    if (this.state.title == "") {
      this.setState({error: "일정명은 반드시 있어야 합니다."})
      return;
    }

    this.props.setTodo(
      navigate,
      this.props.email,
      this.state.title,
      this.state.location,
      moment(this.state.begin, "YYYY-MM-DD hh:mm A").valueOf(),
      moment(this.state.end, "YYYY-MM-DD hh:mm A").valueOf(),
      this.props.todos,
      this.props.marked,
      this.props.schedules
    );
  }


  changeBeginTime = (time) => {
    if (moment(this.state.end, "YYYY-MM-DD hh:mm A").isSameOrBefore(moment(time, "YYYY-MM-DD hh:mm A").valueOf())) {
      this.setState({begin: this.state.end, end: time});
    } else {
      this.setState({begin: time});
    }
  }

  changeEndTime = (time) => {
    if (moment(this.state.begin, "YYYY-MM-DD hh:mm A").isSameOrBefore(moment(time, "YYYY-MM-DD hh:mm A").valueOf())) {
      this.setState({end: time});
    } else {
      this.setState({begin: time, end: this.state.begin});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{width: '80%'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#654EA3', marginBottom: 10}}>제목</Text>
          <View style={styles.inputform}>
            <TextInput placeholderTextColor="#c5c5c5" value={this.state.title}
              maxLength={50}
              selectionColor={"#c5c5c5"}
              autoCapitalize={'none'} onChangeText={(text)=>{
                this.setState({title: text});
              }} returnKeyType="done"
              autoCorrect={false} underlineColorAndroid={"rgba(0,0,0,0)"}
              autoFocus={false} placeholder="일정명을 입력해주세요." style={styles.tinput}
            />
          </View>

          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#654EA3', marginBottom: 10}}>장소</Text>
          <View style={styles.inputform}>
            <TextInput placeholderTextColor="#c5c5c5" value={this.state.location}
              maxLength={50}
              selectionColor={"#c5c5c5"}
              autoCapitalize={'none'} onChangeText={(text)=>{
                this.setState({location: text});
              }} returnKeyType="done"
              autoCorrect={false} underlineColorAndroid={"rgba(0,0,0,0)"}
              autoFocus={false} placeholder="장소를 입력해주세요." style={styles.tinput}
            />
          </View>

          <DatePicker
            style={{width: "100%", marginBottom: 30}}
            date={this.state.begin}
            mode="datetime"
            format="YYYY-MM-DD hh:mm A"
            confirmBtnText="확인"
            cancelBtnText="취소"
            showIcon={true}
            iconComponent={(
              <View style={{height: '100%', width: 50,
                 position: 'absolute', left: 0,
                 justifyContent: 'center'}}>
                <Text style={{fontSize: 18, color: '#654EA3', fontWeight: 'bold'}}>시작</Text>
              </View>
            )}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 50,
                borderColor: "#d2d2d2"
              }
            }}
            minuteInterval={10}
            onDateChange={(time) => {this.changeBeginTime(time);}}
          />
          <DatePicker
            style={{width: "100%", marginBottom: 30}}
            date={this.state.end}
            mode="datetime"
            format="YYYY-MM-DD hh:mm A"
            confirmBtnText="확인"
            cancelBtnText="취소"
            showIcon={true}
            iconComponent={(
              <View style={{height: '100%', width: 50,
                 position: 'absolute', left: 0,
                 justifyContent: 'center'}}>
                <Text style={{fontSize: 18, color: '#654EA3', fontWeight: 'bold'}}>종료</Text>
              </View>
            )}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 50,
                borderColor: "#d2d2d2"
              }
            }}
            minuteInterval={10}
            onDateChange={(time) => {this.changeEndTime(time);}}
          />
        </View>


        <TouchableHighlight onPress={() => {this.enrollTodo(this.props.navigation)}}
          style={{width: 100, height: 40, backgroundColor: '#654EA3', justifyContent: 'center', alignItems: 'center', borderRadius: 20}}
        >
          <Text style={{color: "#FFFFFF", fontSize: 16, fontWeight: 'bold'}}>등록</Text>
        </TouchableHighlight>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 18, color: '#f46958'}}>{this.state.error}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputform: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#d2d2d2',
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 30,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  tinput: {
    color: '#654EA3'
  },
});


const mapStateToProps = ({ auth, todo }, ownProps) => {
  const { email } = auth;
  const { todos, marked, current, schedules } = todo;
  return { email, todos, marked, current, schedules };
};

const ConnectedTodoScreen = connect(mapStateToProps, actions)(TodoScreen);

export { ConnectedTodoScreen };
