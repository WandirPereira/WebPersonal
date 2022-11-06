import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { WebRouter, AdminRouter } from './router';
import { Button } from 'semantic-ui-react';

export default function App() {
  return (
    <BrowserRouter>
      <WebRouter />
      <AdminRouter />
    </BrowserRouter>
    
  )
}
