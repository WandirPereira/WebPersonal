import React, {useCallback} from 'react';
import { Form, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { Post } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
import { Editor } from "@tinymce/tinymce-react";
import { initialValues, validationSchema } from "./PostForm.form";
import "./PostForm.scss";


const postController = new Post();

export function PostForm(props) {
  
  const { close, onReload, post } = props;
  //console.log(props);
//console.log(onReload());
  //console.log(close);
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(post),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
        try {
            if(!post){
                await postController.createPost(accessToken, formValue);
            }else{
               await postController.updatePost(accessToken, post._id , formValue);
            }
            onReload();
            close();
        } catch (error) {
            console.error(error);
        }
    }
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    //console.log(acceptedFiles);
    //console.log(URL.createObjectURL(file));
    //console.log(file);
    formik.setFieldValue("miniature", URL.createObjectURL(file));
    formik.setFieldValue("file", file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "imag/jpeg, image/png",
    onDrop,
  });

  const getMiniature = () => {
    if(formik.values.file){
        return formik.values.miniature;
    }else if(formik.values.miniature){
        return `${ENV.BASE_PATH}/${formik.values.miniature}`;
    }
    return null;
  }


  return (
    <Form className='post-form' onSubmit={formik.handleSubmit}>
        
        <Form.Group widths="equal">       
            <Form.Input 
                name="title" 
                placeholder="Título"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.errors.title}
            />
            <Form.Input 
                name="path" 
                placeholder="Path"
                onChange={formik.handleChange}
                value={formik.values.path}
                error={formik.errors.path}
            />
        </Form.Group> 

        <Editor
            init={{
            height: 400,
            menubar: true,
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
            }}
            initialValue={formik.values.content}
            onBlur={(e) => formik.setFieldValue("content", e.target.getContent())}
        />
        
        <div className='post-form__miniature' {...getRootProps()}>
            <input {...getInputProps()} />
            {getMiniature() ? 
            (<Image size="small" src={getMiniature()} />) :
            (
                <div>
                  <span>Arraste uma imagem!</span>
                </div>
            )}
            
        </div>


    <Form.Button type="submit"  primary fluid  loading={ formik.isSubmitting }>
        {post ? "Atualizar o post" : "Criar novo post"}
    </Form.Button>

    </Form>
  );
}

