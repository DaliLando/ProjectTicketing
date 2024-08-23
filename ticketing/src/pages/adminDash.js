import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../API/eventApi';
import { Alert, Button, Spinner } from 'react-bootstrap';
import EventCard from '../Components/card';
import NewEvent from '../Components/newEvent';
import { useDispatch, useSelector } from 'react-redux';
import { setEvents } from '../app/eventSlice';

const AdminDash = () => {

  const { event } = useSelector((state) => state.Event);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getAllEvents()
      .then((doc) => {
        dispatch(setEvents(doc));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.msg);
        setLoading(false)
      });
  }, [dispatch]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
          <h1 style={{textAlign:"center", marginTop:"30px"}}> Manage Events : </h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
        {event.map((item, index) => {
          return <EventCard event={item} key={index} />;
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button variant="primary" onClick={handleShow}>
          Create New Event
        </Button>
      </div>

      {show && <NewEvent show={show} handleClose={handleClose} />}
    </div>
  );
};

export default AdminDash;
