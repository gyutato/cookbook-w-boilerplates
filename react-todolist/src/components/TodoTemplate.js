import React from "react";
import styled from "styled-components";

const TodoTemplateBlock = styled.div`
  width: 512px;
	height: 768px;

	position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
	background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

function TodoTemplate({children}) {
	return (
		<TodoTemplateBlock>
			{children} {
				// props.children : 태그와 태그 사이의 모든 내용을 표시하기 위해 사용되는 특수한 props
				// 범용적 박스 역할을 하는 컴포넌트 등 어떤 자식 엘리먼트가 들어올지 미리 예상할 수 없는 경우 사용한다.
			}
		</TodoTemplateBlock>
	);
}

export default TodoTemplate;