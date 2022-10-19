import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import  { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import  reducer from './reducers';
import thunk from 'redux-thunk';
import { getFetchedProducts } from "./actions";
// import { getFetchedProductsFavorites } from "./actions";
import { createLogger } from "redux-logger";
import 'antd/dist/antd.css';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import common_de from "./assets/i18n/de.json";
import common_en from "./assets/i18n/en.json";
import 'react-credit-cards/es/styles-compiled.css';

/*==================CONFIG THE STORE=================*/
const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production'){
    middleware.push(createLogger());
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //

//Inicializo mi store!
const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(...middleware))
)

store.dispatch(getFetchedProducts());
// store.dispatch(getFetchedProductsFavorites());

/*===================================*/


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
    <Provider store={store}>
        <I18nextProvider i18n={i18next}>
            <App />
        </I18nextProvider>
    </Provider>,
  document.getElementById('root')
);



serviceWorker.register();
