import React from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableHighlight, TextInput } from 'react-native';

import { connect } from 'react-redux';
import * as actions from '../actions';

const DEVICE_WIDTH = Dimensions.get('window').width;

class AuthScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { header: null }
  }

  state = {
    email : "",
    password: ""
  }

  doLogin = () => {
    if (this.state.email == "heejae@likelion.org") {
      if (this.state.password == "1234") {

      } else {
        console.warn("패스워드가 일치하지 않습니다.")
      }
    } else {
      console.warn("아이디가 존재하지 않습니다.")
    }
  }

  render() {
    const { container, font, inputForm, inputFont, loginBtn } = styles;
    return (
      <View style={container}>
        <View style={inputForm}>
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

        <TouchableHighlight
          onPress={()=>{this.props.doLogin(this.props.navigation, this.state.email, this.state.password)}}
          style={loginBtn}
          underlayColor="#f4c413"
        >
          <Text style={{color: "black", fontSize: 16}}>로그인</Text>
        </TouchableHighlight>
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
    width: '70%',
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

const mapStateToProps = (state, ownProps) => {
  return {  };
};

const ConnectedAuthScreen = connect(mapStateToProps, actions)(AuthScreen);
export { ConnectedAuthScreen };
