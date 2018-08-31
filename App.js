import React from 'react';
import MainStack from './src/screens/Navigation';
import { Provider } from 'react-redux';
import store from './src/stores';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainStack/>
      </Provider>
    );
  }
}
