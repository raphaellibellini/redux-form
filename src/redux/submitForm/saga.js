import { submitTypes } from "./actions";
import { endpoints } from "../endpoints";
import api from '../../utils/api';
import { put, takeLatest } from 'redux-saga/effects';
import { errors } from '../../utils/errors';

export function* submitActionWatcher() {
    yield takeLatest(submitTypes.SUBMIT_FORM, submitFormAsync)
}

export function* submitFormAsync(action) {
    try {
        const body = action.payload;
        const resp = yield api.post(endpoints.POST_URL, body);
        console.log(resp);
        const formResp = resp.data.resultado;

        yield put({
            type: submitTypes.SUBMIT_FORM_SUCCESS,
            payload: formResp
        })
    } catch (error) {
        yield put({
            type: submitTypes.SUBMIT_FORM_FAILURE,
            payload: errors.SUBMIT_ERROR
        })
    }
}