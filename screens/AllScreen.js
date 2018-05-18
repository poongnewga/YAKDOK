import React from 'react';
import { Text, View } from 'react-native';

class AllScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>전체</Text>
      </View>
    );
  }
}

export { AllScreen };
