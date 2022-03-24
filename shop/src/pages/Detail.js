import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

function Detail(props) {
	let {id} = useParams();
	let chosen = props.products.find(element => element.id == id)
	let [modal, setModal] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setModal(false);
		}, 5000)
	})

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
						<h6>5초 안에 장바구니에 담으면 <h6 className='red'>20% 할인가 적용!</h6></h6>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary">장바구니 담기</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</div>
			: null
		}
			<Row>
				<Col md={6}>
					<img 
						className="detailCut" 
						src={process.env.PUBLIC_URL + '/img/product0.jpg'} 
					/>
				</Col>
				<Col md={6}>
					<h4 style={{ paddingTop: 20 }}>{chosen.title}</h4>
					<p>{chosen.content}</p>
					<p>{chosen.price}₩</p>
					<Button variant="danger">주문하기</Button>
				</Col>
			</Row>
		</Container>
	); 
}

export default Detail