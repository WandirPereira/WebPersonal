import React from 'react';
import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "../layouts";
import { Auth, Users, Blog, Courses, Menu, Newsletter } from "../pages/admin";


const user =  null; //{email: "yern@gmail.com"};

export function AdminRouter() {

  const loadLayout = ( Layout, Page ) => {
    return (
        <Layout>
            <Page />
        </Layout>
    );
  };


  return (
    <Routes>
      { !user ? (  
                    //<Route path="/admin/*" element={ loadLayout(AdminLayout, Auth) } />  
                    <Route path="/admin/*" element={ <Auth/> } />  
                ) : (  
                    <>
                        {["/admin", "/admin/blog"].map((path) => (
                          <Route
                            key={path}
                            path={path}
                            element={loadLayout(AdminLayout, Blog )}
                          />
                        ))}
                        <Route path="/admin/users" element={ loadLayout(AdminLayout, Users) } /> 
                        <Route path="/admin/courses" element={ loadLayout(AdminLayout, Courses) } /> 
                        <Route path="/admin/menu" element={ loadLayout(AdminLayout, Menu) } /> 
                        <Route path="/admin/newsletter" element={ loadLayout(AdminLayout, Newsletter) } /> 
                    </>  
                ) 
      }  
    </Routes>
  )
}