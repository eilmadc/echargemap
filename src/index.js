import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/**Estilos de lib react-tabs */}
    <link rel="stylesheet" href="https://unpkg.com/react-tabs/style/react-tabs.css"></link>
    <App />
  </React.StrictMode>
);

