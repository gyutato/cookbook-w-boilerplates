import React from "react";
import { Routes, Route, Outlet } from 'react-router-dom';

function Event() {
	return (
		<>
			<h4>"/" 경로는 어디인가</h4>
			<Outlet></Outlet>
			<Routes>
				<Route path="/" element={<div>현재 페이지를 가리키는가?</div>}/>
			</Routes>
		</>
	);
}

export default Event