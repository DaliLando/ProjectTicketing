// ticketing/src/pages/home.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EventList from '../Components/eventList';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <h2>Sports</h2>
          <EventList category="sports" />
        </Col>
        <Col md={6}>
          <h2>Entertainment</h2>
          <EventList category="entertainment" />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
