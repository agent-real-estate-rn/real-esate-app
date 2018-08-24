import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import user from './user';

const middleware = applyMiddleware(
  thunk,
  promiseMiddleware(),
  logger
);
// const reducers = combineReducers({connection, users});
//const store = createStore(reducers, middleware); use these lines later
const store = createStore(user, middleware);
export default store;