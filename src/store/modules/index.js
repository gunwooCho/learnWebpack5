import { combineReducers } from 'redux';
import { counterSlice } from './counterModule';

const modules = {
  counter: counterSlice.reducer,
};

export default combineReducers(modules);
