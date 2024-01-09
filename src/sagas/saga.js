import { all, fork } from 'redux-saga/effects';

import rootCounterSaga from './asynchronous/counterSaga';

const rootSagas = [
  rootCounterSaga,
];

export default function* rootSaga() {
  yield all(rootSagas.map(saga => fork(saga)));
}
