import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./router/index.jsx"
import { MyProvider } from "./context/context"

ReactDOM.render(
  <React.StrictMode>
    <MyProvider>
      <Routes />
    </MyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);