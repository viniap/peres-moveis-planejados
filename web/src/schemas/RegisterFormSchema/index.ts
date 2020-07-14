import * as yup from 'yup';

const RegisterFormSchema = yup.object().shape({
    name: yup.string().max(50, "Máximo de caracteres é 50").required("Nome é obrigatório"),
    surname: yup.string().max(150, "Máximo de caracteres é 150").required("Sobrenome é obrigatório"),
    email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
    password: yup.string().required("Senha é obrigatória"),
});

export default RegisterFormSchema;