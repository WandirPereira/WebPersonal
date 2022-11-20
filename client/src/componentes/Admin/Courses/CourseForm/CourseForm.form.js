import * as Yup from "yup";

export function initialValues(course){
    return {
        miniature: course?.miniature || "",
        file: null,
        title: course?.title || "",
        description: course?.description || "",
        price: course?.price || undefined,
        score: course?.score || undefined,
        url: course?.url || "",
    };
}

export function validationSchema(){
    return Yup.object({
        title: Yup.string().required('Informe o título!'),
        description: Yup.string().required('Informe o descrição!'),
        price: Yup.number().required("Informe o preço!"),
        score: Yup.number().min(1.0, true).max(5.0, true).required('Selecione a avaliação!'),
        url: Yup.string().required(true),
        miniature: Yup.string().required(true),
    });
}

