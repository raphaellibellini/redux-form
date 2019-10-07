import React from 'react';
import { Select, Input, Form } from "semantic-ui-react";
import If from '../if/index';

const MyInput = (props) => {
    const touched = props.meta.touched;
    const error = props.meta.error;
    const warningMessage = props.warningMessage;


    const handleOnChangeSelect = (_, { value }) => {
        const input = props.input;
        input.onChange(value)
    }

    const inputToRender = () => {
        if (props.type === 'select') {
            // no 'Select' é necessario usar o 'onChange'
            return <Select {...props} error={touched && error ? true : false} onChange={handleOnChangeSelect} />
        } else {
            return (
                <Form.Input fluid {...props.input} error={touched && error ? true : false} label={null} />
            )
        }
    }
    return (
        <>
            <label>{props.label}</label>
            {inputToRender()}
            <div>{touched && error}</div>
            <div>{touched && !error && warningMessage}</div>
        </>
    )
}

export default MyInput;