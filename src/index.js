import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from "./store"
import { Provider } from "react-redux"
import { RouterProvider } from 'react-router-dom';
import router from './router'
import './theme.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <script src="https://kit.fontawesome.com/f105397536.js" crossorigin="anonymous"></script>
        <RouterProvider router={router}></RouterProvider>
    </Provider>
);

