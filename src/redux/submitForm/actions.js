export const submitTypes = {
    SUBMIT_FORM: 'SUBMIT_FORM'
}

export const submitActions = {
    submitForm: (formData) => ({
        type: submitTypes.SUBMIT_FORM,
        payload: formData
    })
}