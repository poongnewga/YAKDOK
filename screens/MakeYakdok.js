import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

class MakeYakdok extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { title: '', header: null }
  }

  state = {
    title : "",
    location: "",
    time: 1,
    members: ['채희재', '안운장', '심건우']
  }

  countDown = () => {
    if (this.state.time == 1) {
      return;
    } else {
      this.setState({time: this.state.time-1})
    }
  }

  countUp = () => {
    if (this.state.time == 10) {
      return;
    } else {
      this.setState({time: this.state.time+1})
    }
  }

  startYakdok = () => {
    if (this.state.members.length == 0) {
      console.warn('0명 입니다.')
    } else {
      this.props.navigation.navigate('기간선택');
    }
  }

  render() {

    let cnt = 0;
    for (let i in this.props.members) {
      cnt++;
    }

    const { container, font, inputForm, inputFont, loginBtn } = styles;
    return (
      <View style={container}>
        <View style={{width: '85%', height: '100%'}}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18, marginBottom: 10}}>
            약똑 이름
          </Text>

          {/* 화살표로 바꿀것 */}
          {/* <FontAwesome name="user-circle-o" size={40} color="gray" /> */}


          <View style={inputForm}>
            <TextInput placeholderTextColor="#c5c5c5" value={this.state.title}
              maxLength={50}
              selectionColor={"#c5c5c5"}
              autoCapitalize={'none'} onChangeText={(text)=>{
                this.setState({title: text});
              }} returnKeyType="done"
              autoCorrect={false} underlineColorAndroid={"rgba(0,0,0,0)"}
              autoFocus={false} placeholder="일정명을 입력해주세요" style={inputFont}
            />
          </View>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18, marginBottom: 10}}>
            장소
          </Text>
          <View style={inputForm}>
            <TextInput placeholderTextColor="#c5c5c5" value={this.state.location}
              maxLength={50}
              selectionColor={"#c5c5c5"}
              autoCapitalize={'none'} onChangeText={(text)=>{
                this.setState({location: text});
              }} returnKeyType="done"
              autoCorrect={false} underlineColorAndroid={"rgba(0,0,0,0)"}
              autoFocus={false} placeholder="장소를 입력해주세요" style={inputFont}
            />
          </View>


          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18, marginBottom: 10}}>
            소요시간
          </Text>
          <View style={{height: 40, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20, }}>
            <TouchableOpacity onPress={this.countDown} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 15, width:30, height: 30, backgroundColor: 'skyblue'}}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 22, textAlign: 'center'}}>-</Text>
            </TouchableOpacity>

            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>{this.state.time} 시간</Text>

            <TouchableOpacity onPress={this.countUp} style={{justifyContent: 'center', alignItems: 'center', borderRadius: 15, width:30, height: 30, backgroundColor: 'skyblue'}}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 22, textAlign: 'center'}}>+</Text>
            </TouchableOpacity>

          </View>



          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18, marginBottom: 10}}>
            초대하기 ({'초대된 인원 : ' + cnt + '명'})
          </Text>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('초대하기')}} style={{borderRadius:7, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8d78bc', marginBottom: 10}}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>약똑 초대하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderRadius:7, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9E81E', marginBottom: 10}}>
            <Text style={{fontWeight: 'bold', color: '#3F3035', fontSize: 18}}>카카오톡 초대하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderRadius:7, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00C73C', marginBottom: 10}}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>LINE 초대하기</Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={this.startYakdok} style={{borderRadius:20, width:100, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'purple', marginBottom: 10}}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>시작하기</Text>
            </TouchableOpacity>
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
    paddingTop: 50,
    justifyContent: 'center'
  },
  font : {
    color: 'white'
  },
  inputForm: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#d2d2d2',
    backgroundColor: 'white',
    marginBottom: 30,
    justifyContent: 'center',
    paddingLeft: 10,
    borderRadius: 7
  },
  inputFont: {
    color: '#654EA3'
  },
  loginBtn: {
    width: '70%',
    borderRadius: 7,
    height: 40,
    backgroundColor: '#f4c413',
    justifyContent: 'center',
    alignItems: 'center',
  }
});


const mapStateToProps = ({ auth, yakdok }, ownProps) => {
  const { email } = auth;
  const { members } = yakdok;
  return { email, members };
};

const ConnectedMakeYakdok = connect(mapStateToProps, actions)(MakeYakdok);

export { ConnectedMakeYakdok };
