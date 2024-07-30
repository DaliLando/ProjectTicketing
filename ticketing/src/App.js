import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from "./pages/login";
import Register from "./pages/register";
import CustomNavbar from './Components/NavBar';
import EventList from './Components/eventList';
import UserRoute from './protectedRoute/userRoute';
import AdminRoute from './protectedRoute/adminRoute';
import AdminDash from './pages/adminDash';


function App() {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<UserRoute/>}>
        <Route path="/category/:category" element={<EventList/>} />
        </Route>


        <Route element={<AdminRoute/>}>
        <Route path='/admin' element={<AdminDash/>}/>

        </Route>
      </Routes>
    </Router>
  );
};


export default App;
