import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './modules';
import rootSaga from '../sagas/saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducers,
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(...[sagaMiddleware]),
});

sagaMiddleware.run(rootSaga);

export default store;
