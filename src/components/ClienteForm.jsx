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
    }

    render() {
        const { error, invalid, handleSubmit, populateFieldReducer } = this.props;
        console.log('SEG', populateFieldReducer.tiposSeguros.data);

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
