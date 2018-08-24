import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Login from './Login';
import Conversation from './Conversation';
import User from './User';
import Chat from './Chat';

const UserStack = createStackNavigator({
  Login: {
    screen: User
  },
  chat: {
    screen: Chat
  }
}, {
  navigationOptions: {
    title: 'User'
  }
});

const ConversationStack = createStackNavigator({
  conversation: {
    screen: Conversation
  },
  chat: {
    screen: Chat
  }
}, {
  navigationOptions: {
    title: 'Conversation'
  }
});

const Tabs = createBottomTabNavigator({
  Conversation: {
    screen: ConversationStack,
    navigationOptions: {
      tabBarLabel: 'Conversation',
      tabBarIcon: ({tintColor}) =>( <Icon name='chat' type='material_community' color={tintColor} />)
    }
  },
  User: {
    screen: UserStack,
    navigationOptions: {
      tabBarLabel: 'User',
      tabBarIcon: ({tintColor}) =>( <Icon name='person-outline' type='material_community' color={tintColor} />)
    }
  }
}, {
  labeled: true,
  initialRouteName: 'Conversation',
});

const MainStack = createStackNavigator({
  Login: {
    screen: Login
  },
  Tabs: {
    screen: Tabs
  }
}, {
  initialRouteName: 'Login',
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