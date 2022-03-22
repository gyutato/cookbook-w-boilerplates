import './App.css';
import { useState } from 'react';
import data from './data.js'
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap'

function App() {

  let [infos] = useState(data)

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
          {
            infos.map((info, idx) => {return(
                <Product info={info} idx={idx} />
              );
            })
          }
        </Row>
      </Container>
    </div>
  );
}

function Product(props) {
  return (
    <Col sm>
      <img 
        src={process.env.PUBLIC_URL + '/img/product' + props.idx + '.jpg'}
        className={'productCard ' + props.idx}
      />
      <h4>{props.info.title}</h4>
      <p>{props.info.content}</p>
    </Col>
  );
}

export default App;
