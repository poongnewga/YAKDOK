import React from 'react';
import { Text, View, Dimensions, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as Progress from 'react-native-progress';
import moment from 'moment/min/moment-with-locales.min.js';
moment.locale('ko');
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


class CheckScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { header: null }
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
    props.getYakdoks();
  }

  componentDidMount () {
    // console.warn(this.props.yakdoks)
  }

  _onRefresh = () => {
    this.props.getYakdoks();
  }

  getInfo = (id) => {
    this.props.navigation.navigate('약똑정보', { id });
  }

  renderYakdoks = () => {

    let listItems = [];
    let cnt=0;
    for (let y in this.props.yakdoks) {
      const { title, location, time, begin, end, enrolled, total, host, members, options } = this.props.yakdoks[y];

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

      cnt++;
      listItems.push(
        <TouchableOpacity
          key={y}
          style={styles.listItem}
          onPress={()=>{this.getInfo(y)}}
        >
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
            <View style={{width: '50%'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>{title}</Text>
              <Text style={{fontSize: 12, fontWeight: 'bold', color: '#878787', marginTop: 10}}>@{location}</Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 13, color: '#545454'}}>{moment(options[0].begin).format("M월 D일(ddd) A h:mm")}</Text>
              {(enrolled==total)&&(options[0].yes==total) ? (
                <Text style={{fontSize: 13, color: color, textAlign: 'right', marginTop: 10}}>약똑 완료</Text>
              ) : (
                <Text style={{fontSize: 13, color: color, textAlign: 'right', marginTop: 10}}>{options[0].yes} / {total}인 가능</Text>
              )}
            </View>
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


        </TouchableOpacity>
      );
    }

    if (cnt == 0) {
      return (
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
          <Text style={{color: 'white', fontSize: 20, marginTop: DEVICE_HEIGHT * 0.35}}>
            약똑이 존재하지 않습니다.
          </Text>
          <Text style={{color: 'white', fontSize: 20, marginTop: 10}}>
            약똑과 함께 약속을 똑똑하게 잡아보세요 :)
          </Text>
          <TouchableOpacity
            style={{borderRadius:20, width:120, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'purple', marginTop: 20}}
            onPress={()=>{this.props.navigation.navigate('약속잡기')}}
          >
            <Text style={{color: 'white', fontSize: 20}}>
              약똑잡기
            </Text>
          </TouchableOpacity>
        </ScrollView>
      );
    } else {

      return (
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
          {listItems}
        </ScrollView>
      );
    }
  }



  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#654EA3'}}>
        {this.renderYakdoks()}
      </View>
    );


    if (!this.props.yakdoks.length) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              style={{backgroundColor: '#654EA3'}}
              tintColor={'white'}
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          contentContainerStyle={styles.emptyContainer}
        >
          <Text style={{color: 'white', fontSize: 20}}>
            약똑이 존재하지 않습니다.{this.renderYakdoks()}
          </Text>
        </ScrollView>
      );
    } else {
      return this.renderYakdoks(this.props.yakdoks)
    }



  }
}









const styles = StyleSheet.create({
  container: {
    backgroundColor: '#654EA3',
    paddingVertical: 50,
    alignItems: 'center'
  },
  emptyContainer: {
    flex:1,
    backgroundColor: '#654EA3',
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItem: {
    width: '85%',
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 7,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  }
});

const mapStateToProps = ({auth,todo,yakdok}, ownProps) => {
  const { email } = auth;
  const { todos } = todo;
  const { yakdoks } = yakdok;
  return { email, todos, yakdoks };
};

const ConnectedCheckScreen = connect(mapStateToProps, actions)(CheckScreen);
export { ConnectedCheckScreen };
