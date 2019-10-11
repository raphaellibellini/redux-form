export const populateFieldTypes = {
    FIND_ALL_TIPOS_SEGUROS: 'FIND_ALL_TIPOS_SEGUROS',
    FIND_ALL_TIPOS_SEGUROS_SUCCESS: 'FIND_ALL_TIPOS_SEGUROS_SUCCESS',
    FIND_ALL_TIPOS_SEGUROS_FAILURE: 'FIND_ALL_TIPOS_SEGUROS_FAILURE',
    FIND_ALL_TIPOS_CAPITAIS: 'FIND_ALL_TIPOS_CAPITAIS',
    FIND_ALL_TIPOS_CAPITAIS_SUCCESS: 'FIND_ALL_TIPOS_CAPITAIS_SUCCESS',
    FIND_ALL_TIPOS_CAPITAIS_FAILURE: 'FIND_ALL_TIPOS_CAPITAIS_FAILURE',
    FIND_AGENCIA_NAME: 'FIND_AGENCIA_NAME',
    FIND_AGENCIA_NAME_SUCCESS: 'FIND_AGENCIA_NAME_SUCCESS',
    FIND_AGENCIA_NAME_FAIL: 'FIND_AGENCIA_NAME_FAIL',
}

export const populateFieldActions = {
    findAllTiposSeguros: () => ({
        type: populateFieldTypes.FIND_ALL_TIPOS_SEGUROS
    }),
    findAllTiposCapitais: () => ({
        type: populateFieldTypes.FIND_ALL_TIPOS_CAPITAIS
    }),
    findAgenciaName: (bancoId, agenciaId) => ({
        type: populateFieldTypes.FIND_AGENCIA_NAME,
        bancoId: bancoId,
        agenciaId: agenciaId
    })
}