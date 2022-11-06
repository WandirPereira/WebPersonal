import * as Yup from "yup";

export function initialValues(){
    return {
        email: "",
        password: "",
        repeatPassword: "",
        conditionsAccepted: false,
    };
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string()
            .email("E-mail inválido!")
            .required("Campo pbrigatório!"),
        password: Yup.string().required("Campo obrigatório"),
        repeatPassword: Yup.string().required("Campo obrigatório").oneOf([Yup.ref("password")],"As senhas devem ser iguais!"),
        conditionsAccepted: Yup.bool().isTrue(true),
    });
}