import { all } from 'redux-saga/effects';
import { populateFieldActionWatcher } from './populateField/saga';
import { submitFormActionWatcher } from './submitForm/saga';

function* rootSaga() {
    yield all([
        populateFieldActionWatcher(),
        submitFormActionWatcher()
    ]);
}

export default rootSaga;