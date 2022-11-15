import * as Yup from "yup";

export function initialValues(){
    return {
        avatar: "",
        fileAvatar: null,
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        password: "",
    };
}


export function validationSchema(){
    return Yup.object({
        firstname: Yup.string().required('Informe o nome!'),
        lastname: Yup.string().required('Informe o sobrenome!'),
        email: Yup.string().email(true).required("Informe o e-mail!"),
        role: Yup.string().required('Selecione o perfil!'),
        password: Yup.string().required('Informe a senha!'),
    });
}

