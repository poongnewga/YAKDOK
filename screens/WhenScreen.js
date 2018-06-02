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
    props.getTodos(props.email);
  }

  componentDidMount () {
    let today = moment().format('YYYY-MM-DD');
    this.setState({current: today, last: today});
  }

  state = {
    marked: {
      [moment().format('YYYY-MM-DD')]: {selected: true, selectedColor: '#654EA3'},
      '2018-06-03': {marked: true, dotColor: '#654EA3'},
    }
  }

  selectDay = (day) => {
    this.setState({
      current: day.dateString,

      marked: {
        ...this.state.marked,
        [this.state.last]: {...this.state.marked[this.state.last], selected: false},
        [day.dateString]: {...this.state.marked[day.dateString], selected: true, selectedColor: '#654EA3'}
      },

      last: day.dateString
    })
  }

  markDay = () => {
    let arr = [{start: 1526734580251, end: 1526738580251},{start: 1626734580251, end: 1626738580251}]

    this.setState({
      marked: {}
    })
  }


  // day.dateString
  // day.month day.day
  // day.timestamp day.year
  render() {
    return (
      <View style={styles.container}>
        <Calendar
          markedDates={this.state.marked}
          style={{
            height: 360,
            width: DEVICE_WIDTH
          }}
          // Initially visible month. Default = Date()
          current={this.state.current}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2018-01-01'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={'2018-12-30'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {this.selectDay(day)}}
          // Handler which gets executed on day long press. Default = undefined
          // onDayLongPress={(day) => {console.log('selected day', day)}}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy년 M월'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {console.log('month changed', month)}}
          // Hide month navigation arrows. Default = false
          hideArrows={false}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={substractMonth => substractMonth()}
          // Handler which gets executed when press arrow icon left. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
        />
        <View style={styles.schedule}>
          <View style={{width: '90%', height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{width: '70%'}}>
              <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>{moment(this.state.current).format('YYYY / MM / DD')}</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('어디')}
              style={{width: 30, height: 30, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 15}}
            >
              <Text style={{fontSize: 18, color: '#654EA3', fontWeight: 'bold', textAlign: 'center'}}>+</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{width:'90%'}}
            contentContainerStyle={{paddingBottom: 400}}
          >
            <TouchableOpacity style={{paddingLeft: 20, marginBottom: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center', height: 30}}>
                <Text style={{fontSize: 10, color: 'white', marginLeft: 10}}>●</Text>
                <Text style={{fontSize: 20, color: 'white', marginLeft: 10}}>캠퍼스 씨이오</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', height: 30, marginLeft: 30}}>
                <MaterialIcons name="schedule" size={16} color="white" />
                <Text style={{fontSize: 16, color: 'white', marginLeft: 10}}>오전 10:00 ~ 오후 1:00</Text>
              </View>
            </TouchableOpacity>


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
  const { todos, marked } = todo;
  return { email, todos };
};

const ConnectedWhenScreen = connect(mapStateToProps, actions)(WhenScreen);

export { ConnectedWhenScreen };
