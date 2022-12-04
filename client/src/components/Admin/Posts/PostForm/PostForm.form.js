import * as Yup from "yup";

export function initialValues(post){
    return {
        miniature: post?.miniature || "",
        file: null,
        title: post?.title || "",
        path: post?.path || "",
        content: post?.content || "",
    };
}

export function validationSchema(){
    return Yup.object({
        title: Yup.string().required('Informe o título!'),
        content: Yup.string().required(true),
        path: Yup.string().required(true),
        miniature: Yup.string().required(true),
    });
}
