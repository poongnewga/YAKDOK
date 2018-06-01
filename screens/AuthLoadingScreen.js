import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    props.checkUser(props.navigation);
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {  };
};

const ConnectedAuthLoadingScreen = connect(mapStateToProps, actions)(AuthLoadingScreen);
export { ConnectedAuthLoadingScreen };
