import React from 'react';
import { Text, View, Dimensions, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import moment from 'moment/min/moment-with-locales.min.js';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as actions from '../actions';

moment.locale('ko');



const DEVICE_WIDTH = Dimensions.get('window').width;

LocaleConfig.locales['kr'] = {
  monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  monthNamesShort: ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일','월','화','수','목','금','토']
};

LocaleConfig.defaultLocale = 'kr';

class WhenScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { header: null }
  }

  constructor(props) {
    super(props);
    props.getTodos(props.email, props.marked);
  }

  // day.dateString
  // day.month day.day
  // day.timestamp day.year

  renderSchedules = () => {
    if (this.props.schedules[this.props.current]) {
      return (
        this.props.schedules[this.props.current].map((item) => {
          return (
            <TouchableOpacity
              onLongPress={()=>{this.props.navigation.navigate(
                '어디', {id: item.id}
              )}}
              key={item.id}
              style={{paddingLeft: 20, marginBottom: 20}}
            >
              <View style={{flexDirection: 'row', alignItems: 'center', height: 30}}>
                <Text style={{fontSize: 8, color: 'white', marginLeft: 10}}>●</Text>
                <Text style={{fontSize: 20, color: 'white', marginLeft: 10}}>{item.title}</Text>
              </View>
              {item.location!="" ? (
                <View style={{flexDirection: 'row', alignItems: 'center', height: 30, marginLeft: 30}}>
                  <MaterialIcons name="location-on" size={16} color="white" />
                  <Text style={{fontSize: 14, color: 'white', marginLeft: 10}}>
                    {item.location}
                  </Text>
                </View>
              ):""}
              <View style={{flexDirection: 'row', alignItems: 'center', height: 30, marginLeft: 30}}>
                <MaterialIcons name="schedule" size={16} color="white" />
                <Text style={{fontSize: 14, color: 'white', marginLeft: 10}}>
                  {moment(item.begin).format("M/D A hh:mm")} ~ {moment(item.end).format("M/D A hh:mm")}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })

      );
    } else {
      return (
        <View style={{paddingLeft: 20, flexDirection: 'row', alignItems: 'center', height: 30}}>
          <Text style={{fontSize: 8, color: 'white', marginLeft: 10}}>●</Text>
          <Text style={{fontSize: 20, color: 'white', marginLeft: 10}}>아직 일정이 없습니다.</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Calendar
          markedDates={this.props.marked}
          style={{
            height: 360,
            width: DEVICE_WIDTH
          }}
          // Initially visible month. Default = Date()
          current={this.props.current}
          minDate={'2018-01-01'}
          maxDate={'2018-12-30'}
          onDayPress={(day) => {this.props.selectDay(day, this.props.current, this.props.last, this.props.marked, this.props.todos)}}
          monthFormat={'yyyy년 M월'}
          onMonthChange={(month) => {console.log('month changed', month)}}
          // Hide month navigation arrows. Default = false
          hideArrows={false}
          onPressArrowLeft={substractMonth => substractMonth()}
          onPressArrowRight={addMonth => addMonth()}
        />

        <View style={styles.schedule}>
          <View style={{width: '90%', height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{width: '70%'}}>
              <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>{moment(this.props.current).format('YYYY / MM / DD')}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {this.props.navigation.navigate('어디');}}
              style={{width: 30, height: 30, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 15}}
            >
              <Text style={{fontSize: 18, color: '#654EA3', fontWeight: 'bold', textAlign: 'center'}}>+</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{width:'90%'}}
            contentContainerStyle={{paddingBottom: 400}}
          >
            {this.renderSchedules()}


          </ScrollView>

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
    paddingTop: 50
  },
  schedule: {
    width: DEVICE_WIDTH,
    height: 600,
    backgroundColor: '#654EA3',
    alignItems: 'center'
  },
  dateInfo: {
    width: DEVICE_WIDTH - 40,
    height: 60,
    backgroundColor: '#FFFFFF',
    marginTop: 15,
    justifyContent: 'center'
  }
});

const mapStateToProps = ({ auth, todo }, ownProps) => {
  const { email } = auth;
  const { todos, marked, yakdoks, current, last, schedules } = todo;
  return { email, todos, marked, yakdoks, current, last, schedules };
};

const ConnectedWhenScreen = connect(mapStateToProps, actions)(WhenScreen);

export { ConnectedWhenScreen };
