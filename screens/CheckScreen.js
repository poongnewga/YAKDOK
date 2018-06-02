import React from 'react';
import { Text, View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CheckScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { header: null }
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
    props.getYakdoks(props.navigation);
  }

  _onRefresh = () => {
    this.props.getYakdoks();
  }

  getInfo = (id) => {
    // console.warn(id);
    this.props.navigation.navigate('약똑정보', { id });
  }

  renderYakdoks = (yakdoks) => {
    const listItems = yakdoks.map((yakdok, index) => {
      const {title, location, date} = yakdok;
      return (
        <TouchableOpacity
          key={index}
          style={styles.listItem}
          onPress={()=>{this.getInfo(index)}}
        >
          <Text>{title}</Text>
          <Text>{location}</Text>
          <Text>{date}</Text>
        </TouchableOpacity>
      );
    });

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            style={{backgroundColor: '#654EA3'}}
            tintColor={'white'}
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }

      >
        {listItems}
      </ScrollView>
    );
  }

  render() {
    if (!this.props.yakdoks.length) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              style={{backgroundColor: '#654EA3'}}
              tintColor={'white'}
              refreshing={this.state.refreshing}
              onRefresh={()=>{}}
            />
          }
          contentContainerStyle={styles.emptyContainer}
        >
          <Text style={{color: 'white', fontSize: 20}}>
            약똑이 존재하지 않습니다.
          </Text>
        </ScrollView>
      );
    } else {
      return this.renderYakdoks(this.props.yakdoks)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#654EA3',
    paddingVertical: 50,
    alignItems: 'center'
  },
  emptyContainer: {
    flex:1,
    backgroundColor: '#654EA3',
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItem: {
    width: '80%',
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 7,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  }
});

const mapStateToProps = ({auth,todo}, ownProps) => {
  const { email } = auth;
  const { todos, yakdoks } = todo;
  return { email, todos, yakdoks };
};

const ConnectedCheckScreen = connect(mapStateToProps, actions)(CheckScreen);
export { ConnectedCheckScreen };
