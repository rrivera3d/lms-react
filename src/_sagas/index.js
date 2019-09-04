import { fork, all } from 'redux-saga/effects';
import ApplicationSaga from './application';

export default function* rootSaga() {
  yield all([
    fork(ApplicationSaga),
  ]);
}