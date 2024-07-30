import React, { useState } from 'react';
import { signIn } from '../API/authAPI';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import {getLocalStorage, setLocalStorage } from '../helpers/localStorage';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

 
  
  const handleClick = (e) => {
    e.preventDefault();
    signIn(credentials)
      .then((doc) => {
        // console.log(doc);
        setLocalStorage(doc.token , doc.doesExist);

        const user = getLocalStorage("user");
        if(user.role ==="user"){
          navigate('/')
        }
        if(user.role === "admin"){
          navigate('/admin')
        }
       
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md="6">
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Login</Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleClick}>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
