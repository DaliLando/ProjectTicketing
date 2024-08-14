import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from "./pages/login";
import Register from "./pages/register";
import CustomNavbar from './Components/NavBar';
import EventList from './Components/eventList';
import UserRoute from './protectedRoute/userRoute';
import AdminRoute from './protectedRoute/adminRoute';
import AdminDash from './pages/adminDash';
import UpdateEvent from './Components/updateEvent';
import UserProfile from './pages/userProfile';
import PopUp from './Components/popUp';
import AdminStats from './pages/adminStats';


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
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/cancel/:id" element={<PopUp/>}/>
        </Route>


        <Route element={<AdminRoute/>}>
        <Route path='/admin' element={<AdminDash/>}/>
        <Route path="/update/:id" element={<UpdateEvent/>}/>
        <Route path='/stats' element={<AdminStats/>}/>
        </Route>
      </Routes>
      </div>
   
  );
};


export default App;
