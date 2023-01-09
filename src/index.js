import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import {LoadingMarkup} from './components/loadingMarkup/loading';


ReactDOM.render(
  <Suspense fallback={<LoadingMarkup/>}>
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
