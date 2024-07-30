
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container style={{ height:"600px", display:"flex",
     justifyContent:"space-evenly" , alignItems:"center",
     }}>
      <Row>
        <Col md={6}>
        <Card style={{ width: '20rem',height:"20rem",margin:"100px",cursor:"pointer" }} onClick={()=>navigate("/category/sport")}>
        <Card.Img variant="top" src="sports.png"  width={'200px'} height={'400px'}/>
        <h3 style={{position:"absolute" , marginLeft:"120px",marginTop:'120px' , color:"white"}}>Sports</h3>
        </Card>
        
         
        </Col>
        <Col md={6}>
        <Card style={{ width: '20rem',height:"20rem",margin:"100px",cursor:"pointer" }} onClick={()=>navigate("/category/entertainement")}>
        <Card.Img variant="top" src="festival.jpg" width={'200px'} height={'400px'} />
        <h3 style={{position:"absolute" , marginLeft:"60px",marginTop:'120px' , color:"white",}}>Entertainement</h3>
        </Card>
          
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
