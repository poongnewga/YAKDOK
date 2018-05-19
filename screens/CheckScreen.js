import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

class CheckScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>약속확인</Text>
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
});

export { CheckScreen };
