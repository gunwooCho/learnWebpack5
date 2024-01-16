import { combineReducers } from 'redux';
import { counterSlice } from './counterModule';

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
