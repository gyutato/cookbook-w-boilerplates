import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap'

function Event() {
	let navigate = useNavigate();

	return (
		<>
			<h4 style={ {marginTop : 20} }>🎉 오늘의 이벤트 🎉</h4>
			<ButtonGroup aria-label="Basic example" style={ {margin : 20} }>
				<Button variant='secondary' onClick={() => {navigate('one')}}>이벤트 1 열기</Button>
			</ButtonGroup>
			<Routes>
				<Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}/>
				<Route path="two" element={<p>생일기념 쿠폰 받기</p>}/>
			</Routes>
		</>
	);
}

export default Event