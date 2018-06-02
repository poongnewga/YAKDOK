import React from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment/min/moment-with-locales.min.js';
moment.locale('ko');

import { connect } from 'react-redux';
import * as actions from '../actions';
import * as Progress from 'react-native-progress';
const DEVICE_WIDTH = Dimensions.get('window').width;
class YakdokInfo extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { title: '약똑 정보'}
  }

  render() {
    const { title, location, date, enrolled, all } = this.props.yakdok;
    let color = 'black';
    if ((enrolled/all) < 0.3) {
      color = 'red';
    } else if ((enrolled/all) < 0.6) {
      color = 'orange';
    } else if ((enrolled/all) < 1) {
      color = 'yellow';
    } else if ((enrolled/all) == 1) {
      color = 'green';
    }

    return (
      <View style={styles.container}>
        {/* <Text onPress={this.enrollSchedule}>약똑{this.props.navigation.getParam('id')}</Text> */}
        <View style={styles.card}>
          <View style={{width: '90%'}}>

            <View style={{marginBottom: 10}}>
              <Text style={{textAlign: 'right', fontWeight: 'bold'}}>{moment(date).format('M월 D일 (ddd) A hh:mm')}</Text>
            </View>
            <Text>{title}</Text>


            <View style={{marginBottom: 10}}>
              <Text style={{color: color, textAlign: 'right'}}>{enrolled} / {all} 명이 일정을 등록했습니다.</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Progress.Bar
                style={{backgroundColor: '#d2d2d2', borderColor: 'white'}}
                color={color}
                borderRadius={7}
                progress={enrolled/all}
                width={DEVICE_WIDTH * 0.9 * 0.9}
                height={10}
              />
            </View>

            <View style={styles.header}>
              <Text>후순위 시간</Text>
            </View>
            <View style={styles.header}>
              <Text>참가자 명단</Text>
            </View>


          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#654EA3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    paddingVertical: 12,
    alignItems: 'center'
  },
  header: {
    borderBottomWidth: 3,
    borderColor: '#d2d2d2',
    paddingBottom: 3,
    marginTop: 20
  }
});

const mapStateToProps = ({todo}, ownProps) => {
  const { yakdok } = todo;
  return { yakdok };
};

const ConnectedYakdokInfo = connect(mapStateToProps, actions)(YakdokInfo);
export { ConnectedYakdokInfo };
