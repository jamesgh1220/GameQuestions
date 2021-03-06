import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// Importando bootstrap
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

