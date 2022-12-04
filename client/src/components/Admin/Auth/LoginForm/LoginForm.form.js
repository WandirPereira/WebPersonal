import * as Yup from "yup";

export function initialValues() {
    return {
        email: "",
        password: "",
    };
}


export function validationSchema() {
    return Yup.object({
        email: Yup.string()
        .email("E-mail inválido!")
        .required("Campo obrigatório!"),
        password: Yup.string().required("Campo obrigatório!"),
    });
}