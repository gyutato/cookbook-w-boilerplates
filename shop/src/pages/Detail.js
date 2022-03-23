import { Container, Row, Col, Button } from "react-bootstrap";

function Detail() {
	return (
		<Container>
			<Row>
				<Col md={6}>
					<img src={process.env.PUBLIC_URL + '/img/product0.jpg'} width="100%" />
				</Col>
				<Col md={6}>
					<h4 style={{ paddingTop: 20 }}>상품명</h4>
					<p>상품설명</p>
					<p>120000원</p>
					<Button variant="danger">주문하기</Button>
				</Col>
			</Row>
		</Container>
	); 
}
export default Detail