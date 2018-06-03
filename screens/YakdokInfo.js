import React from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, ScrollView, RefreshControl } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
    props.setYakdok(props.navigation.getParam('id'), props.yakdoks);

  }

  renderUsers = (host, members) => {
    let listItems = [];

    listItems.push(
      <View key={host.email} style={{width: 50, alignItems: 'center', marginTop: 5}}>
        <FontAwesome name="user" size={35} color="#654EA3" />
        <Text style={{fontSize: 12, marginTop: 3}}>{host.name}</Text>
        {members[host.email].yes == true ? (
          <FontAwesome style={{position: 'absolute', top:0, right:7}} name="check-circle" size={10} color="green" />
        ) : (
          <FontAwesome style={{position: 'absolute', top:0, right:7}} name="times-circle" size={10} color="red" />
        )}
      </View>
    );

    for (let id in members) {
      if (host.email != id) {
        listItems.push(
          <View key={id} style={{width: 50, alignItems: 'center', marginTop: 5}}>
            <FontAwesome name="user" size={35} color="gray" />
            <Text style={{fontSize: 12, marginTop: 3}}>{members[id].name}</Text>
            {members[id].yes == true ? (
              <FontAwesome style={{position: 'absolute', top:0, right:7}} name="check-circle" size={10} color="green" />
            ) : (
              <FontAwesome style={{position: 'absolute', top:0, right:7}} name="times-circle" size={10} color="red" />
            )}
          </View>
        );
      }
    }

    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        {listItems}
      </View>
    );
  }

  renderResult = (enrolled, total, data) => {
    let options = {...data};

    if (options.length == 0) {
      return (
        <View style={{marginBottom: 10}}>
          <Text style={{fontSize: 13, color: '#545454'}}>가능한 시간대가 없습니다.</Text>
          <Text style={{fontSize: 13, color: 'red', textAlign: 'right', marginTop: 10}}>약똑 불가능</Text>
        </View>
      );
    } else {
      if (options[0]) {
        return (
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 13, color: '#545454'}}>{moment(options[0].begin).format("M월 D일(ddd) A h:mm")}</Text>
            {(enrolled==total)&&(options[0].yes==total) ? (
              <Text style={{fontSize: 13, color: 'green', textAlign: 'right', marginTop: 10}}>약똑 완료</Text>
            ) : (
              <Text style={{fontSize: 13, color: 'orange', textAlign: 'right', marginTop: 10}}>{options[0].yes} / {total}인 가능</Text>
            )}
          </View>
        );
      } else {
        return (
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 13, color: '#545454'}}>가능한 시간대가 없습니다.</Text>
            <Text style={{fontSize: 13, color: 'red', textAlign: 'right', marginTop: 10}}>약똑 불가능</Text>
          </View>
        );
      }
    }
  }

  compare = (a,b) => {
    if (a.yes > b.yes) {
      return -1;
    }
    if (a.yes < b.yes) {
      return 1;
    }
    return 0;
  }

  renderTable = (data, enrolled, total, color) => {
    let rows = [];
    let options = [...data];

    options = options.sort(this.compare);
    options.shift();

    for (let item in options) {
      rows.push(
        <View key={options[item].begin} style={{flexDirection: 'row'}}>
          <View style={{width:'50%', backgroundColor: '#ebebeb', alignItems: 'center', justifyContent: 'center', height: 20, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#d2d2d2'}}>
            <Text style={{fontSize: 12}}>{moment(options[item]).format("M월 D일(ddd) A h:mm")}</Text>
          </View>
          <View style={{width:'50%', alignItems: 'center', justifyContent: 'center', height: 20, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#d2d2d2'}}>
            <Text style={{fontSize: 12}}>
              {(enrolled==total)&&(options[item].yes==total) ? (
                <Text style={{fontSize: 13, color: 'green', textAlign: 'right', marginTop: 10}}>약똑 완료</Text>
              ) : (
                <Text style={{fontSize: 13, color: 'orange', textAlign: 'right', marginTop: 10}}>{options[item].yes} / {total}인 가능</Text>
              )}
            </Text>
          </View>
        </View>
      );
    }

    if (options.length == 0) {
      return (
        <View style={{marginTop: 10, alignItems: 'center'}}>
          <Text style={{color: 'orange', fontSize: 12}}>추가적으로 가능한 시간대가 없습니다.</Text>
        </View>
      );
    } else {
      return (
        <View style={{borderTopWidth: 2, borderLeftWidth: 2, borderColor: '#d2d2d2', borderColor: '#d2d2d2', marginTop: 10, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#d2d2d2' }}>
          {rows}
        </View>
      );
    }
  }

  render() {

    const { title, location, time, begin, end, enrolled, total, host, members, options } = this.props.yakdokItem;
    let color = 'black';
    if ((enrolled/total) < 0.3) {
      color = 'red';
    } else if ((enrolled/total) < 0.6) {
      color = 'orange';
    } else if ((enrolled/total) < 1) {
      color = 'yellow';
    } else if ((enrolled/total) == 1) {
      color = 'green';
    }

    return (
      <View style={{flex: 1, backgroundColor: '#654EA3'}}>
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              style={{backgroundColor: '#654EA3'}}
              tintColor={'white'}
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >


          <View style={{
            width: '85%',
            backgroundColor: 'white',
            marginBottom: 20,
            borderRadius: 7,
            padding: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,}}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
              <View style={{width: '50%'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{title}</Text>
                <Text style={{fontSize: 12, fontWeight: 'bold', color: '#878787', marginTop: 10}}>@{location}</Text>
              </View>
              {this.renderResult(enrolled, total, options)}
            </View>


            <View style={{marginBottom: 5, alignItems: 'center'}}>
              <View style={{width: DEVICE_WIDTH * 0.74}}>
                <Text style={{color: color, textAlign: 'right', fontSize: 12}}>{enrolled} / {total} 명이 일정을 등록했습니다.</Text>
              </View>
            </View>


            <View style={{alignItems: 'center'}}>
              <Progress.Bar
                style={{backgroundColor: '#d2d2d2', borderColor: 'white'}}
                color={color}
                borderRadius={7}
                progress={enrolled/total}
                width={DEVICE_WIDTH * 0.75}
                height={10}
              />
            </View>


            <View style={styles.header}>
              <Text>후순위 시간</Text>
            </View>
            {options.length==0 ? (
              <View style={{marginTop: 10, alignItems: 'center'}}>
                <Text style={{color: 'orange', fontSize: 12}}>추가적으로 가능한 시간대가 없습니다.</Text>
              </View>
            ) : (
              this.renderTable(options, enrolled, total)
            )}

            <View style={styles.header}>
              <Text>참가자 명단</Text>
            </View>
            {this.renderUsers(host, members)}


            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 10}}>
              <TouchableOpacity style={{width: 80, height: 25, backgroundColor: "#949494", justifyContent: 'center', alignItems: 'center', borderRadius: 15}}>
                <Text style={{fontWeight: 'bold', color: 'white', fontSize: 13}}>공유하기</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{width: 80, height: 25, backgroundColor: "#949494", justifyContent: 'center', alignItems: 'center', borderRadius: 15}}>
                <Text style={{fontWeight: 'bold', color: 'white', fontSize: 13}}>수정하기</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{width: 80, height: 25, backgroundColor: "#949494", justifyContent: 'center', alignItems: 'center', borderRadius: 15, backgroundColor: 'purple'}}>
                <Text style={{fontWeight: 'bold', color: 'white', fontSize: 13}}>확정짓기</Text>
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
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

const mapStateToProps = ({yakdok}, ownProps) => {
  const { yakdokItem, yakdoks } = yakdok;
  return { yakdokItem, yakdoks };
};

const ConnectedYakdokInfo = connect(mapStateToProps, actions)(YakdokInfo);
export { ConnectedYakdokInfo };
