import React from 'react';
import { Text, View } from 'react-native';

class CheckScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>약속확인</Text>
      </View>
    );
  }
}

export { CheckScreen };
