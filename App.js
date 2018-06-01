import React from 'react';
import { Text, View, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { ConnectedWhenScreen, WhereScreen, CheckScreen, AllScreen, ConnectedAuthScreen, ConnectedAuthLoadingScreen } from './screens';

// Redux Settings
import { Provider } from 'react-redux';
import store from './store';

const AuthStack = createStackNavigator({ SignIn: ConnectedAuthScreen });

const WhenStack = createStackNavigator({
  '언제': ConnectedWhenScreen,
  '어디': WhereScreen
});


const RootTab = createBottomTabNavigator(
  {
    '언제': { screen: WhenStack },
    '어디서': { screen: WhereScreen },
    '약속확인': { screen: CheckScreen },
    '전체': { screen: AllScreen }
  },
  {
    initialRouteName: '언제',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } =   navigation.state;
        let iconName;
        if (routeName === '언제') {
          iconName = `ios-create${focused ? '' : '-outline'}`;
        } else if (routeName === '어디서') {
          iconName = `ios-pin${focused ? '' : '-outline'}`;
        } else if (routeName === '약속확인') {
          iconName = `ios-calendar${focused ? '' : '-outline'}`;
        } else if (routeName === '전체') {
          iconName = `ios-menu${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={'#654EA3'} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#654EA3',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);

const SwitchNavigation = createSwitchNavigator(
  {
    AuthLoading: ConnectedAuthLoadingScreen,
    App: RootTab,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);


export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <SwitchNavigation />
      </Provider>
    );
  }
}
