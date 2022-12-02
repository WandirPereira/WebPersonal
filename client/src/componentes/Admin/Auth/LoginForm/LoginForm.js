import React from 'react';
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../../api";
import {useAuth} from "../../../../hooks"
import { initialValues, validationSchema } from "./LoginForm.form";

const authController = new Auth();

export function LoginForm() {

    const { login } = useAuth();
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                //Chama o login do backend, passando o email e password, através do formValue, e recebe o accessToken e o refreshToken
                const response = await authController.login(formValue);
                authController.setAccessToken(response.access);
                authController.setRefreshToken(response.refresh);
                //chama o método login da AuthContext, que salva o user e accessToken em uma variável UseState
                login(response.access);
            } catch (error) {
                console.error(error);
            }
        }
    });

  return (
    <Form onSubmit={ formik.handleSubmit } >
        <Form.Input 
            name="email" 
            placeholder="E-mail" 
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
        />
        <Form.Input 
            name="password" 
            type="password" 
            placeholder="Senha" 
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
        />

        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
            Entrar
        </Form.Button>
    </Form>

  )
}
