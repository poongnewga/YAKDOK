import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

class WhereScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>어디에서</Text>
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

export { WhereScreen };
