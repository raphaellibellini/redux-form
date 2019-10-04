import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, getFormValues, reduxForm, SubmissionError } from 'redux-form';
import { populateFieldActions } from '../redux/populateField/actions';
import { errors } from '../utils/errors';
import { submitActions, submitFormActions } from '../redux/submitForm/actions';
import { Form, Select } from 'semantic-ui-react';
import * as validation from '../utils/validation';
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

    validacaoBoba = (value) => {
        return value === "mostra erro" ? "Deu erro aqui" : false;
    }

    normalizerLouco = (value) => {
        return value + "1";
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
                    <label>CNPJ</label>
                    <div>
                        <Field
                            name="cnpj"
                            component={MyInput}
                            warningMessage={"Mensagem de Aviso!"}
                            placeholder="00.000.000/0000-00"
                            normalize={this.normalizerLouco}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <Field
                            name="razaoSocial"
                            component={MyInput}
                            placeholder="Nome da Empresa"
                            warningMessage={"Mensagem de Aviso!"}
                            label="Razão Social"
                            validate={[validation.campoObrigatorio, this.validacaoBoba]}
                        />
                    </div>
                </div>
                <div>
                    <label>Email</label>
                    <div>
                        <Field
                            name="email"
                            component="input"
                            type="email"
                            placeholder="Email"
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
