import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getLocalStorage } from '../helpers/localStorage';
import { useEffect, useState } from 'react';

const CustomNavbar = () => {

  const [token , setToken] = useState(null)



  useEffect(()=>{
    setToken(getLocalStorage('token'))
  },[])
let user = getLocalStorage('user')
  return (
    <Navbar bg="dark" variant="dark" expand="lg" >
      <Navbar.Brand as={Link} to="/" style={{marginLeft:"100px"}}>Kossli maak</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {token ? <Nav className="ml-auto custom-nav" style={{marginLeft:"85%"}}>
          <Nav.Link as={Link} to="/admin">{user.firstName} {user.lastName}</Nav.Link>
        </Nav>:  
        <Nav className="ml-auto custom-nav" style={{marginLeft:"85%"}}>
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
        <Nav.Link as={Link} to="/register">Register</Nav.Link>
      </Nav> }
        
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
