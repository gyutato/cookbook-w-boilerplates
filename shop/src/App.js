import './App.css';
import { useState } from 'react';
import data from './data.js'
import { Container, Nav, Navbar, Row, Col} from 'react-bootstrap'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Detail from './pages/Detail.js'
import Event from './pages/Event.js'

function App() {

  let [products] = useState(data)
  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand onClick={() => { navigate('/') }}>GYUSINSA</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/details') }}>Details</Nav.Link>
            <Nav.Link onClick={() => { navigate('/events') }}>Events</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <div>
            <img 
              className="main-bg" 
              src={process.env.PUBLIC_URL + '/img/mainbg.jpg'}
            />
            <Container>
              <Row>
                {
                  products.map((product, idx) => {return(
                      <Product product={product} idx={idx} />
                    );
                  })
                }
              </Row>
            </Container>
          </div>
        } />
        <Route path="/details/:id" element={ <Detail products={products} /> } />
        <Route path='/events/*' element={ <Event /> } >
        </Route>
      </Routes>
    </div>
  );
}

function Product(props) {
  let navigate = useNavigate();

  return (
    <Col sm>
      <img 
        src={process.env.PUBLIC_URL + '/img/product' + props.idx + '.jpg'}
        className={'productCard ' + props.idx}
        onClick={() => { navigate('/details/' + props.idx) }}
      />
      <h5>{props.product.title}</h5>
      <p>{props.product.content}</p>
    </Col>
  );
}

export default App;
