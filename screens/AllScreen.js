import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { FontAwesome } from '@expo/vector-icons';

class AllScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { title: '전체', header: null }
  }

  render() {
    const { container, font, inputForm, inputFont, loginBtn } = styles;
    return (
      <View style={container}>
        <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: '85%', height: 80, backgroundColor: 'white', marginBottom: 30,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <View style={{height: 80, width: '25%', justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome name="user-circle-o" size={40} color="gray" />
            </View>
            <View style={{height: 80, width: '50%', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>{this.props.email}</Text>
            </View>
            <TouchableOpacity onPress={()=>{this.props.doLogout(this.props.navigation.navigate, this.props.email);}} style={{height: 80, width: '25%', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 14, color: 'red'}}>로그아웃</Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity onPress={()=>{}} style={{width: '80%', borderRadius:7, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8d78bc', marginBottom: 20}}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>
              환경설정
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{}} style={{width: '80%', borderRadius:7, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8d78bc', marginBottom: 20}}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>
              실험실
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{}} style={{width: '80%', borderRadius:7, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8d78bc', marginBottom: 20}}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>
              도움말
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{}} style={{width: '80%', borderRadius:7, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8d78bc', marginBottom: 20}}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>
              고객지원
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{}} style={{width: '80%', borderRadius:7, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8d78bc', marginBottom: 20}}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>
              사용약관
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{}} style={{width: '80%', borderRadius:7, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8d78bc', marginBottom: 20}}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>
              버그 리포트
            </Text>
          </TouchableOpacity>

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


const mapStateToProps = ({ auth }, ownProps) => {
  const { email } = auth;
  return { email };
};

const ConnectedAllScreen = connect(mapStateToProps, actions)(AllScreen);

export { ConnectedAllScreen };
