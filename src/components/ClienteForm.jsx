import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, getFormValues, reduxForm, SubmissionError } from 'redux-form';
import { populateFieldActions } from '../redux/populateField/actions';
import { errors } from '../utils/errors';

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
            <form>
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
            </form>
        )
    }
}

const mapStateToProps = state => ({
    populateFieldReducer: state.populateFieldReducer
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...populateFieldActions }, dispatch);

ClienteForm = reduxForm({
    form: 'clienteForm'
})(ClienteForm);

export default connect(mapStateToProps, mapDispatchToProps)(ClienteForm);
