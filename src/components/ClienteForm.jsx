import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, getFormValues, reduxForm, SubmissionError } from 'redux-form';
import { populateFieldActions } from '../redux/populateField/actions';
import { errors } from '../utils/errors';
import { submitActions, submitFormActions } from '../redux/submitForm/actions';
import { Form, Select } from 'semantic-ui-react';
import * as validation from '../utils/validation';
import * as normalize from '../utils/normalize';
import MyInput from './my-input';

class ClienteForm extends Component {
    componentDidMount() {
        this.populateFields();
    }

    componentDidUpdate(prevProps) {
        // console.log("Estado Anterior submit Form", prevProps.submitFormReducer);
        // console.log("Estado Submit Form", this.props.submitFormReducer);
    }

    populateFields = () => {
        this.props.findAllTiposSeguros();
        this.props.findAllTiposCapitais();
    }

    render() {
        const { error, invalid, handleSubmit, populateFieldReducer } = this.props;

        return (
            <Form onSubmit={handleSubmit(this.props.submitForm)}>
                <div>
                    <label>Tipos de Seguros</label>
                    <div>
                        <Field
                            name="tipoSeguroId"
                            component='select'
                        //loading={populateFieldReducer.tiposSeguros.loading}
                        //options={populateFieldReducer.tiposSeguros.data}
                        >
                            <option />
                            {populateFieldReducer.tiposSeguros.data.map((seg, index) => {
                                return (
                                    <option key={index} value={seg.value}>{seg.text}</option>
                                )
                            })}
                        </Field>
                    </div>
                </div>
                <div>
                    <label>Tipos de Capitais</label>
                    <div>
                        <Field
                            name="tipoCapitalId"
                            component="select"
                        >
                            <option />
                            {populateFieldReducer.tiposCapitais.data.map((cap, index) => {
                                return (
                                    <option key={index} value={cap.value}>{cap.text}</option>
                                )
                            })}
                        </Field>
                    </div>
                </div>
                <div>
                    <div>
                        <Field
                            name="cnpj"
                            label="CNPJ"
                            component={MyInput}
                            placeholder="00.000.000/0000-00"
                            //warningMessage={"Mensagem de Aviso!"}
                            normalize={normalize.CNPJ}
                            validate={[validation.CNPJ, validation.campoObrigatorio]}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <Field
                            name="razaoSocial"
                            label="Razão Social"
                            component={MyInput}
                            placeholder="Nome da Empresa"
                            validate={[validation.campoObrigatorio, validation.maxLength17]}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <Field
                            name="email"
                            label='E-mail'
                            component={MyInput}
                            type="email"
                            placeholder="Email"
                            validate={[validation.campoObrigatorio, validation.minLength16, validation.email]}
                        />
                    </div>
                </div>
                <button type='submit'></button>
            </Form>
        )
    }
}

const mapStateToProps = state => ({
    populateFieldReducer: state.populateFieldReducer,
    submitFormReducer: state.submitFormReducer,
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...populateFieldActions, ...submitFormActions }, dispatch);

ClienteForm = reduxForm({
    form: 'clienteForm'
})(ClienteForm);

export default connect(mapStateToProps, mapDispatchToProps)(ClienteForm);
