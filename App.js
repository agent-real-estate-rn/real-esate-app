import React from 'react';
import MainApp from './src/screens/Navigation';
import { Provider } from 'react-redux';
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
