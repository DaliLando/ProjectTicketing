import React, { useState } from 'react';
import { signUp } from '../API/authAPI';
import { Form, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Register = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    signUp(user)
      .then((doc) => {
        console.log(doc);
        navigate('/login'); // Redirect to login page after successful registration
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  return (
    <Container >
      <Row className="justify-content-md-center mt-5">
        <Col md="6">
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Register</Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    onChange={handleChange}
                    disabled={loading} // Disable input when loading
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    onChange={handleChange}
                    disabled={loading} // Disable input when loading
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                    disabled={loading} // Disable input when loading
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    disabled={loading} // Disable input when loading
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleClick}
                  disabled={loading} // Disable button when loading
                >
                  {loading ? (
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  ) : (
                    'Register'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
