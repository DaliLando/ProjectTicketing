import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from "./pages/login";
import Register from "./pages/register";
import CustomNavbar from './Components/NavBar';
import CategoryEvents from './pages/categories';


function App() {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category/:category" component={CategoryEvents} />
      </Routes>
    </Router>
  );
};


export default App;
