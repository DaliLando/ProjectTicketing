import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Modal, Alert } from 'react-bootstrap';
import { getUserProfile, updateUserProfile, changeUserPassword } from '../API/userApi';

const UserProfile = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [passwordData, setPasswordData] = useState({
    oldpswd: '',
    password: '',
    confirmPassword: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    getUserProfile()
    .then((data) => {
      console.log("Fetched user profile data:", data); // Log the data for debugging
      
      if (data.user) { // Check if data contains the user object
        setUser({
          firstName: data.user.firstName || '',
          lastName: data.user.lastName || '',
          email: data.user.email || '',
        });
      } else {
        console.error("User data not found");
      }
    })
    .catch((err) => {
      console.error("Error fetching user profile:", err);
    });
}, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateUserProfile(user)
      .then(() => {
        localStorage.setItem('user',JSON.stringify(user))

        setSuccess('Profile updated successfully!');
        setError(null);
      })
      .catch(() => {
        setError('Failed to update profile.');
        setSuccess(null);
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    changeUserPassword(passwordData)
      .then(() => {
        setSuccess('Password changed successfully!');
        setError(null);
        setShowModal(false);
        setPasswordData({ oldpswd: '', password: '', confirmPassword: '' });
      })
      .catch((err) => {
        setError(err.response?.data?.msg || 'Failed to change password.');
        setSuccess(null);
      });
  };

  return (
    <div>
 <h1 style={{textAlign:"center", marginTop:"30px"}}> Edit your profile </h1>  
   <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md="6">
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Profile</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleUpdateProfile}>
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={user.email}
                    disabled
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Update Profile
                </Button>
              </Form>

              <Button variant="link" className="mt-3" onClick={() => setShowModal(true)}>
                Change Password
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Password Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handlePasswordSubmit}>
            <Form.Group className="mb-3" controlId="formOldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter old password"
                name="oldpswd"
                value={passwordData.oldpswd}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                name="password"
                value={passwordData.password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
    </div>
  );
};

export default UserProfile;
