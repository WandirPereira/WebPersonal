import React, { useState } from 'react'
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.form";
import "./RegisterForm.scss";

export function RegisterForm() {

    const [error, setError] =  useState("");

    const  formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validationOnChange: false,
        onSubmit: async ( formValue ) => {
            try {
                //console.log(formValue);
                setError("");
            } catch {
                //console.error(error);
                setError("Erro interno no servidor!");
            }
        },
    });

    return (
        <Form  className='register-form' onSubmit={formik.handleSubmit}>
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

            <Form.Input 
                name="repeatPassword" 
                type="password" 
                placeholder="Confirmar senha" 
                onChange={formik.handleChange}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
            />

            <Form.Checkbox 
                name="conditionsAccepted" 
                label="Li e aceito as políticas de privacidade" 
                onChange={(_ , data) => formik.setFieldValue("conditionsAccepted", data.checked)}
                cheked={formik.values.conditionsAccepted}
                error={formik.errors.conditionsAccepted}
            />

            <Form.Button 
                type="submit"  
                primary fluid
                loading={formik.isSubmitting}
            >
                Criar Conta
            </Form.Button>

            <p className='register-form__error'>{ error }</p>
        </Form>
    )
}
