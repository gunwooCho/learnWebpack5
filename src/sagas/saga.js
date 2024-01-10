import { all, fork } from 'redux-saga/effects';

import rootCounterSaga from './asynchronous/counterSaga';

export default function* rootSaga() {
  yield all([
    rootCounterSaga,
  ].map(saga => fork(saga)));
}
