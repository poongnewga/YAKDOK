import React from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import moment from 'moment/min/moment-with-locales.min.js';

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

class SelectDay extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { header: null }
  }

  constructor(props) {
    super(props);

  }

  componentDidMount () {
    let today = moment().format('YYYY-MM-DD');
    this.setState({current: today, last: today});
  }

  state = {
    selecting: false,
    finished: false,
    start: '',
    end: '',
    // marked: {[moment().format('YYYY-MM-DD')]: {selected: true, selectedColor: '#654EA3'}}
    marked: {

    }
  }
  // day.dateString
  // day.month day.day
  // day.timestamp day.year
  selectInterval = (day) => {
    if (this.state.selecting == true) {
      let s=this.state.start, e='', temp='';

      if (moment(this.state.start).isBefore(day.dateString) || this.state.start == day.dateString) {
        this.setState({end: day.dateString});
        e = day.dateString;
      } else {
        this.setState({start:day.dateString, end: this.state.start});
        s = day.dateString;
        e = this.state.start;
      }
      temp = s;

      let marked_temp = {};
      if (s != e ) {
        while (moment(temp).isSameOrBefore(e)) {
          if (moment(temp).isSame(s)) {
            marked_temp[temp] = {startingDay: true, selected: true, color: '#654EA3', textColor: 'white'}
            temp = moment(temp).add(1, 'day').format('YYYY-MM-DD');
            continue;
          } else if (moment(temp).isSame(e)) {
            marked_temp[temp] = {endingDay: true, selected: true, color: '#654EA3', textColor: 'white'}
            temp = moment(temp).add(1, 'day').format('YYYY-MM-DD');
            continue;
          }

          marked_temp[temp] = {selected: true, color: '#654EA3', textColor: 'white'}
          temp = moment(temp).add(1, 'day').format('YYYY-MM-DD');
        }
      } else {
        marked_temp[temp] = {startingDay: true, endingDay: true, selected: true, color: '#654EA3', textColor: 'white'}
      }



      this.setState({
        marked: marked_temp,
        selecting: false
      });

    } else {
      // 처음 선택하거나, 선택 완료 후 다시 클릭할 때.
      this.setState({
        marked: {
        [day.dateString]: {startingDay: true, selected: true, endingDay: true, color: '#654EA3', textColor: 'white'}
        },
        start: day.dateString,
        end: day.dateString,
        selecting: true
      });
    }
  }

  selectDay = (day) => {
    // this.setState({
    //   current: day.dateString,
    //   marked: {[day.dateString]: {selected: true, selectedColor: '#654EA3'}}
    // })
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
          markingType={'period'}
          // Initially visible month. Default = Date()
          current={this.state.current}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2018-01-01'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={'2018-12-30'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {this.selectInterval(day)}}
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
          {/* <View style={styles.dateInfo}>
            <Text>{moment(this.state.current).format('YYYY / MM / DD')}</Text>
            <Text>2018 / 01 / 01{this.props.email}</Text>
            <Button
              title="+"
              onPress={() => this.props.navigation.navigate('어디')}
            />
          </View> */}
          <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', marginTop: 20}}>약속 희망 날짜를 선택해주세요.</Text>
          <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', marginTop: 20}}>시작 : {this.state.start}</Text>
          <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', marginTop: 20}}>끝 : {this.state.end}</Text>
          <TouchableOpacity
            style={{backgroundColor: 'purple', width: 100, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20}}
            onPress={()=>{
              console.warn('heee')
            }}
          >
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// export { SelectDay };

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

const mapStateToProps = ({ auth }, ownProps) => {
  const { email } = auth;
  return { email };
};

const ConnectedSelectDay = connect(mapStateToProps, actions)(SelectDay);

export { ConnectedSelectDay };
