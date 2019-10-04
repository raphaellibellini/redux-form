export const submitTypes = {
    SUBMIT_FORM: 'SUBMIT_FORM',
    SUBMIT_FORM_SUCCESS: 'SUBMIT_FORM_SUCCESS',
    SUBMIT_FORM_FAILURE: 'SUBMIT_FORM_FAILURE'
}

export const submitActions = {
    submitForm: (formData) => ({
        type: submitTypes.SUBMIT_FORM,
        payload: formData
    })
}