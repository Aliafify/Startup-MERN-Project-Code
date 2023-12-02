import React from 'react'
// import ReactDOM from 'react-dom'
// import reportWebVitals from '@testing-library/react'
import {createRoot} from "react-dom/client";
// import { persistReducer,persistStore  } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';

import './index.css'
import App from './App'
import {Provider} from 'react-redux';
import reducer from './reducer';
import middleware from "./middleware";
import {createStore} from "redux";
// import storage from 'redux-persist/lib/storage';

// const localStorage = window.localStorage;

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(reducer,middleware);

// const persistor = persistStore(store);

const rootElement = document.getElementById("root");

createRoot(rootElement).render(

  <React.StrictMode> 
  <Provider store={store}>
  {/* <PersistGate loading={null} persistor={persistor}> */}

    <App />
    {/* </PersistGate> */}
  </Provider>
  </React.StrictMode> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
