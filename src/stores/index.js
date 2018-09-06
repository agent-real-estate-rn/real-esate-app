import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import login from './login';
import { combineReducers } from 'redux';
import searchOnMap from './searchmap';

const middleware = applyMiddleware(
  thunk,
  promiseMiddleware(),
  logger
);
const reducers = combineReducers({login, searchOnMap});
const store = createStore(reducers, middleware);
export default store;