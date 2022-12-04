import * as Yup from "yup";

export function initialValues(menu){
    return {
        title: menu?.title || "",
        path: menu?.path || "",
        protocol: "https://",
        active: menu?.active || true,
        order: menu?.order || undefined,
    };
}


export function validationSchema(){
    return Yup.object({
        title: Yup.string().required('Informe o título!'),
        path: Yup.string().required('Informe o path!'),
        order: Yup.number().required("Informe a ordem!"),
    });
}

