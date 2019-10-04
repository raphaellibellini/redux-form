import { all } from 'redux-saga/effects';
import { populateFieldActionWatcher } from './populateField/saga';
import { submitActionWatcher } from './submitForm/saga';

function* rootSaga() {
    yield all([
        populateFieldActionWatcher(),
        submitActionWatcher()
    ]);
}

export default rootSaga;