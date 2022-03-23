# 쇼핑몰 구현 프로젝트
- tech stack: JavaScript, React.js
- react-router-dom
- React-Bootstrap

## React-Bootstrap 라이브러리

#### [react-bootstrap 공식 홈페이지](https://react-bootstrap.github.io/getting-started/introduction)
- get started 참고
```bash
npm install react-bootstrap bootstrap
```

#### Stylesheets 불러오기
	- html 또는 js 파일에 포함할 수 있다.
	- 본 프로젝트에서는 스타일 관련 속성을 index.html에서 관리하기로 한다.
```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
  integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
  crossorigin="anonymous"
/>
```

#### 컴포넌트 임포트
```js
import Button from 'react-bootstrap/Button';

// or less ideally
import { Button } from 'react-bootstrap';
```
- 라이브러리 전체를 임포트하기보다, 필요한 컴포넌트만 독립적으로 불러오는 것이 권장된다
> 📌 "You should import individual components like: `react-bootstrap/Button` rather than the entire library. Doing so pulls in only the specific components that you use, **which can significantly reduce the amount of code you end up sending to the client.**"

## `import` (feat. html, jsx 상에서 이미지 넣기)
- 이미지를 넣을 땐 CSS에서 `background-image` 등의 어트리뷰트를 사용하는 것이 편하다.
- 하지만 html이나 jsx 상에서 이미지를 넣어야 하는 경우:
```jsx
import [임의의 이름] from '[이미지 파일 경로]'
...
<div className="main-bg" style={{ background-image : 'url([임의의 이름])' }}></div>
``` 

#### `import` , `export` ?
```jsx
import React from 'react';
import { render } from 'react-dom';
...
// export { foo as default, bar };
export default foo;
export { bar };
```
- `import` : `export`로 내보낸 모듈을 가져오는 기능을 담당
	- import` 문을 보면 어떤 것은 중괄호가 쳐져 있고, 어떤 것은 그냥 변수명만 적혀 있다.
	- `default` 키워드가 붙어 `export` 된 모듈은 중괄호 없이 가져올 수 있다. 나머지는 중괄호를 사용하여 가져와야 한다.
- `export` : 변수, 함수, 클래스 앞에 `export` 키워드를 붙여서 모듈의 기능을 외부에서 사용할 수 있도록 내보냄
- **보통은 여러 파일의 컴포넌트들을 index.js 파일에 취합하는 방식으로 모듈을 관리한다.**
	- 코드 참고: [평범한 직장인의 공부 정리](https://developer-talk.tistory.com/139)
```jsx
// index.js
import DefaultPage from "./DefaultPage";
import { Page001 } from "./Page001";
import Page002 from "./Page002";
import Page003 from "./Page003";
import { ErrorPage } from "./Page404";

export { DefaultPage, Page001, Page002, Page003, ErrorPage };
```
- `index.js` 파일은 `Page` 폴더 내부에 작성된 모듈을 **불러와서, 내보낸다.**
	- 즉, `Page` 폴더 내부에서 `export` 하고자 하는 모듈은 `index.js` 파일에서 관리될 수 있다.

```jsx
// App.js
import { DefaultPage, Page001, Page002, Page003, ErrorPage } from "./Page";

export default function App() {
  return (
    <div>
      <DefaultPage />
      <Page001 />
      <Page002 />
      <Page003 />
      <ErrorPage />
    </div>
  );
}
```
- `index.js` 가 없었다면, 각 경로별로 여러번 `import` 되었어야 하는 코드가 단 한줄로 처리된다.

#### `public` 폴더
- html에 이미지 넣으려면 `import` 해서 쓴다는 건 알겠는데, 이미지가 100장이라면?
	- `import`를 100줄 넣는 짓을 할 수는 없다...!
- CRA는 페이지 발행 전에 html, js, css 파일들을 압축하는데(bundling), public 폴더 안에 있던 건 압축하지 않는다.
- 그래서 `/이미지경로` 로 입력해주면 된다.
```html
<img src="/background.img" />
```
- **단, 홈페이지(ex. `gyutato.github.io/` )가 아니라 하위 페이지 (ex. `gyutato.github.io/shop` ) 에 발행할 경우 문제가 생길 수 있다.**
	- 따라서 CRA 공식 문서에서는, `<img src={process.env.PUBLIC_URL + '/path/example.png'} />` 을 권장한다.

## 상품 정보 DOM에 뿌리기
- 서버에서 받아온 데이터를 변수에 저장해서 사용한다.
- 자주 변경될 수 있으므로 state에 저장한다.
- 단, 데이터(주로 JSON 형식)를 App.js등 파일에 그대로 불러오면, 코드가 불필요하게 길어질 수 있다.
```json
[
  {
    id : 0,
    title : "Post-it Brainstorming 101",
    content : "✨ effectively organize your thoughts ✨",
    price : 4900
  },

  {
    id : 1,
    title : "Tips for Apple Notes App",
    content : "🍎 the simplest and strongest memo tool 🍎",
    price : 5900
  },

  {
    id : 2,
    title : "How I Take Notes",
    content : "📝 tips for efficient and neat note taking 📝",
    price : 3900
  }
] 
```
- 세 개의 상품 정보만 불러와도 이만큼의 길이를 차지한다.
- **그래서 다른 js 파일에 취합해둔 후 필요한 부분만 `import` 해서 사용하는 것이다.**
- 컴포넌트의 규모가 크다면 다른 파일에 작성 후 `import` 해서 가독성을 높일 수 있다.

<br/>

## 리액트 라우터로 페이지 나누기
#### 페이지 나누기 - 리액트 미사용 ver.
1. **html 파일을 새로 만들어서** 해당 페이지 내용을 구성
2. 누군가 `/하위경로`로 접속하면 새로 만든 html 파일을 보냄

#### 페이지 나누기 - 리액트 라우터 ver.
- 리액트는 기본적으로 `Single Page Application`으로, **html 파일은 오직 하나만 사용한다.**
1. **컴포넌트를 만들어서** 해당 페이지 내용을 구성하고
2. 누군가 `/하위경로`로 접속하면 **새로 만든 컴포넌트를 보냄**

```bash
npm install react-router-dom
```
```jsx
// index.js
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```
```js
// App.jsx
import { Routes, Route, Link } from 'react-router-dom';

<Routes>
	<Route path="/" element={<div>메인페이지</div>}/>
	<Route path="/details" element={<div>상세페이지</div>}/>
</Routes>
<Link to="/">
	<Button variant="outline-secondary">홈으로 돌아가기</Button>
</Link>
```
- `react-router-dom` 라이브러리 설치
- `index.js`에서 `App` 컴포넌트를 `BrowserRouter` 컴포넌트로 감싸 준다
- `App.js`에서 `Routes`, `Route`, `Link` 등 필요한 요소를 임포트하여 사용한다.
	- `<Link>` 태그를 사용해서 특정 페이지로 이동하는 버튼을 간단히 만들 수 있다.

#### 404 페이지
- **없는 경로로 접속했을 때 띄우는 페이지**
- `<Route>` 태그의 `path` 속성으로 `*` 를 사용한다.
```jsx
<Route path="*" element={<div>없는 페이지입니다.</div>} />
```

#### 페이지를 컴포넌트로 만들어서 사용하기
- 위의 간단한 예시와 달리, 실제로 한 페이지를 통채로 `<Route />` 내부의 `element` 속성 안에 넣으려면 코드가 아주 길어져야 한다:
```js
<Routes>
	<Route path="/" element={
		<div>
		<div className="main-bg"></div>
		<Container>
			<Row>
			{
				infos.map((info, idx) => {return(
						<Product info={info} idx={idx} />
					);
				})
			}
			</Row>
		</Container>
		</div>
	} />
	<Route path="/detail" element={<div>상세페이지</div>} />
</Routes>
```
- 따라서, 다른 파일 혹은 컴포넌트로 분리해서 `App.js` 등 메인 파일에서의 가독성과 간결함을 높이는 것이 좋다.
	- `src` 폴더 안에 `/routes/컴포넌트이름.js` 같은 파일로 분리할 수 있다.
	- 다만 라이브러리(ex. `react-bootstrap` ) 를 메인 `App.js` 에서 임포트했더라도, 분리한 컴포넌트 내에서 사용하려면 다시 해당 파일 안에서 임포트해야 한다.
		- C 에서 `헤더 인클루드` 하는 것처럼 컴파일 단계에서 전부 포함되는 방식과 **다르다**는 것 유의

<br/>

## `useNavigate` hook 사용하기

#### hook?
- "`리액트 훅(React Hooks)` 이란 리액트 16.8 버전부터 추가된 기능으로, 클래스 컴포넌트와 생명주기 메서드를 이용하여 작업을 하던 기존 방식에서 벗어나 **함수형 컴포넌트에서도 더 직관적인 함수를 이용하여 작업할 수 있게 만든 기능**" 이다.
	- **훅은 최상위 레벨에서만 호출 가능하다.** 다시 말해 반복문, 조건문, 중첩된 함수 내부에서 호출하면 안 된다.
	- **훅은 오직 리액트 함수 컴포넌트 내에서만 호출 가능하다.**
- `use-*` 접두사로 시작하는 함수들

#### `useNavigate()`
```jsx
let navigate = useNavigate();

<Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
<Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
```
- `<Link>` 태그를 사용하면 `<a>` 태그와 유사한 형태의 요소가 만들어지는데, **못생겼다.**
- `useNavigate()` 를 사용하면 임의의 요소에 `onClick` 이벤트 핸들러를 달아 특정 페이지로 이동하도록 할 수 있다.
```jsx
let navigate = useNavigate();

<button onClick={() => { navigate(1) }}>prev</button>
<button onClick={() => { navigate(-1) }}>next</button>
```
- 숫자를 넣으면 앞으로 가기, 뒤로 가기 기능도 구현할 수 있다.

<br/>

## nested routes (중첩 라우팅)
```jsx
import { Routes, Route, Outlet } from 'react-router-dom';
<Routes>
	<Route path='/detail' element={<Detail/>}>
		<Route path='qna' element={<div>고객 문의</div>} />
		<Route path='review' element={<div>고객 후기</div>} />
	</Route>
</Routes>

function Detail() {
	return (
		<>
			<h4>상품 정보입니다</h4>
			<Outlet></Outlet>
		</>
	);
}
```
- 페이지 내부에 또다른 페이지 경로를 생성하는 것
- **페이지 전환**과 약간 다르다. **부모 페이지의 요소가 그대로 보이는 상태**에서 자식 페이지의 요소가 추가되는 형태
	- 자식 페이지의 요소를 어디에 보여줄지 `<Outlet>` 태그의 위치로 결정할 수 있다.
- [마치 동적 UI 구성과도 유사하다](https://mygumi.tistory.com/414)
	- 라우터를 사용해서 동적 UI를 구성하면, **뒤로가기 버튼을 이용 가능하다** 라는 장점이 생긴다.
	- 원하는 탭의 상태를 URL 로 구분하여 직접 접근이 가능해진다.
	- 컨텐츠 이외의 UI는 아무 영향없이 컨텐츠 영역만 교체할 수 있다.

#### 모듈 분리해서 중첩 라우팅 하기 (feat.v6)
#### 문제
- App.js 안에서 컴포넌트를 만들고 중첩 라우팅을 시도하면 잘 되는데, 모듈을 분리하면 페이지가 표시되지 않는 문제

#### 궁금증
1. 분리된 모듈에서 `“/“` 경로는 정확히 어떤 페이지를 가리키는가?
2. 분리된 모듈에서 <Routes> 내부에 <Route path=“/“> 가 필요한가?

#### 해결 및 결론
- App.js의 부모 Route에서 path에 와일드카드 `*` 사용하기
	- "뒤에 다른 요소가 붙어, **라우터로 이동한 페이지 내부에서 다시 다른 컴포넌트를 렌더링** 할 것임" 을 알려줌
- 분리된 모듈에서 `“/“` 경로는 <u>최상위 메인 페이지</u>가 **아니라**, <u>해당 모듈에서의 최상위 페이지</u>다.
```js
// 확인 코드 (Check.js)
function Event() {
	return (
		<>
			<h4>"/" 경로는 어디인가</h4>
			<Routes>
				<Route path="/" element={<div>현재 페이지를 가리키는가?</div>}/>
			</Routes>
		</>
	);
}
```
- `App.js` 에서 이 컴포넌트를 임포트해서 사용 중이라고 한다면, 위의 `<Route path="/" element={<div>현재 페이지를 가리키는가?</div>}/>` 요소는 `App.js` 의 메인 페이지를 가리키는 것이 아니라 본인( `Check.js` )의 최상위 메인 페이지를 가리킨다.
- 따라서 분리된 모듈의 `return` 문 내부에 바로 엘리먼트를 작성하는 것과, `<Route path="/">` 요소를 추가해서 그 안에 엘리먼트를 작성하는 것은 중복되므로 굳이 추가할 필요는 없는 듯하다.

## react-router-dom v6 내용 간단 정리
- 참고: [[React] react-router-dom v6 업그레이드 되면서 달라진 것들](https://velog.io/@soryeongk/ReactRouterDomV6)
- 현재 수준에서 필요한 부분만 발췌함. 추가 공부 후 완성된 글로 추가 정리 예정
#### 1. `Switch` 가 v6에서 `Routes`로 변경됨
- v5의 `exact` 옵션 삭제
	- `exact` 를 더이상 사용하지 않기 때문에 여러 라우팅을 매칭하고 싶은 경우 `URL 뒤에 *` 을 사용하는 와일드카드 문법이 등장한 것
- `component` 대신 `element` 로 바로 컴포넌트를 전달할 수 있음

#### 2. 중첩 라우팅 방식
- 방법 1) `App.js` 에서 중첩 라우터( `*` )를 사용하고, 중첩 라우터에서 `Outlet` 컴포넌트 사용
```jsx
// App.js
<Route path="web/*" element={<Module />}>
	<Route path="childroute" element={<childEl />} />
</Route>
```
```jsx
// Module.js
const Module = () => {
  return (
    <div>
      <h1>This is Module</h1>
      <Outlet />
    </div>
  );
};

export default Module;
```
- 위 코드와 같이 메인 페이지에서 **자식 태그** 로 중첩하는 라우터를 기재
	- exact 안 쓰는 대신 `/*` 가 필수!
- 분리된 모듈에서 `Outlet` 라이브러리를 통해 가져옴

#### 방법 2) `Outlet` 없이 곧바로 기재
```jsx
// App.js
<Route path="web/*" element={<Module />} />
```
```jsx
// Module.js
const Module = () => {
  return (
    <div>
      <h1>This is Module</h1>
	  <Routes>
      	<Route path="childroute" element={<childEl />} />
	  </Routes>
    </div>
  );
};

export default Module;
```
- 부모 루트에서 `Outlet` 없이 곧바로 `Routes` , `Route` 로 기재할 수 있다.