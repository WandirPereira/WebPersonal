import React from 'react';
import { Form, Dropdown, Input } from "semantic-ui-react";
import { useFormik } from "formik";
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./MenuForm.form";



const menuController = new Menu();

export function MenuForm(props) {
  
  const { close, onReload, menu } = props;
  //console.log(props);
//console.log(onReload());
  //console.log(close);
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(menu),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
        //console.log(formValue);
        try {
            const data = {
                title: formValue.title,
                path: `${formValue.protocol}${formValue.path}`,
                order: formValue.order,
                active: formValue.active,
              };

            if(!menu){
                await menuController.createMenu(accessToken, data);
            }else{
               await menuController.updateMenu(accessToken, menu._id , data);
            }
            onReload();
            close();
        } catch (error) {
            console.error(error);
        }
    }
  });


  return (
    <Form className='menu-form' onSubmit={formik.handleSubmit}>

    <Form.Group widths="equal">
        <Form.Input 
            name="title" 
            placeholder="Título"
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.errors.title}
        />
        <Form.Input 
            name="order" 
            type="number"
            placeholder="Ordem"
            onChange={formik.handleChange}
            value={formik.values.order}
            error={formik.errors.order}
    />
    </Form.Group>

    <Input
        name="path"
        placeholder="URL"
        fluid
        onChange={formik.handleChange}
        value={formik.values.path}
        error={formik.errors.path}
        label={
          !menu ? (
            <Dropdown
              options={options}
              onChange={(_, data) =>
                formik.setFieldValue("protocol", data.value)
              }
              value={formik.values.protocol}
              error={formik.errors.protocol}
            />
          ) : null
        }
      />


    <Form.Button type="submit"  primary fluid  loading={ formik.isSubmitting }>
        {menu ? "Atualizar menu" : "Criar menu"}
    </Form.Button>

    </Form>
  );
}

const options = [
    { key: "https://", text: "https://", value: "https://" },
    { key: "http://", text: "http://", value: "http://" },
    { key: "/", text: "/", value: "/" },
  ];

