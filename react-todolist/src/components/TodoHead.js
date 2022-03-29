import React from "react";
import styled from "styled-components";
import { useTodoState } from "../index.js"

const TodoHeadBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

function TodoHead() {
	const todos = useTodoState();
	const undoneTasks = todos.filter(todo => !todo.done);

	const today = new Date();
	const dateString = today.toLocaleDateString("ko-KR",{
			year: "numeric", // 항상 numeric
			month: "long", // month가 long으로 설정되면 지역 표기벅으로 출력함. 영어권에서는 월이 월명으로, 한글권에서는 년, 월, 일이 추가되어 처리
			day: "numeric", // 항상 numeric
	});
	const dayName = today.toLocaleDateString("ko-KR", { weekday: "long" }); // 항상 numeric

	return (
		<TodoHeadBlock>
			<h1>{dateString}</h1>
			<div className="day">{dayName}</div>
			<div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
		</TodoHeadBlock>
	)
}

export default TodoHead;