import {
  all,
  call, delay, put, takeEvery,
} from 'redux-saga/effects';
import {
  decrement,
  decrementFailure,
  decrementSuccess,
  increment,
  incrementFailure,
  incrementSuccess,
} from '../../store/modules/counterModule';

function* incrementSaga() {
  try {
    yield call(increment);
    yield delay(1000);
    yield put({
      type: incrementSuccess,
    });
  } catch (err) {
    yield put({
      type: incrementFailure,
      error: err,
    });
  }
}

function* decrementSaga() {
  try {
    yield call(decrement);
    yield put({
      type: decrementSuccess,
    });
  } catch (err) {
    yield put({
      type: decrementFailure,
      error: err,
    });
  }
}

export default function* rootCounterSaga() {
  yield all([
    takeEvery(increment, incrementSaga),
    takeEvery(decrement, decrementSaga),
  ]);
}
