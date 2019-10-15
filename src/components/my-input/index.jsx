import React from 'react';
import { Select, Form, Popup, Icon } from "semantic-ui-react";
import If from '../../components/If/index';

const MyInput = (props) => {
    const touched = props.meta.touched;
    const error = props.meta.error;
    // const warningMessage = props.warningMessage;

    const handleOnChangeSelect = (_, { value }) => {
        const input = props.input;
        input.onChange(value)
    }

    const inputToRender = () => {
        const { name, label, placeholder, type, options, loading, disabled, readOnly } = props
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
                disabled={disabled}
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
                    disabled={disabled}
                    readOnly={readOnly}
                />
            )
        }
    }
    return (
        <div className='field'>
            <div className='input-header'>
                <label>{props.label}</label>
                <If condition={props.input.name === 'numAgencia'}>
                    <Popup
                        content={`Ao preencher o número da agência irá autopreencher o nome da agência`}
                        trigger={
                            <Icon name='info circle' color='yellow' size='large' className='icon' />
                        }
                    />
                </If>
            </div>
            {inputToRender()}
            <div className='error-msg'>{touched && (error || props.fetchError)}</div>
            {/*<div>{touched && !error && warningMessage}</div>*/}
        </div>
    )
}

export default MyInput;