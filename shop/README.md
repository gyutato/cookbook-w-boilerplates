# 쇼핑몰 구현 프로젝트
- tech stack: JavaScript, React.js
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
