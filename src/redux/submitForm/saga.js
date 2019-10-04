import { submitFormTypes } from "./actions";
import { endpoints } from "../endpoints";
import api from '../../utils/api';
import { put, takeLatest } from 'redux-saga/effects';
import { errors } from '../../utils/errors';

export function* submitFormActionWatcher() {
    yield takeLatest(submitFormTypes.SUBMIT_FORM, submitFormAsync)
}

export function* submitFormAsync(action) {
    try {
        const body = action.payload;
        const resp = yield api.post(endpoints.POST_URL, body);
        const formResp = resp.data.resultado;

        yield put({
            type: submitFormTypes.SUBMIT_FORM_SUCCESS,
            payload: formResp
        })
    } catch (error) {
        yield put({
            type: submitFormTypes.SUBMIT_FORM_FAILURE,
            payload: errors.SUBMIT_FORM_ERROR
        })
    }
}