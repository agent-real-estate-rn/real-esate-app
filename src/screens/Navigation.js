import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import LoginScreen from './Login';
import SignupScreen from './Signup';
import SubscriptionScreen from './SubscriptionScreen';
import PropertyDetailScreen from './PropertyDetailScreen';
import SearchScreen from './SearchScreen';
import ListView from './ListView';
import SplashScreen from './SplashScreen';


const SubscriptionStack = createStackNavigator({
  SubscriptionScreen: {
    screen: SubscriptionScreen
  },
  ListView: {
    screen: ListView
  },
  PropertyDetailScreen: {
    screen: PropertyDetailScreen
  }
}, {
  navigationOptions: {
    title: 'My Subscriptions'
  }
});

const SearchStack = createStackNavigator({
  SearchScreen: {
    screen: SearchScreen
  },
  ListView: {
    screen: ListView
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
  SearchStack: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({tintColor}) =>( <Icon name='search' type='material_community' color={tintColor} />)
    }
  },
  SubscriptionStack: {
    screen: SubscriptionStack,
    navigationOptions: {
      tabBarLabel: 'Subscriptions',
      tabBarIcon: ({tintColor}) =>( <Icon name='chat' type='material_community' color={tintColor} />)
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
  SplashScreen: {
    screen: SplashScreen
  },
  SignupScreen: {
    screen: SignupScreen
  },
  Tabs: {
    screen: Tabs
  }
}, {
  initialRouteName: 'SplashScreen',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

export default MainStack;