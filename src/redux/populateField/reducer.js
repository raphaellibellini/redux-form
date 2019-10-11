import { populateFieldTypes } from './actions';
import AGENCIA_FIELDS from '../../utils/constants/agencia-fields';

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
    },
    tiposCapitais: {
        data: [],
        ...commons
    },
    agencia: {
        data: {
            // quando quiser acessar uma variavel tem que colocar entre []
            [AGENCIA_FIELDS.ID]: null,
            [AGENCIA_FIELDS.BANCO_ID]: null,
            [AGENCIA_FIELDS.AGENCIA_ID]: null,
            [AGENCIA_FIELDS.NOME_AGENCIA]: null
        },
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
        case populateFieldTypes.FIND_ALL_TIPOS_CAPITAIS:
            return {
                ...state,
                tiposCapitais: {
                    ...state.tiposCapitais,
                    ...submitBaseState
                }
            }
        case populateFieldTypes.FIND_ALL_TIPOS_CAPITAIS_SUCCESS:
            return {
                ...state,
                tiposCapitais: {
                    ...state.tiposCapitais,
                    ...successBaseState,
                    data: action.payload,
                    isEmpty: false || action.isEmpty
                }
            }
        case populateFieldTypes.FIND_ALL_TIPOS_CAPITAIS_FAILURE:
            return {
                ...state,
                tiposCapitais: {
                    ...state.tiposCapitais,
                    ...failBaseState,
                    error: action.payload
                }
            }
        case populateFieldTypes.FIND_AGENCIA_NAME:
            return {
                ...state,
                agencia: {
                    ...state.agencia,
                    ...submitBaseState
                }
            }
        case populateFieldTypes.FIND_AGENCIA_NAME_SUCCESS:
            return {
                ...state,
                agencia: {
                    ...state.agencia,
                    ...successBaseState,
                    data: action.payload,
                    isEmpty: false || action.isEmpty
                }
            }
        case populateFieldTypes.FIND_AGENCIA_NAME_FAIL:
            return {
                ...state,
                agencia: {
                    ...state.agencia,
                    ...failBaseState,
                    error: action.payload
                }
            }
        default:
            return state;
    }
}

export default populateFieldReducer;