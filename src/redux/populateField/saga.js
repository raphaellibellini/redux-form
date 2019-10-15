import { put, takeLatest } from 'redux-saga/effects';
import api from '../../utils/api';
import { populateFieldTypes } from './actions';
import { endpoints } from '../endpoints';
import { errors } from '../../utils/errors';

export function* populateFieldActionWatcher() {
    yield takeLatest(populateFieldTypes.FIND_ALL_TIPOS_SEGUROS, findAllTiposSegurosAsync);
    yield takeLatest(populateFieldTypes.FIND_ALL_TIPOS_CAPITAIS, findAllTiposCapitaisAsync);
    yield takeLatest(populateFieldTypes.FIND_AGENCIA_NAME, findAgenciaNameAsync);
}

function* findAgenciaNameAsync(action) {
    try {
        const { bancoId, agenciaId } = action;
        const resp = yield api.get(endpoints.AGENCIA(bancoId, agenciaId));
        const agenciaResp = resp.data.resultado;
        const isEmpty = !resp;

        yield put({
            type: populateFieldTypes.FIND_AGENCIA_NAME_SUCCESS,
            payload: agenciaResp,
            isEmpty: isEmpty
        })
    } catch (error) {
        yield put({
            type: populateFieldTypes.FIND_AGENCIA_NAME_FAIL,
            payload: errors.AGENCIA.FETCH
        })
    }
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

function* findAllTiposCapitaisAsync() {
    try {
        const resp = yield api.get(endpoints.TIPOS_CAPITAIS);
        let tiposCapitais = resp.data.resultado;
        const isEmpty = checkForEmpty(tiposCapitais);
        tiposCapitais = formatToOptions(tiposCapitais);

        yield put({
            type: populateFieldTypes.FIND_ALL_TIPOS_CAPITAIS_SUCCESS,
            payload: tiposCapitais,
            isEmpty
        });
    } catch (error) {
        yield put({
            type: populateFieldTypes.FIND_ALL_TIPOS_CAPITAIS_FAILURE,
            payload: errors.TIPOS_SEGUROS.FETCH
        })
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
        valor = valor.map((obj) => {
            return {
                key: obj.id,
                value: obj.id,
                text: obj.nome
            };
        });
        valor.unshift({ key: 0, value: false, text: "Selecionar" })
    }
    return valor;
}