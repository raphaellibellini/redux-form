import React from 'react';
import { Select, Input, Form, Grid } from "semantic-ui-react";

const MyInput = (props) => {
    const touched = props.meta.touched;
    const error = props.meta.error;
    const warningMessage = props.warningMessage;


    const handleOnChangeSelect = (_, { value }) => {
        const input = props.input;
        input.onChange(value)
    }

    const inputToRender = () => {
        console.log(props);
        console.log(props.placeholder)
        if (props.type === 'select') {
            // no 'Select' é necessario usar o 'onChange'
            return <Select {...props} error={touched && error ? true : false} onChange={handleOnChangeSelect} className='select-field' />
        } else {
            return (
                <Form.Input fluid {...props.input} error={touched && error ? true : false} label={null} placeholder={props.placeholder} className='input-field' />
            )
        }
    }
    return (
        <div className='field'>
            <label>{props.label}</label>
            {inputToRender()}
            <div className='error-msg'>{touched && error}</div>
            {/*<div>{touched && !error && warningMessage}</div>*/}
        </div>
    )
}

export default MyInput;