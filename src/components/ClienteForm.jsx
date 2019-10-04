import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, getFormValues, reduxForm, SubmissionError } from 'redux-form';
import { populateFieldActions } from '../redux/populateField/actions';
import { errors } from '../utils/errors';
import { submitActions } from '../redux/submitForm/actions';

class ClienteForm extends Component {
    componentDidMount() {
        this.populateFields();
    }

    populateFields = () => {
        this.props.findAllTiposSeguros();
        this.props.findAllTiposCapitais();
    }

    render() {
        const { error, invalid, handleSubmit, populateFieldReducer } = this.props;

        return (
            <form onSubmit={handleSubmit(this.props.submitForm)}>
                <div>
                    <label>Tipos de Seguros</label>
                    <div>
                        <Field
                            name="tiposSeguros"
                            component="select"
                        >
                            <option />
                            {populateFieldReducer.tiposSeguros.data.map(seg => {
                                return (
                                    <option key={seg.id} value={seg.value}>{seg.text}</option>
                                )
                            })}
                        </Field>
                    </div>
                </div>
                <div>
                    <label>Tipos de Capitais</label>
                    <div>
                        <Field
                            name="tiposCapitais"
                            component="select"
                        >
                            <option />
                            {populateFieldReducer.tiposCapitais.data.map(cap => {
                                return (
                                    <option key={cap.id} value={cap.value}>{cap.text}</option>
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
                            component="input"
                            placeholder="00.000.000/0000-00"
                        />
                    </div>
                </div>
                <div>
                    <label>Razão Social</label>
                    <div>
                        <Field
                            name="razaoSocial"
                            component="input"
                            placeholder="Nome da Empresa"
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
            </form>
        )
    }
}

const mapStateToProps = state => ({
    populateFieldReducer: state.populateFieldReducer
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...populateFieldActions, ...submitActions }, dispatch);

ClienteForm = reduxForm({
    form: 'clienteForm'
})(ClienteForm);

export default connect(mapStateToProps, mapDispatchToProps)(ClienteForm);
