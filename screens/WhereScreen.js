import React from 'react';
import axios from 'axios';
import { Text, View, StyleSheet } from 'react-native';

class WhereScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { title: '새로운 일정'}
  }

  state = {temp: 1}

  enrollSchedule = async () => {
    let t = await axios({
      method: 'post',
      url: 'http://localhost:3000/schedules',
      data: {
        phone: '010-3375-4005',
        begin: 100,
        end: 200
      }
    });

    if (t.data["status"] == "ok") {
      this.props.navigation.navigate('언제');
    } else {

    }
  }

  kk = () => {
    this.setState({temp: 3})
    console.warn("hee")
  }

  render() {
    // this.temp();
    return (
      <View style={styles.container}>
        <Text onPress={this.enrollSchedule}>일정 등록</Text>
        <Text>{this.state.temp}</Text>


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
