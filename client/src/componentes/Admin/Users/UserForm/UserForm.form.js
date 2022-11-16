import * as Yup from "yup";

export function initialValues(user){
    return {
        avatar: user?.avatar || "",
        fileAvatar: null,
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        email: user?.email || "",
        role: user?.role || "",
        password: "",
    };
}


export function validationSchema(user){
    return Yup.object({
        firstname: Yup.string().required('Informe o nome!'),
        lastname: Yup.string().required('Informe o sobrenome!'),
        email: Yup.string().email(true).required("Informe o e-mail!"),
        role: Yup.string().required('Selecione o perfil!'),
        password: user ? Yup.string() : Yup.string().required('Informe a senha!'),
    });
}

