import React from 'react';
import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "../layouts";
import { Auth, Users, Posts, Courses, Menu, Newsletter } from "../pages/admin";
import { useAuth } from "../hooks";

//const user =  null; //{email: "yern@gmail.com"};

export function AdminRouter() {

  //console.log(useAuth());
  const { user } = useAuth();

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
                            element={loadLayout(AdminLayout, Posts )}
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