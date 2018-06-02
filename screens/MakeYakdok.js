import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MakeYakdok extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { title: '약똑잡기', header: null }
  }

  state = {
    title : "",
    location: ""
  }
  render() {
    const { container, font, inputForm, inputFont, loginBtn } = styles;
    return (
      <View style={container}>
        <View style={{width: '85%', height: '90%'}}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18, marginBottom: 10}}>
            약똑 이름
          </Text>
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
            초대하기
          </Text>
          <TouchableOpacity style={{borderRadius:7, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: 'purple', marginBottom: 10}}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>약똑 초대하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderRadius:7, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: 'skyblue', marginBottom: 10}}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>Facebook 초대하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderRadius:7, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow', marginBottom: 10}}>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 18}}>카카오톡 초대하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderRadius:7, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lime', marginBottom: 10}}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>LINE 초대하기</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={inputForm}>
          <TextInput placeholderTextColor="#c5c5c5" value={this.state.text}
            maxLength={50}
            selectionColor={"#c5c5c5"}
            autoCapitalize={'none'} onChangeText={(text)=>{
              this.setState({email: text});
            }} returnKeyType="done"
            autoCorrect={false} underlineColorAndroid={"rgba(0,0,0,0)"}
            autoFocus={false} keyboardType="email-address" placeholder="Email" style={inputFont}
          />
        </View>
        <View style={inputForm}>
          <TextInput placeholderTextColor="#c5c5c5" value={this.state.password}
            maxLength={50}
            selectionColor={"#c5c5c5"}
            autoCapitalize={'none'} onChangeText={(text)=>{
              this.setState({password: text});
            }} returnKeyType="done"
            autoCorrect={false} underlineColorAndroid={"rgba(0,0,0,0)"}
            autoFocus={false} secureTextEntry={true} placeholder="Password" style={inputFont}
          />
        </View>

        <TouchableOpacity
          onPress={()=>{this.props.doLogin(this.props.navigation, this.state.email, this.state.password)}}
          style={loginBtn}
          underlayColor="#f4c413"
        >
          <Text style={{color: "black", fontSize: 16}}>로그인</Text>
        </TouchableOpacity> */}
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

const ConnectedMakeYakdok = connect(mapStateToProps, actions)(MakeYakdok);

export { ConnectedMakeYakdok };
