import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import submitFormReducer from './submitForm/reducer';

const reducers = combineReducers({
    populateFieldReducer,
    submitFormReducer,
    form: formReducer
})

export default reducers;