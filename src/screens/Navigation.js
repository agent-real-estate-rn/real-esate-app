import React, { Component } from 'react';
import {View} from 'react-native';
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
      tabBarIcon: ({tintColor, focused}) =>
        (<View style={[{borderTopWidth: 4, flex: 1, justifyContent: 'flex-start', width: '100%'},(focused) ? {borderTopColor: tintColor} : {borderTopColor:'transparent'}]}>
          <Icon
            name='search'
            type='material_community'
            color={tintColor}
            iconStyle={{fontSize: 30, justifyContent: 'center'}}
            containerStyle={{alignItems: 'center'}}
          />
        </View>)
    }
  },
  SubscriptionStack: {
    screen: SubscriptionStack,
    navigationOptions: {
      tabBarLabel: 'Subscriptions',
      tabBarIcon: ({tintColor, focused}) =>
        (<View style={[{borderTopWidth: 4, flex: 1, justifyContent: 'flex-start', width: '100%'},(focused) ? {borderTopColor: tintColor} : {borderTopColor:'transparent'}]}>
          <Icon
            name='chat'
            type='material_community'
            color={tintColor}
            iconStyle={{fontSize: 30, justifyContent: 'center'}}
            containerStyle={{alignItems: 'center'}}
          />
        </View>)
      }
  }
}, {
  labeled: true,
  initialRouteName: 'SearchStack',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#223A5E',
    style: {
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderTopColor: 'transparent',
      shadowColor: 'rgba(0,0,0,.15)',
      shadowOffset: {
        width: 1,
        height: 2
      },
    shadowOpacity: 0.8,
    shadowRadius: 4
    },
    tabBarSelectedItemStyle: {
      borderBottomWidth: 2,
      borderBottomColor: 'red',
    },
  }
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
  initialRouteName: 'Tabs',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

export default MainStack;