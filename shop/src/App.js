import './App.css';
import product1 from './img/product1.jpg';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap'

function App() {
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
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
          <Col sm>
            <div className="product second"></div>
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
          <Col sm>
            <div className="product third"></div>
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
