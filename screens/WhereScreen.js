import React from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment/min/moment-with-locales.min.js';
moment.locale('en');

class WhereScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { title: '약똑잡기'}
  }

  state = {
    title: "",
    begin: moment().format('YYYY-MM-DD hh:mm A'),
    end: moment().add(1, 'hour').format('YYYY-MM-DD hh:mm A')
  }

  enrollSchedule = async () => {
    let t = await axios({
      method: 'post',
      url: 'http://localhost:3000/schedules',
      data: {
        phone: '010-3375-4005',
        title: this.state.title,
        begin: moment(this.state.begin, "YYYY-MM-DD hh:mm A").valueOf(),
        end: moment(this.state.end, "YYYY-MM-DD hh:mm A").valueOf()
      }
    });

    if (t.data["status"] == "ok") {
      this.props.navigation.navigate('언제');
    } else {

    }
  }

  changeBeginTime = (time) => {
    this.setState({begin: time});
  }

  changeEndTime = (time) => {
    this.setState({end: time});
  }

  render() {
    // this.temp();
    return (
      <View style={styles.container}>
        {/* <Text onPress={this.enrollSchedule}>일정 등록</Text> */}

        <View style={[styles.inputform, {width: '80%', marginLeft: 15}]}>
          <TextInput placeholderTextColor="#c5c5c5" value={this.state.title}
            maxLength={50}
            selectionColor={"#c5c5c5"}
            autoCapitalize={'none'} onChangeText={(text)=>{
              this.setState({checkedNickname: null});
              this.setState({title: text});
            }} returnKeyType="done"
            autoCorrect={false} underlineColorAndroid={"rgba(0,0,0,0)"}
            autoFocus={false} keyboardType="email-address" placeholder="일정을 입력해주세요." style={styles.tinput}
          />
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

        <TouchableHighlight onPress={this.enrollSchedule} style={{width: 100, height: 50, backgroundColor: '#654EA3', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: "#FFFFFF", fontSize: 16}}>등록</Text>
        </TouchableHighlight>
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
    // color: '#4a4a4a',
    // fontSize: 14,
    // paddingLeft: 20,
    // width: '100%',
    // height: 30,
    color: '#654EA3'
  },
});

// const styles = StyleSheet.create({
//   container : {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   inputform: {
//     width: '100%',
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: '#8b8b8b',
//     backgroundColor: 'rgba(0,0,0,0)',
//     marginBottom: 10
//   },
//   tinput: {
//     color: '#4a4a4a',
//     fontSize: 14,
//     paddingLeft: 20,
//     width: '100%',
//     height: 30,
//   },
// });

export { WhereScreen };
