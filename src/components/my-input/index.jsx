import React from 'react';
import { Select, Input, Form } from "semantic-ui-react"

const MyInput = (props) => {
    const touched = props.meta.touched;
    const error = props.meta.error;
    const warningMessage = props.warningMessage;


    const inputToRender = () => {
        if (props.type === 'select') {
            return <Select {...props} />
        } else {
            console.log("Propriedades Input", props)
            return (
                <Form.Input fluid {...props} error={touched && error ? true : false} />
            )

        }
    }
    return (
        <>
            {inputToRender()}
            <div>{touched && error}</div>
            <div>{touched && !error && warningMessage}</div>
        </>
    )

}

export default MyInput;