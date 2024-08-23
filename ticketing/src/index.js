import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import store from './app/store';
import {Provider} from "react-redux"
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store = {store}> 
  <App />
  <ToastContainer />
  </Provider>
  </BrowserRouter>
    
 
);

