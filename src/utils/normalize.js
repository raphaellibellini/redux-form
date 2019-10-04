import * as vanillaMasker from '../assets/vanilla-min';

export const onlyNumString = (value) => {
    return value ? value.toString().replace(/[^0-9]/g, '') : null;
};

export const CNPJ = (value) => {
    const cnpjPattern = '99.999.999/9999-99';
    const numOnly = onlyNumString(value);
    return value ? vanillaMasker.toPattern(numOnly, cnpjPattern) : value;
}; s