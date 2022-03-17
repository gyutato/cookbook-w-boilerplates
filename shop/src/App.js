import './App.css';
import { useState } from 'react';
import data from './data.js'
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap'

function App() {

  let [details] = useState(data)

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">GYUSINSA</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>
      <Container>
        <Row>
          <Col sm>
            <div className="product first"></div>
            <h4>{details[0].title}</h4>
            <p>{details[0].content}</p>
          </Col>
          <Col sm>
            <div className="product second"></div>
            <h4>{details[1].title}</h4>
            <p>{details[1].content}</p>
          </Col>
          <Col sm>
            <div className="product third"></div>
            <h4>{details[2].title}</h4>
            <p>{details[2].content}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
