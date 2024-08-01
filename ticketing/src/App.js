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
import NewEvent from './Components/newEvent';
import UpdateEvent from './Components/updateEvent';


function App() {
  return (
    <div>
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
        <Route path="/update/:id" element={<UpdateEvent/>}/>
        </Route>
      </Routes>
      </div>
   
  );
};


export default App;
