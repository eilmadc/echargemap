import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from './components/About';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    
    {/**Estilos de lib react-tabs */}
    <link rel="stylesheet" href="https://unpkg.com/react-tabs/style/react-tabs.css"></link>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="about" element={<About />} />
{/*         <Route path="/signin" component={<Signin />} />
        <Route path="/signup" component={<Signup />} /> */}
        {/* <Route path="/resetpassword" element={<ResetPassword />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

