import * as yup from 'yup';

const LoginFormSchema = yup.object().shape({
    /*name: yup.string().max(50, "Máximo de caracteres é 50").required("Nome é obrigatório"),
    surname: yup.string().max(150, "Máximo de caracteres é 150").required("Sobrenome é obrigatório"),*/
    email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
    password: yup.string().required("Senha é obrigatória"),
});

export default LoginFormSchema;