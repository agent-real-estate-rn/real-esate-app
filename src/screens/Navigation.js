import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import LoginScreen from './Login';
import SignupScreen from './Signup';
import SubscriptionScreen from './SubscriptionScreen';
import PropertyDetailScreen from './PropertyDetailScreen';
import SearchScreen from './SearchScreen';


const SubscriptionStack = createStackNavigator({
  SubscriptionScreen: {
    screen: SubscriptionScreen
  },
  PropertyDetailScreen: {
    screen: PropertyDetailScreen
  }
}, {
  navigationOptions: {
    title: 'My Subscription'
  }
});

const SearchStack = createStackNavigator({
  SearchScreen: {
    screen: SearchScreen
  },
  PropertyDetailScreen: {
    screen: PropertyDetailScreen
  }
}, {
  navigationOptions: {
    title: 'Search'
  }
});

const Tabs = createBottomTabNavigator({
  SubscriptionStack: {
    screen: SubscriptionStack,
    navigationOptions: {
      tabBarLabel: 'Conversation',
      tabBarIcon: ({tintColor}) =>( <Icon name='chat' type='material_community' color={tintColor} />)
    }
  },
  SearchStack: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({tintColor}) =>( <Icon name='person-outline' type='material_community' color={tintColor} />)
    }
  }
}, {
  labeled: true,
  initialRouteName: 'SearchStack',
});

const MainStack = createSwitchNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
  SignupScreen: {
    screen: SignupScreen
  },
  Tabs: {
    screen: Tabs
  }
}, {
  initialRouteName: 'LoginScreen',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

export default class MainApp extends React.Component {
  render() {
    return(
      <MainStack/>
    )
  }
}