const common = {
    EMPTY_FIELD_ERROR: 'Campo não preenchido',
    FETCH_ERROR: 'Erro ao buscar ',
    FIELD_ERROR: (field) => `nenhum dado ${field} foi recuperado, recarregue a página para tentar novamente`
};

export const errors = {
    EMPTY_FIELD_ERROR: common.EMPTY_FIELD_ERROR,
    EMPTY_FIELDS: 'Existem campos não preenchidos',
    TIPOS_SEGUROS: {
        FETCH: common.FETCH_ERROR + 'os Tipos de Seguro!',
        FIELD_ERROR: common.FIELD_ERROR('Tipo de Seguro')
    },
    SUBMIT_ERROR: 'Erro ao enviar formulário'
}