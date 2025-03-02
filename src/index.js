import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/home';
import Login from './pages/login';
import Registration from './pages/registration';
import Xatroom from './pages/xatroom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" >
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path="/xatroom/:id" element={<Xatroom />} />
    </Route>
  </Routes>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
