import { all, fork } from 'redux-saga/effects';

const rootSagas = [];

export default function* rootSaga() {
  yield all(rootSagas.map(saga => fork(saga)));
}
