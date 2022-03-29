# CRUD To Do List w/ React
리액트로 CRUD 투두리스트를 만듭니다.
react-icons, styled-components

## 개발 환경 셋팅
```bash
npm install -g yarn # 또는 brew install app
yarn create react-app react-todolist # 또는 npx create-react-app react-todolist

# 프로젝트 디렉토리에서 패키지 설치
yarn add react-icons styled-components
yarn start 
```
-  `yarn` 은 `npm` 동작 방식과 비슷하지만 `npm` 의 단점을 보완해 성능과 속도를 개선한 패키지 관리 도구
- `npm` 은 여러 패키지를 설치할 경우 패키지가 완전히 설치될 때까지 기다렸다가 다른 패키지로 이동한다. 
- `yarn` 은 이 작업들을 병렬로 설치하기 때문에 성능과 속도가 향상된다.
- `yarn` 이 설치된 컴퓨터에서 `npx create-react-app OOO` 를 실행하면 자동으로 `npm` 을 패키지 매니저로 사용하는것이 아닌 `yarn` 을 패키지 매니저로 사용하는 형태로 설치가 된다고 한다.

<br/>

## 컴포넌트 분리
구현에 앞서, 만들고자 하는 투두리스트의 구조 및 각 컴포넌트의 역할을 구상했습니다.

### TodoTemplate
- 페이지 전체 레이아웃을 설정하는 컴포넌트입니다. 아래 네 개의 컴포넌트들을 불러와 배치합니다.

### TodoHead
- 오늘의 날짜와 요일을 보여주고, 해야 할 일의 개수를 보여주는 컴포넌트입니다.

### TodoItem
- 각 할 일에 대한 정보를 렌더링해줍니다. 완료 여부 체크와 수정 및 삭제 버튼이 있습니다.

### TodoList
- 여러 개의 TodoItem 컴포넌트를 map 함수로 렌더링합니다.

### TodoCreate
- 새로운 할 일을 등록할 수 있게 해주는 컴포넌트입니다.

<br/>

## styled-components 로 컴포넌트 스타일 관리
왜 썼는가? css 로 분리하는 것에 비해 장점? 
단점을 상쇄할 수 있나?
styled.div 라고 하면 딱 div 한개짜리 컴포넌트가 생기는건데, 복잡한 건 못 만드나? 컴포넌트를 미리 만들어 놓고 styled() 로 컴포넌트를 인자로 받으면 되나
그냥 자식 클래스명으로 관리하면 되니까 사실 상관없겠다?

## useReducer와 Context API로 상태와 상태 변경 함수 분리
- useState 대신 useReducer를 사용하여 상태 관리
	- 상태 업데이트 로직을 컴포넌트로부터 분리해서 복잡함을 줄임
	- 하나의 상태(Todo의 내용 등)에 여러 컴포넌트가 접근해서 업데이트하기 때문
	- reducer? : 현재 상태와 `액션 객체` 를 파라미터로 받아와서 새로운 상태를 반환해주는 함수
	- 액션: 업데이트를 위한 정보를 가지고 있는 객체
- Context API : 상태가 여러 컴포넌트를 거칠 필요 없이 Context를 통해 사용되어, 복잡함을 줄임
	- 어떤 컴포넌트는 해당 상태를 사용하지 않으면서 단지 전달만 해주는 상황을 없애기 위함
```js
// state: 상태, dispatch: 액션을 발생시키는 함수
const [state, dispatch] = useReducer(todoReducer, initialTodos);
```

## useRef
- 컴포넌트 안에서 조회 및 수정할 수 있는 변수를 관리할 때
	- `nextId` 값은 사이트상에서 보여질 필요가 없는 값이므로, 즉시 업데이트되어야 하지만 컴포넌트를 렌더링시킬 필요는 없다.
	- 값이 변경되어도 컴포넌트가 재렌더링되지 않는다.
	- 상태 변경 함수 호출 및 업데이트를 위한 렌더링을 하지 않아도 바로 변경된 값을 조회할 수 있다.
- DOM을 선택할 때
	- Ref 객체를 만들어 변수에 할당한 뒤 이 변수를 DOM의 ref 어트리뷰트 값으로 준다.
```js
import {useRef} from 'react';
```

## useMemo
## useReducer

## useCallback
## React.memo
## 상태 함수형 업데이트
## 커스텀 Hooks