export const submitFormTypes = {
    SUBMIT_FORM: 'SUBMIT_FORM',
    SUBMIT_FORM_SUCCESS: 'SUBMIT_FORM_SUCCESS',
    SUBMIT_FORM_FAILURE: 'SUBMIT_FORM_FAILURE'
}

export const submitFormActions = {
    submitForm: (formData) => ({
        type: submitFormTypes.SUBMIT_FORM,
        payload: formData
    })
}