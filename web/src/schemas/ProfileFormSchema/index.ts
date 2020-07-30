import * as yup from 'yup';

const ProfileFormSchema = yup.object().shape({
    name: yup.string()
        .max(50, "Máximo de caracteres é 50")
        .required("Nome é obrigatório"),
    surname: yup.string()
        .max(150, "Máximo de caracteres é 150")
        .required("Sobrenome é obrigatório"),
    email: yup.string()
        .email("E-mail inválido")
        .max(64, "Máximo de caracteres é 64")
        .required("E-mail é obrigatório"),
    cep: yup.string()
        .when(["uf", "localidade", "bairro", "logradouro", "num", "complemento", "referencia"], {
            is: (
                uf, 
                localidade, 
                bairro, 
                logradouro, 
                num,
                complemento,
                referencia
            ) => (uf && uf.length > 0)                  || 
                (localidade && localidade.length > 0)   || 
                (bairro && bairro.length > 0)           || 
                (logradouro && logradouro.length > 0)   ||
                (num && num.length > 0)                 || 
                (complemento && complemento.length > 0) || 
                (referencia && referencia.length > 0),
            then: yup.string()
                .length(8, "CEP deve conter 8 digitos")
                .required("CEP é obrigatório"),
            otherwise: yup.string()
                .length(8, "CEP deve conter 8 digitos")
                .notRequired()
        }),
    uf: yup.string()
        .when(["localidade", "bairro", "logradouro", "num", "complemento", "referencia"], {
            is: (
                localidade, 
                bairro, 
                logradouro, 
                num, 
                complemento,
                referencia
            ) => (localidade && localidade.length > 0)  || 
                (bairro && bairro.length > 0)           || 
                (logradouro && logradouro.length > 0)   ||
                (num && num.length > 0)                 || 
                (complemento && complemento.length > 0) ||
                (referencia && referencia.length > 0),
            then: yup.string()
                .length(2, "UF deve conter 2 digitos (sigla)")
                .required("UF é obrigatório"),
            otherwise: yup.string()
                .length(2, "UF deve conter 2 digitos (sigla)")
                .notRequired()
        }),
    localidade: yup.string()
        .when(["bairro", "logradouro", "num", "complemento", "referencia"], {
            is: (
                    bairro, 
                    logradouro, 
                    num, 
                    complemento,
                    referencia
                ) => (bairro && bairro.length > 0)          || 
                    (logradouro && logradouro.length > 0)   ||
                    (num && num.length > 0)                 || 
                    (complemento && complemento.length > 0) ||
                    (referencia && referencia.length > 0),
            then: yup.string()
                .max(100, "Máximo de caracteres é 100")
                .required("Cidade é obrigatória"),
            otherwise: yup.string()
                .max(100, "Máximo de caracteres é 100")
                .notRequired()
        }),
    bairro: yup.string()
        .when(["logradouro", "num", "complemento", "referencia"], {
            is: (
                logradouro, 
                num, 
                complemento,
                referencia
            ) => (logradouro && logradouro.length > 0)  ||
                (num && num.length > 0)                 || 
                (complemento && complemento.length > 0) ||
                (referencia && referencia.length > 0),
            then: yup.string()
                .max(100, "Máximo de caracteres é 100")
                .required("Bairro/Região Administrativa é obrigatório"),
            otherwise: yup.string()
                .max(100, "Máximo de caracteres é 100")
                .notRequired()
        }),
    logradouro: yup.string()
        .when(["num", "complemento", "referencia"], {
            is: (
                num, 
                complemento,
                referencia
            ) => (num && num.length > 0) || 
                (complemento && complemento.length > 0) ||
                (referencia && referencia.length > 0),
            then: yup.string()
                .max(100, "Máximo de caracteres é 100")
                .required("Logradouro é obrigatório"),
            otherwise: yup.string()
                .max(100, "Máximo de caracteres é 100")
                .notRequired()
        }),
    num: yup.string()
        .when(["complemento", "referencia"], {
            is: (
                complemento, 
                referencia
            ) => (complemento && complemento.length > 0) || 
                (referencia && referencia.length > 0),
            then: yup.string()
                .max(10, "Máximo de caracteres é 10")
                .required("Número é obrigatório"),
            otherwise: yup.string()
                .max(10, "Máximo de caracteres é 10")
                .notRequired()
        }),
    complemento: yup.string().notRequired(),
    referencia: yup.string().notRequired(),
    whatsapp: yup.string().notRequired(),
    password: yup.string()
        .when("newpassword", {
            is: newpassword => newpassword && newpassword.length > 0,
            then: yup.string().min(6, "A senha deve conter no mínimo 6 digitos").required("Senha é obrigatória"),
            otherwise: yup.string().notRequired()
        }),
    newpassword: yup.string()
        .when("password", {
            is: password => password && password.length > 0,
            then: yup.string().min(6, "A senha deve conter no mínimo 6 digitos").required("Nova senha é obrigatória"),
            otherwise: yup.string().notRequired()
        }),
}, [['password', 'newpassword']]);

export default ProfileFormSchema;