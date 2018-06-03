import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { FontAwesome } from '@expo/vector-icons';

class InviteUser extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '인원 선택',
      backButtonTitle: ''
    }
  }

  state = {
    result: {
      // name: '안운장',
      // email: 'woong@likelion.org'
    },
    error: true,
    members: {
    }

  }

  startYakdok = () => {
    if (this.state.members.length == 0) {
      console.warn('0명 입니다.')
    } else {
      this.props.navigation.navigate('기간선택');
    }
  }

  searchUser = () => {
    console.warn(this.state.email)
  }

  addUser = () => {
    if (this.state.members[this.state.result.email]) {
      // console.warn("이미 추가되어 있습니다.")
    } else {
      // console.warn("추가합니다.")
      let temp = {...this.state.members};

      temp[this.state.result.email] = this.state.result.name;

      this.setState({ members: temp });
    }
  }

  renderMembers = () => {
    let list=[];
    for (let member in this.state.members) {
      list.push(
        <TouchableOpacity
          onPress={()=>{this.deleteMember(member)}} key={member}
          style={{
          alignItems: 'center', justifyContent: 'space-between',
          width: '100%', height: 40, backgroundColor: '#ebebeb',
          borderRadius: 7, borderWidth: 1, borderColor: '#d2d2d2',
          backgroundColor: 'white', marginBottom: 10, paddingLeft: 10,
          paddingRight: 10, flexDirection: 'row'}}
        >
          <Text>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>{this.state.members[member]} ({member})</Text>
          </Text>
          <FontAwesome name="times-circle" size={25} color="red" />
        </TouchableOpacity>
      )
    }

    if (list.length == 0) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: 40, backgroundColor: '#ebebeb', borderRadius: 7, borderWidth: 1, borderColor: '#d2d2d2', backgroundColor: 'white', marginBottom: 10 }} >
          <Text style={{fontWeight: 'bold', color: 'orange', fontSize: 18}}>초대된 인원이 없습니다.</Text>
        </View>
      );
    } else {
      return list;
    }
  }

  deleteMember = (member) => {
    let temp = {...this.state.members};
    delete temp[member];
    this.setState({members: temp})
  }

  renderIcon = () => {
    if (this.state.members[this.state.result.email]) {
      return (
        <FontAwesome name="check-circle" size={25} color="green" />
      );
    } else {
      return (
        <FontAwesome name="plus-circle" size={25} color="orange" />
      );
    }
  }

  countMembers = () => {
    let cnt=0;
    for (let i in this.state.members) {
      cnt++;
    }
    return (
      <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18, marginBottom: 10, marginTop: 10}}>
        초대된 인원 ({cnt}명)
      </Text>
    );
  }

  inviteUser = () => {
    this.props.inviteMember(this.props.navigation.navigate, this.state.members);
    this.props.navigation.navigate('약속잡기')
  }

  render() {
    const { container, font, inputForm, inputFont, loginBtn } = styles;
    return (
      <View style={container}>
        <View style={{width: '85%', height: '100%'}}>

          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18, marginBottom: 10}}>
            사용자 검색
          </Text>
          <View style={inputForm}>
            <TextInput placeholderTextColor="#c5c5c5" value={this.state.email}
              maxLength={50}
              selectionColor={"#c5c5c5"}
              keyboardType="email-address"
              autoCapitalize={'none'} onChangeText={(text)=>{
                this.setState({email: text});
              }} returnKeyType="done"
              autoCorrect={false} underlineColorAndroid={"rgba(0,0,0,0)"}
              autoFocus={false} placeholder="Email을 입력해주세요" style={inputFont}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={this.searchUser} style={{borderRadius:20, width:80, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'purple', marginBottom: 10}}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>검색</Text>
            </TouchableOpacity>
          </View>

          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18, marginBottom: 10}}>
            검색 결과
          </Text>
          {this.state.error==true?(
            <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: 40, backgroundColor: '#ebebeb', borderRadius: 7, borderWidth: 1, borderColor: '#d2d2d2', backgroundColor: 'white', marginBottom: 10 }} >
              <Text style={{fontWeight: 'bold', color: 'orange', fontSize: 18}}>검색 결과가 없습니다.</Text>
            </View>
          ):(
            <TouchableOpacity
              style={{
              alignItems: 'center', justifyContent: 'space-between',
              width: '100%', height: 40, backgroundColor: '#ebebeb',
              borderRadius: 7, borderWidth: 1, borderColor: '#d2d2d2',
              backgroundColor: 'white', marginBottom: 10, paddingLeft: 10,
              paddingRight: 10, flexDirection: 'row'}}
              onPress={this.addUser}
            >
              <Text>
                <Text style={{fontWeight: 'bold', color: '#654EA3', fontSize: 18}}>{this.state.result.name} ({this.state.result.email})</Text>
              </Text>
              {this.renderIcon()}
            </TouchableOpacity>
          )}

          {this.countMembers()}
          <ScrollView>
            {this.renderMembers()}
          </ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 10}}>
            <TouchableOpacity onPress={this.inviteUser} style={{borderRadius:20, width:80, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'purple', marginBottom: 10}}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>초대</Text>
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
    marginBottom: 10,
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

const ConnectedInviteUser = connect(mapStateToProps, actions)(InviteUser);

export { ConnectedInviteUser };
