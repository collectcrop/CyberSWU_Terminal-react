import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from "./store"
import { Provider } from "react-redux"
import AppRouter from './router'
import './theme.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AuthProvider>
        <AppRouter />  
    </AuthProvider>
  </Provider>
);

