import React from "react";
import styled from "styled-components";
import { TodoItem } from "../index.js";
import { useTodoState } from "../index.js";


const TodoListBlock = styled.div`
	flex: 1; /* 자식 엘리먼트들이 자신이 차지 할 수 있는 영역을 꽉 채우도록 설정 */
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
	const todos = useTodoState();

	return (
		<TodoListBlock>
			{
				todos.map(todo => {
					return (
						<TodoItem 
							key={todo.id} 
							id={todo.id}
							text={todo.text}
							done={todo.done} 
						/>
					)
				})
			}
		</TodoListBlock>
	);
}

export default TodoList;