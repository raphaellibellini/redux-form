// Verifica se campo obrigatório foi preenchido
export const campoObrigatorio = (value) => (!value && value !== 0 ? 'O campo não está preenchido' : false);


// Verfica se CNPJ é válido
export const validaCnpj = (cnpj) => {
    if (cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');
        if (cnpj.length !== 14) return false;
        if (/^(\d)\1+$/.test(cnpj)) return false;

        let t = cnpj.length - 2,
            d = cnpj.substring(t),
            d1 = parseInt(d.charAt(0)),
            d2 = parseInt(d.charAt(1)),
            calc = (x) => {
                let n = cnpj.substring(0, x),
                    y = x - 7,
                    s = 0,
                    r = 0;

                for (let i = x; i >= 1; i--) {
                    s += n.charAt(x - i) * y--;
                    if (y < 2) y = 9;
                }

                r = 11 - (s % 11);
                return r > 9 ? 0 : r;
            };

        return calc(t) === d1 && calc(t + 1) === d2;
    } else {
        return cnpj;
    }
};

export const CNPJ = (value) =>
    (!validaCnpj(value) ? 'Número de CNPJ inválido' : false);


// Verifica o máximo de 17 caracteres
const maxLength = (param) => (value) =>
    value && value.toString().length > param ? `O campo deve ter no máximo ${param} caracteres.` : false;

export const maxLength17 = maxLength(17);


// Verifica o mínimo de 16 caracteres
const minLength = (param) => (value) =>
    value && value.toString().length < param ? `O campo deve ter no mínimo ${param} caracteres.` : false;

export const minLength16 = minLength(16);

// Validar E-mail
export const validaEmail = (email) => {
    const usuario = email.substring(0, email.indexOf("@"));
    const dominio = email.substring(email.indexOf("@") + 1, email.length);

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") === -1) &&
        (dominio.search("@") === -1) &&
        (usuario.search(" ") === -1) &&
        (dominio.search(" ") === -1) &&
        (dominio.search(".") !== -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        return true;
    }
    else {
        return false;
    }
}

export const email = value => (!validaEmail(value) ? 'E-mail inválido' : false);