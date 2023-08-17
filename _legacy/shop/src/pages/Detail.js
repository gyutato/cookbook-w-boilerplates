import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Nav } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

/* eslint-disable */

function Detail(props) {
	let {id} = useParams();
	let chosen = props.products.find(element => element.id == id)
	let [modal, setModal] = useState(true);
	let [value, setValue] = useState('');
	let [tabNum, setTabNum] = useState('');

	useEffect(() => {
		setTimeout(() => {
			setModal(false);
		}, 5000)
		if (!Number.isInteger(value) && value != '') { // isNaN도 사용가능
			alert("숫자만 입력해주세요.");
			setValue('');
		}
	}, [value])

	return (
		<Container>
		{
			modal == true ?
			<div className="customModal">
				<Modal.Dialog className="popUpBox">
					<Modal.Header closeButton>
						<Modal.Title>🦄 깜짝 이벤트 🦄</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h6>5초 안에 장바구니에 담으면</h6> <h6 className='red'>20% 할인가 적용!</h6>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary">장바구니 담기</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</div>
			: null
		}
			<Row style={{marginBottom: '20px'}}>
				<Col md={6} >
				{
					chosen.id > 2
					? <img 
						className="detailCut" 
						src={process.env.PUBLIC_URL + '/img/noImage.png'} 
					/>
					: <img 
						className="detailCut" 
						src={process.env.PUBLIC_URL + '/img/product'+chosen.id+'.jpg'} 
					/>
				}
				</Col>
				<Col md={6} style={{margin: 'auto'}}>
					<h4 style={{ paddingTop: 20 }}>{chosen.title}</h4>
					<p>{chosen.content}</p>
					<p>{chosen.price}₩</p>
					<input 
						type="text" 
						style={{display : 'block', margin : 'auto'}}
						value={value}
						placeholder="수량을 입력하세요"
						onChange={(e) => {setValue(e.target.value)}}
					/>
					<Button variant="danger" style={{margin : '10px auto', display: 'block'}}>주문하기</Button>
				</Col>
			</Row>
			<Nav justify variant="tabs" defaultActiveKey="" style={{marginBottom: '20px'}}>
				<Nav.Item>
					<Nav.Link eventKey="link1" onClick={() => {setTabNum(0)}}>상세정보</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="link2" onClick={() => {setTabNum(1)}}>사용자리뷰</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="link3" onClick={() => {setTabNum(2)}}>Q&A</Nav.Link>
				</Nav.Item>
			</Nav>
			<TabContent tabNum={tabNum} product={chosen}/>
		</Container>
		
	); 
}

function TabContent(props) {
	let [fade, setFade] = useState('');

	useEffect(() => {
		setTimeout(() => {setFade('end')}, 100)
		return () => {
			setFade('')
		}
	}, [props.tabNum])

	return (
		<div className={'tmpContent start ' + fade}>
		{
			props.tabNum == 0
				? <div>{props.product.title}</div>
				: (props.tabNum == 1
					? '사용자리뷰 입니다'
					: '질의응답 입니다')
		}
		</div>
	)
}

export default Detail