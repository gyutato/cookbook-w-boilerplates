import './App.css';
import { useState } from 'react';
import data from './data.js'
import { Container, Nav, Navbar, Row, Col, Button } from 'react-bootstrap'
import { Router, Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail.js'
import Event from './pages/Event.js'

function App() {

  let [infos] = useState(data)
  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">GYUSINSA</Navbar.Brand>
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
        } />
        <Route path="/details" element={ <Detail /> } />
        <Route path='/events/*' element={ <Event /> } >
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}/>
          <Route path="two" element={<p>생일기념 쿠폰 받기</p>}/>
        </Route>
        {/* <Route path='/events' element={<EventList />}>
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}/>
          <Route path="two" element={<p>생일기념 쿠폰 받기</p>}/>
        </Route> */}
      </Routes>
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
