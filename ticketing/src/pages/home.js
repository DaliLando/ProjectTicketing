import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Row className="w-100">
        <Col xs={12} sm={6} className="d-flex justify-content-center mb-4">
          <Card
            style={{
              width: '100%',
              maxWidth: '20rem',
              height: '20rem',
              cursor: 'pointer',
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onClick={() => navigate('/category/sport')}
            className="hover-card"
          >
            <Card.Img
              variant="top"
              src="sports.png"
              className="img-fluid"
              style={{
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h3
                style={{
                  color: 'white',
                  textAlign: 'center',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
                }}
              >
                Sports
              </h3>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6} className="d-flex justify-content-center mb-4">
          <Card
            style={{
              width: '100%',
              maxWidth: '20rem',
              height: '20rem',
              cursor: 'pointer',
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onClick={() => navigate('/category/entertainement')}
            className="hover-card"
          >
            <Card.Img
              variant="top"
              src="festival.jpg"
              className="img-fluid"
              style={{
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h3
                style={{
                  color: 'white',
                  textAlign: 'center',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
                }}
              >
                Entertainment
              </h3>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
