import React, { useState } from 'react';
import { signIn } from '../API/authAPI';
import { Form, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { getLocalStorage, setLocalStorage } from '../helpers/localStorage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // New loading state

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    signIn(credentials)
      .then((doc) => {
        setLocalStorage(doc.token, doc.doesExist);
        const user = getLocalStorage("user");

        if (user.role === "user") {
          navigate('/');
        }
        if (user.role === "admin") {
          navigate('/admin');
        }
        toast.success("Login success!",
          {position:"top-center"}
        )
      })
      .catch((err) => {
        toast.error(err.response.data.msg,{position:"top-center"});
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
              <Card.Title className="text-center">Login</Card.Title>
              <Form>
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
                    'Login'
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

export default Login;
