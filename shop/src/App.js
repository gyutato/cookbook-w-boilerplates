import './App.css';
import { useState } from 'react';
import data from './data.js'
import { Container, Nav, Navbar, Row, Col, Button } from 'react-bootstrap'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Detail from './pages/Detail.js'
import Event from './pages/Event.js'
import axios from 'axios';

function App() {

  let [products, setProducts] = useState(data)
  let [server, setServer] = useState(2);
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
      <Button variant='secondary' 
        style={{margin: '5px 20px 20px 20px'}}
        onClick={() => {
          if (server == 4) {
            alert('상품이 더 이상 존재하지 않습니다.')
          }
          else {
            // 로딩중 UI 띄우기
            axios.get('https://codingapple1.github.io/shop/data'+server+'.json')
            .then((data) => {
              // 로딩중 UI 숨기기
              let newCopy = products.concat(data.data)
              setProducts(newCopy)
            })
            .catch(() => {
              // 로딩중 UI 숨기기
            })
            setServer(server + 1)
          }
        }}>
        누르면 신발 나옴
      </Button>
    </div>
  );
}

function Product(props) {
  let navigate = useNavigate();

  return (
    <Col md={4}>
      {
        props.idx <= 2
        ? <img 
          src={process.env.PUBLIC_URL + '/img/product' + props.idx + '.jpg'}
          className={'productCard ' + props.idx}
          onClick={() => { navigate('/details/' + props.idx) }}
        />
        : <img 
          src={process.env.PUBLIC_URL + '/img/noImage.png'}
          className={'productCard ' + props.idx}
          onClick={() => { navigate('/details/' + props.idx) }}
        />
      }
      <h5>{props.product.title}</h5>
      <p>{props.product.content}</p>
    </Col>
  );
}

export default App;
