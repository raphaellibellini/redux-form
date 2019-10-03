import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const reducers = combineReducers({
    populateFieldReducer: require('./populateField/reducer').default,
    form: formReducer
})

export default reducers;