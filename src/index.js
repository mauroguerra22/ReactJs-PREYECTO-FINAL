import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import common_de from "./assets/i18n/de.json";
import common_en from "./assets/i18n/en.json";
import 'antd/dist/antd.css';

    i18next.init({
        interpolation: { escapeValue: false },  
        lng: 'en',                             
        resources: {
            en: {
                common: common_en               
            },
            de: {
                common: common_de
            },
        },
    });

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </I18nextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
