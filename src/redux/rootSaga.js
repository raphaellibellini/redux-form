import { all } from 'redux-saga/effects';
import { populateFieldActionWatcher } from './populateField/saga';

function* rootSaga() {
    yield all([
        populateFieldActionWatcher()
    ]);
}

export default rootSaga;