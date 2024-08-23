import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
import UserTickets from './pages/userTickets';
import AdminManage from './pages/adminManage';
import Footer from './Components/footer';

function App() {
  return (
    <div >
      <CustomNavbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<UserRoute/>}>
            <Route path="/category/:category" element={<EventList/>} />
            <Route path="/tickets" element={<UserTickets/>}/>
            <Route path="/profile" element={<UserProfile/>}/>
            <Route path="/cancel/:id" element={<PopUp/>}/>
          </Route>

          <Route element={<AdminRoute/>}>
            <Route path='/admin' element={<AdminDash/>}/>
            <Route path="/update/:id" element={<UpdateEvent/>}/>
            <Route path='/stats' element={<AdminStats/>}/>
            <Route path='/manage' element={<AdminManage/>}/>
          </Route>
        </Routes>
      </div>
      <Footer />
      </div>
  );
}

export default App;
