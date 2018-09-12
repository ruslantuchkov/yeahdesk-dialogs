import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import io from 'socket.io-client';
import * as reducers from './reducers';
import { RECEIVE_MESSAGE } from './constants';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const reducer = combineReducers(reducers);

const store = createStore(reducer, enhancer);

const socket = io('http://localhost:5000');

socket.on('NEW_MESSAGE', payload => {
  payload.activeDialog = store.getState().activeDialog;
  store.dispatch({ type: RECEIVE_MESSAGE, payload });
});

export default store;
