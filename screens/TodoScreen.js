import React from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment/min/moment-with-locales.min.js';
moment.locale('en');
import { connect } from 'react-redux';
import * as actions from '../actions';

class TodoScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { title: '새로운 일정'}
  }

  constructor(props) {
    super(props);
  }

  state = {
    title: "",
    location: "",
    begin: moment().subtract(moment().minute()%10,'minutes').format('YYYY-MM-DD hh:mm A'),
    end: moment().add(1, 'hour').subtract(moment().minute()%10,'minutes').format('YYYY-MM-DD hh:mm A'),
    error: ""
  }

  // enrollSchedule = async () => {
  //   let t = await axios({
  //     method: 'post',
  //     url: 'http://localhost:3000/schedules',
  //     data: {
  //       phone: '010-3375-4005',
  //       title: this.state.title,
  //       begin: moment(this.state.begin, "YYYY-MM-DD hh:mm A").valueOf(),
  //       end: moment(this.state.end, "YYYY-MM-DD hh:mm A").valueOf()
  //     }
  //   });
  //
  //   if (t.data["status"] == "ok") {
  //     this.props.navigation.navigate('언제');
  //   } else {
  //
  //   }
  // }

  enrollTodo = ({navigate}) => {
    this.setState({error: ""})
    if (this.state.begin == this.state.end) {
      this.setState({error: "시작시간과 종료시간은 달라야 합니다."})
      return;
    }

    this.props.setTodo(
      navigate,
      this.props.email,
      this.state.title,
      moment(this.state.begin, "YYYY-MM-DD hh:mm A").valueOf(),
      moment(this.state.end, "YYYY-MM-DD hh:mm A").valueOf(),
      this.props.todos,
      this.props.marked
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
              autoFocus={false} placeholder="일정을 입력해주세요." style={styles.tinput}
            />
          </View>
        </View>
        <View style={{width: '80%'}}>
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
        </View>





        <DatePicker
          style={{width: "80%", marginBottom: 30}}
          date={this.state.begin}
          mode="datetime"
          format="YYYY-MM-DD hh:mm A"
          confirmBtnText="확인"
          cancelBtnText="취소"
          showIcon={true}
          iconComponent={(
            <View style={{height: '100%', width: 50,
               position: 'absolute', left: 0,
               justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 16, color: '#654EA3'}}>시작</Text>
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
          style={{width: "80%", marginBottom: 30}}
          date={this.state.end}
          mode="datetime"
          format="YYYY-MM-DD hh:mm A"
          confirmBtnText="확인"
          cancelBtnText="취소"
          showIcon={true}
          iconComponent={(
            <View style={{height: '100%', width: 50,
               position: 'absolute', left: 0,
               justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 16, color: '#654EA3'}}>종료</Text>
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
    height: 30,
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
  const { todos, marked } = todo;
  return { email, todos, marked };
};

const ConnectedTodoScreen = connect(mapStateToProps, actions)(TodoScreen);

export { ConnectedTodoScreen };
