import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { populateFieldActions } from '../redux/populateField/actions';
import { submitFormActions } from '../redux/submitForm/actions';
import { Form, Button, Grid } from 'semantic-ui-react';
import * as validation from '../utils/validation';
import * as normalize from '../utils/normalize';
import MyInput from './my-input';
import AGENCIA_FIELDS from '../utils/constants/agencia-fields';
import DADOS_CLIENTE_FORM from '../utils/constants/form';

class ClienteForm extends Component {
    componentDidMount() {
        this.populateFields();
    }

    componentDidUpdate(prevProps) {
        this.checkIfAgenciaChanged(prevProps);
    }

    /**
     * @Summary Função responsável por verificar se a agencia mudou
     */
    checkIfAgenciaChanged = (prevProps) => {
        const prevAgencia = prevProps.populateFieldReducer.agencia.data;
        const prevAgenciaId = prevAgencia ? prevAgencia[AGENCIA_FIELDS.AGENCIA_ID] : null;
        const nowAgencia = this.props.populateFieldReducer.agencia.data;
        const nowAgenciaId = nowAgencia ? nowAgencia[AGENCIA_FIELDS.AGENCIA_ID] : null;
        if (this.props.populateFieldReducer.agencia.success && prevAgenciaId !== nowAgenciaId) {
            const agenciaNome = nowAgencia[AGENCIA_FIELDS.NOME_AGENCIA];
            /* Alterar o campo do Redux Form 
             * 1º parametro = nomeDoCampo
             * 2º parametro = valor
             */
            this.props.change('nomeAgencia', agenciaNome);
        } else if (this.props.populateFieldReducer.agencia.error) {
            this.props.change('nomeAgencia', '');
        }
    }

    populateFields = () => {
        this.props.findAllTiposSeguros();
        this.props.findAllTiposCapitais();
    };

    submitForm = (values) => {
        this.props.submitForm(values);
    };

    onChangeAgencia = (_, agenciaValor) => {
        const agenciaId = agenciaValor ? parseInt(agenciaValor) : null;
        if (agenciaId) {
            console.log('agId', agenciaId)
            this.props.findAgenciaName(1, agenciaId);
        } else {
            this.props.change('nomeAgencia', '');
        }
    };

    /**
     * @summary Função que implementa a ativação em sequência dos campos
     */
    checkIfFieldsAreFilled = (valores, fieldArr) => {
        const valArr = fieldArr.map((element) => {
            return valores === undefined ? false : valores[element] ? true : false;
        });
        return !valArr.includes(false);
    };

    render() {
        const { handleSubmit, populateFieldReducer, valores } = this.props;
        console.log(populateFieldReducer)
        console.log('AGID', populateFieldReducer.agencia.data[AGENCIA_FIELDS.ID])

        return (
            <Grid>
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column width={8} className='form'>
                    <Form onSubmit={handleSubmit(this.submitForm)}>
                        <div>
                            <Field
                                name="tipoSeguroId"
                                label="Tipos de Seguros"
                                placeholder="Selecionar"
                                type="select"
                                component={MyInput}
                                options={populateFieldReducer.tiposSeguros.data}
                                loading={populateFieldReducer.tiposSeguros.loading}
                                validate={validation.campoObrigatorio}
                            ></Field>
                        </div>
                        <div>
                            <Field
                                name="tipoCapitalId"
                                label="Tipos de Capitais"
                                placeholder="Selecionar"
                                type="select"
                                component={MyInput}
                                options={populateFieldReducer.tiposCapitais.data}
                                loading={populateFieldReducer.tiposCapitais.loading}
                                validate={validation.campoObrigatorio}
                                disabled={!this.checkIfFieldsAreFilled(valores, [
                                    DADOS_CLIENTE_FORM.TIPO_SEGURO
                                ])}
                            ></Field>
                        </div>
                        <div>
                            <Field
                                name="cnpj"
                                label="CNPJ"
                                component={MyInput}
                                placeholder="00.000.000/0000-00"
                                //warningMessage={"Mensagem de Aviso!"}
                                normalize={normalize.CNPJ}
                                validate={[validation.CNPJ, validation.campoObrigatorio]}
                                disabled={!this.checkIfFieldsAreFilled(valores, [
                                    DADOS_CLIENTE_FORM.TIPO_SEGURO,
                                    DADOS_CLIENTE_FORM.TIPO_CAPITAL
                                ])}
                            />
                        </div>
                        <div>
                            <Field
                                name="razaoSocial"
                                label="Razão Social"
                                component={MyInput}
                                placeholder="Nome da Empresa"
                                validate={[validation.campoObrigatorio, validation.maxLength17]}
                                disabled={!this.checkIfFieldsAreFilled(valores, [
                                    DADOS_CLIENTE_FORM.TIPO_SEGURO,
                                    DADOS_CLIENTE_FORM.TIPO_CAPITAL,
                                    DADOS_CLIENTE_FORM.CNPJ
                                ])}
                            />
                        </div>
                        <div>
                            <Field
                                name="email"
                                label='E-mail'
                                component={MyInput}
                                type="email"
                                placeholder="Email"
                                validate={[validation.campoObrigatorio, validation.minLength16, validation.email]}
                                disabled={!this.checkIfFieldsAreFilled(valores, [
                                    DADOS_CLIENTE_FORM.TIPO_SEGURO,
                                    DADOS_CLIENTE_FORM.TIPO_CAPITAL,
                                    DADOS_CLIENTE_FORM.CNPJ,
                                    DADOS_CLIENTE_FORM.RAZAO_SOCIAL
                                ])}
                            />
                        </div>
                        <div>
                            <Field
                                name="numAgencia"
                                label='Número da Agência'
                                component={MyInput}
                                placeholder="Número da agência"
                                normalize={normalize.onlyNumString}
                                validate={[validation.campoObrigatorio, validation.maxLength4]}
                                onChange={this.onChangeAgencia}
                                disabled={!this.checkIfFieldsAreFilled(valores, [
                                    DADOS_CLIENTE_FORM.TIPO_SEGURO,
                                    DADOS_CLIENTE_FORM.TIPO_CAPITAL,
                                    DADOS_CLIENTE_FORM.CNPJ,
                                    DADOS_CLIENTE_FORM.RAZAO_SOCIAL,
                                    DADOS_CLIENTE_FORM.EMAIL
                                ])}
                            />
                        </div>
                        <div>
                            <Field
                                name='nomeAgencia'
                                label='Nome da Agência'
                                component={MyInput}
                                loading={populateFieldReducer.agencia.loading}
                                fetchError={populateFieldReducer.agencia.error}
                                disabled={populateFieldReducer.agencia.data[AGENCIA_FIELDS.ID] === null}
                                readOnly={true}
                            />
                        </div>
                        <div className='button'>
                            <Button type='submit' color='green'>Submit</Button>
                        </div>
                    </Form>
                </Grid.Column>
                <Grid.Column width={4}></Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    populateFieldReducer: state.populateFieldReducer,
    submitFormReducer: state.submitFormReducer,
    valores: getFormValues('clienteForm')(state) // Pega todos os valores do formulario
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...populateFieldActions, ...submitFormActions }, dispatch);

ClienteForm = reduxForm({
    form: 'clienteForm',
    touchOnChange: true
})(ClienteForm);

export default connect(mapStateToProps, mapDispatchToProps)(ClienteForm);
