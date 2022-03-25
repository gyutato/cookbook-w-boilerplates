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



## 컴포넌트 분리

## useRef
```js
import {useRef} from 'react';
```
- DOM을 선택할 때
	- Ref 객체를 만들어 변수에 할당한 뒤 이 변수를 DOM의 ref 어트리뷰트 값으로 준다.
- 컴포넌트 안에서 조회 및 수정할 수 있는 변수를 관리할 때
	- 값이 변경되어도 컴포넌트가 재렌더링되지 않는다.
	- 상태 변경 함수 호출 및 업데이트를 위한 렌더링을 하지 않아도 바로 변경된 값을 조회할 수 있다.
	- setTimeout/setInterval을 통해서 만들어진 id, 스크롤 위치 등

## useMemo
## useReducer
- 상태 업데이트 로직을 컴포넌트와 분리해서 사용할 수 있음
	- reducer 함수 안에 업데이트 로직을 넣어두고 사용하기 때문
	- 전역 상태와는 관계가 없다. (Context API, Redux 등)
## useCallback
## React.memo
## 상태 함수형 업데이트
## 커스텀 Hooks