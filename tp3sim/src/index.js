import React from 'react';
import ReactDOM from 'react-dom/client';
import Principal from './Pantalla/Principal';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Principal/>
  </React.StrictMode>
);

reportWebVitals();