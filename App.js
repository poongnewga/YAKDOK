import React from 'react';
import { Text, View, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { ConnectedWhenScreen, ConnectedTodoScreen, ConnectedCheckScreen, AllScreen, ConnectedAuthScreen, ConnectedAuthLoadingScreen, ConnectedYakdokInfo,
ConnectedMakeYakdok, ConnectedSelectDay, ConnectedInviteUser } from './screens';

// Redux Settings
import { Provider } from 'react-redux';
import store from './store';

const AuthStack = createStackNavigator({ SignIn: ConnectedAuthScreen });

const WhenStack = createStackNavigator({
  '언제': ConnectedWhenScreen,
  '어디': ConnectedTodoScreen
});

const CheckStack = createStackNavigator({
  '약속확인': ConnectedCheckScreen,
  '약똑정보': ConnectedYakdokInfo
});

const YakdokStack = createStackNavigator({
  '약속잡기': ConnectedMakeYakdok,
  '약똑정보': ConnectedYakdokInfo,
  '기간선택': ConnectedSelectDay,
  '초대하기': ConnectedInviteUser
  // '약속잡기': ConnectedSelectDay,
  // '기간선택': ConnectedMakeYakdok,
  // '약똑정보': ConnectedYakdokInfo,
});


const RootTab = createBottomTabNavigator(
  {
    '언제': { screen: WhenStack },
    '약똑잡기': { screen: YakdokStack },
    '약속확인': { screen: CheckStack },
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
        } else if (routeName === '약똑잡기') {
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
