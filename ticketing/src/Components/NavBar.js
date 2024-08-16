// import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import { getLocalStorage, removeLocalStorage } from '../helpers/localStorage';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
// import Avatar from '@mui/material/Avatar';
const CustomNavbar = () => {


  const [token , setToken] = useState(null);
  const [user,setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(()=>{
      setToken(getLocalStorage("token"))
      setUser(getLocalStorage("user"))
  },[location])

  const handelLogout =()=>{
    removeLocalStorage("token");
    removeLocalStorage("user");
    navigate('/')
  }

const publicNav =()=>{
  return (<Navbar className="bg-dark">
    <Container>
      <Navbar.Brand as={Link} to="/" style={{color:"white" , fontFamily:"Playfair Display",fontWeight:"bold" }}>
        Kosli maak
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end" >
      <Nav style={{fontSize:"18px" }} >
      <Nav.Link as={Link} to="/login" style={{color:"white",fontWeight:"bolder"}}>login</Nav.Link>
      <Nav.Link as={Link} to="/register"  style={{color:"white" , fontWeight:"bolder"}}>register</Nav.Link>
      </Nav>
      
      </Navbar.Collapse>
      </Container>
    </Navbar>
)
}
  const navForUser =()=>{
    return( <Navbar className="bg-dark">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{color:"white" }}>
          Kosli maak
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end" >
        {/* <Avatar >{user?.firstName.slice(0,1)}</Avatar> */}
        <Dropdown data-bs-theme="dark">
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" 
        style={{backgroundColor:"transparent" , border:"none" , cursor:"pointer"}}>
          {user?.firstName} {user?.lastName} 
        </Dropdown.Toggle>

        <Dropdown.Menu >
          <Dropdown.Item as={Link} to="/profile">
            profile
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">Tickets</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={()=>handelLogout()}>LogOut</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>)
  }

  const navForAdmin =()=>{
    return( <Navbar className="bg-dark">
      <Container>
        <Navbar.Brand as={Link} to="/admin"style={{color:"white"}}>
          Kosli maak
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end" >
        <Dropdown data-bs-theme="dark">
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" 
        style={{backgroundColor:"transparent" , border:"none" , cursor:"pointer"}}>
          {user?.firstName} {user?.lastName} 
        </Dropdown.Toggle>

        <Dropdown.Menu >
        <Dropdown.Item as={Link} to="/admin">Dash</Dropdown.Item>
        <Dropdown.Item as={Link} to="/stats">Stats</Dropdown.Item>
        
        <Dropdown.Divider />
        <Dropdown.Item onClick={()=>handelLogout()}>LogOut</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>  
      
      </Navbar.Collapse>
      </Container>
    </Navbar>
    )
  }

  return (
  
    <>
    {token && user?.role ==="user" ? navForUser()
     : token && user?.role==="admin" ? navForAdmin() : publicNav() }
    </>
  
  );
};

export default CustomNavbar;