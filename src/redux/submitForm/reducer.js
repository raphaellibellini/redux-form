import { submitFormTypes } from './actions';

const common = {
    loading: false,
    success: false,
    isEmpty: false,
    error: null
};

const initialState = {
    data: {},
    ...common
}

const submitBaseState = {
    loading: true,
    success: false,
    error: null
};
const successBaseState = {
    loading: false,
    success: true,
    error: null
};
const failBaseState = {
    loading: false,
    success: false
};

const submitFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case submitFormTypes.SUBMIT_FORM:
            return {
                ...state,
                ...submitBaseState
            }
        case submitFormTypes.SUBMIT_FORM_SUCCESS:
            return {
                ...state,
                ...successBaseState,
                data: action.payload
            }
        case submitFormTypes.SUBMIT_FORM_FAILURE:
            return {
                ...state,
                ...failBaseState,
                error: action.payload
            }
        default:
            return state;
    }
}

export default submitFormReducer;

