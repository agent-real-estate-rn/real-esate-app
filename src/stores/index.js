import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import login from './login';

const middleware = applyMiddleware(
  thunk,
  promiseMiddleware(),
  logger
);
// const reducers = combineReducers({connection, users});
//const store = createStore(reducers, middleware); use these lines later
const store = createStore(login, middleware);
export default store;