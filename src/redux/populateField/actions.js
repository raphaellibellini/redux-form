export const populateFieldTypes = {
    FIND_ALL_TIPOS_SEGUROS: 'FIND_ALL_TIPOS_SEGUROS',
    FIND_ALL_TIPOS_SEGUROS_SUCCESS: 'FIND_ALL_TIPOS_SEGUROS_SUCCESS',
    FIND_ALL_TIPOS_SEGUROS_FAILURE: 'FIND_ALL_TIPOS_SEGUROS_FAILURE'
}

export const populateFieldActions = {
    findAllTiposSeguros: () => ({
        type: populateFieldTypes.FIND_ALL_TIPOS_SEGUROS
    })
}