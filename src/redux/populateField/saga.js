import { put, takeLatest } from 'redux-saga/effects';
import api from '../../utils/api';
import { populateFieldTypes } from './actions';
import { endpoints } from '../endpoints';
import { errors } from '../../utils/errors';

export function* populateFieldActionWatcher() {
    yield takeLatest(populateFieldTypes.FIND_ALL_TIPOS_SEGUROS, findAllTiposSegurosAsync);
}

function* findAllTiposSegurosAsync() {
    try {
        const resp = yield api.get(endpoints.TIPOS_SEGUROS);
        let tiposSeguros = resp.data.resultado;
        const isEmpty = checkForEmpty(tiposSeguros);
        tiposSeguros = formatToOptions(tiposSeguros);

        yield put({
            type: populateFieldTypes.FIND_ALL_TIPOS_SEGUROS_SUCCESS,
            payload: tiposSeguros,
            isEmpty: isEmpty
        });
    } catch (error) {
        yield put({
            type: populateFieldTypes.FIND_ALL_TIPOS_SEGUROS_FAILURE,
            payload: errors.TIPOS_SEGUROS.FETCH
        });
    }
}

function checkForEmpty(responseArr) {
    if (responseArr) {
        if (responseArr.length > 0) {
            return false;
        }
    }
    return true;
}

function formatToOptions(valor) {
    if (valor) {
        return valor.map((obj) => {
            return {
                key: obj.id,
                value: obj.id,
                text: obj.nome
            };
        });
    }
    return valor;
}