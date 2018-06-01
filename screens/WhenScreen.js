import React from 'react';
import { Text, View, Dimensions, StyleSheet, Button } from 'react-native';
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

class WhenScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { header: null }
  }

  // constructor(props) {
  //   super(props);
  //   props.checkUser(props.navigation);
  // }


  componentDidMount () {
    let today = moment().format('YYYY-MM-DD');
    this.setState({current: today, last: today});
  }

  state = {
    marked: {[moment().format('YYYY-MM-DD')]: {selected: true, selectedColor: '#654EA3'}}
  }

  selectDay = (day) => {
    this.setState({
      current: day.dateString,
      marked: {[day.dateString]: {selected: true, selectedColor: '#654EA3'}}
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
          monthFormat={'yyyy MM'}
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
          <View style={styles.dateInfo}>
            <Text>{moment(this.state.current).format('YYYY / MM / DD')}</Text>
            <Text>2018 / 01 / 01{this.props.email}</Text>
            <Button
              title="+"
              onPress={() => this.props.navigation.navigate('어디')}
            />
          </View>
        </View>
      </View>
    );
  }
}

// export { WhenScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 50
    // justifyContent: 'center',

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
    // user_token: state.auth.user_token,
    // email: state.auth.email,
    // password: state.auth.password,
    // loading: state.auth.loading,
    // error: state.auth.error
  // };
};

const ConnectedWhenScreen = connect(mapStateToProps, actions)(WhenScreen);

export { ConnectedWhenScreen };
