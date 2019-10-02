import { populateFieldTypes } from './actions';

const commons = {
    loading: false,
    success: false,
    isEmpty: false,
    error: null
};

const initialState = {
    tiposSeguros: {
        data: [],
        ...commons
    }
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

const populateFieldReducer = (state = initialState, action) => {
    switch (action.type) {
        case populateFieldTypes.FIND_ALL_TIPOS_SEGUROS:
            return {
                ...state,
                tiposSeguros: {
                    ...state.tiposSeguros,
                    ...submitBaseState
                }
            };
        case populateFieldTypes.FIND_ALL_TIPOS_SEGUROS_SUCCESS:
            return {
                ...state,
                tiposSeguros: {
                    ...state.tiposSeguros,
                    ...successBaseState,
                    data: action.payload,
                    isEmpty: false || action.isEmpty
                }
            };
        case populateFieldTypes.FIND_ALL_TIPOS_SEGUROS_FAILURE:
            return {
                ...state,
                tiposSeguros: {
                    ...state.tiposSeguros,
                    ...failBaseState,
                    error: action.payload
                }
            }
        default:
            return {
                state
            }
    }
}

export default populateFieldReducer;