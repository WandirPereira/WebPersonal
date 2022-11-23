import * as Yup from "yup";

export function initialValues(post){
    return {
        miniature: post?.miniature || "",
        //file: null,
        title: post?.title || "",
        path: post?.path || "",
    };
}

export function validationSchema(){
    return Yup.object({
        title: Yup.string().required('Informe o título!'),
        // description: Yup.string().required('Informe o descrição!'),
        // price: Yup.number().required("Informe o preço!"),
        // score: Yup.number().min(1.0, true).max(5.0, true).required('Selecione a avaliação!'),
        path: Yup.string().required(true),
        miniature: Yup.string().required(true),
    });
}
