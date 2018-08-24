import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainApp from './src/NavigationConfig';
import { Provider, connect } from 'react-redux';
import store from './src/stores';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainApp/>
      </Provider>
    );
  }
}
