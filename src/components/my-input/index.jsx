import React from 'react';
import { Select, Form } from "semantic-ui-react";

const MyInput = (props) => {
    const touched = props.meta.touched;
    const error = props.meta.error;
    // const warningMessage = props.warningMessage;


    const handleOnChangeSelect = (_, { value }) => {
        const input = props.input;
        input.onChange(value)
    }

    const inputToRender = () => {
        const { name, label, placeholder, type, options, loading } = props
        if (props.type === 'select') {
            // no 'Select' é necessario usar o 'onChange'
            return <Select
                name={name}
                label={label}
                placeholder={placeholder}
                type={type}
                options={options}
                loading={loading}
                error={touched && error ? true : false}
                onChange={handleOnChangeSelect}
                className='select-field'
            />
        } else {
            return (
                <Form.Input
                    name={name}
                    label={null}
                    placeholder={placeholder}
                    {...props.input}
                    loading={loading}
                    error={touched && error ? true : false}
                    className='input-field'
                />
            )
        }
    }
    return (
        <div className='field'>
            <label>{props.label}</label>
            {inputToRender()}
            <div className='error-msg'>{touched && (error || props.fetchError)}</div>
            {/*<div>{touched && !error && warningMessage}</div>*/}
        </div>
    )
}

export default MyInput;