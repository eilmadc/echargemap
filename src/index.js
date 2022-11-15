import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from './components/About';

/* Autentificacion al servidor */
import { AuthServer } from './context/AuthServer';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    
    {/**Estilos de lib react-tabs */}
    <link rel="stylesheet" href="https://unpkg.com/react-tabs/style/react-tabs.css"></link>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

