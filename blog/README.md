# CRA로 정적 블로그 제작하기
- tech stack: `React`, `JavaScript`

<br/>

## array, object 자료형의 state 수정
- array, object 자료형을 다룰 때는 원본 데이터를 직접 조작하는 것 보다 기존값은 보존해주는 방식이 권장된다.

#### state 변경 함수의 동작원리
- state 변경함수를 쓸 때 `기존state === 신규state` 이렇게 먼저 검사해본다.
	- 같으면 state 변경을 해주지 않는다. 

```js
function App(){
  
  let [title, settitle] = useState( ['남자코트 추천', '강남 우동맛집', '파이썬 독학'] );  
  
  return (
    <button onClick={ ()=>{ 
      let copy = title;
      copy[0] = '여자코트 추천';
      settitle(copy)
    } }> edit </button>
  )
}
```
- 위 코드에서, `기존state === copy` 비교해보면 **같다**고 나온다.
- 자바스크립트는 array/object 자료를 하나 만들면, 자료는 램 어딘가에 저장되고 **변수는 그 자료가 어디 있는지 가리키는 값만** 담겨있다.

```js
let arr = [1,2,3]
```

- `[1,2,3]` 자료는 램에 저장
- `let arr` 변수엔 그 자료가 어디있는지 가리키는 값(포인터 격)만 저장

```js
let data1 = [1,2,3];
let data2 = data1;
```

- data1과 data2는 각각 [1,2,3]을 별개로 저장하는게 아니라, **똑같은 값을 공유**
	- 즉 data1을 변경하면 data2도 자동으로 변경
- 변수에는 **주소**만 저장되므로!
- 즉 data1, data2는 같은 주소를 값으로 갖게 된다. 같은 자료를 가리키는 것.

> 📌 **배열이나 객체 등**, 자바스크립트에서 원시 자료형이 아닌 모든 것들은 참조 자료형(reference data type) 이다.<br/>
**참조 자료형**의 데이터는 `heap` 이라고 부르는 별도의 데이터 보관함에 저장되고, **변수에는 데이터가 저장된 메모리 상의 주소가 저장**된다.
원시 자료형과는 다르게 `heap` 안에 저장된 데이터는 원하는 대로 데이터 사이즈를 조정할 수 있다.

#### spread operator `...`
```js
// copy === title
let copy = title;
copy[0] = '여자코트 추천';
settitle(copy)

// copy != title
let copy = [...title];
copy[0] = '여자코트 추천';
settitle(copy)
```

- array나 object 자료형 왼쪽에 붙일 수 있으며 거의 괄호 벗기기용 연산자로 사용된다.
- `...[1,2,3]` 이렇게 쓰면 그 자리에 값 `1,2,3` 이 남는다.
	- array나 object 자료형을 복사할 때 많이 사용
- 완전 독립적인 array 복사본을 생성할 수 있다.

<br/>

## 컴포넌트

- **쉽게 말해, 길고 복잡한 html을 하나의 '부품' 처럼 떼어낸 것**
	- 반복적인 html 축약
	- 큰 페이지들
	- 자주 변경되는 것들
- 가독성이 향상된다: div, span 등 DOM 으로 작성되어 있는 부분이 의미가 뚜렷한 컴포넌트로 단축됨
- 컴포넌트 이름은 대문자로 시작한다.
- 컴포넌트 내부의 return 안에 내가 리턴하려는 html(DOM 구조)를 작성한다.
	- 여기서의 return도 역시 최상단에 하나의 태그만 존재해야 한다 (병렬 X)
- **단 다른 컴포넌트의 state를 바로 가져다 쓸 수 없다**
	- 당연하다. **다른 함수에 있던 변수를 다른 함수에서 마음대로 가져다 쓸 수 없다** 는 JS의 특성이 반영된다.

<br/>

## 동적 UI 만들기

1. html, css로 미리 디자인을 완성한다.
2. UI의 현재 **상태**를 state로 저장한다.
3. **state에 따라 UI가 어떻게 보일지 작성한다.**

```js
// 2. 현재 상태
let [modal, setmodal] = useState(false); 

// 1. 디자인
function Modal() {

  return (
    <div className="modal">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}
```

```js
setmodal(modal == true ? false : true) // 3. state에 따른 UI 보여주기
setmodal(!modal) // 위와 동일
```

<br/>

## `map()`
- 모든 array 형의 자료 뒤에 사용할 수 있는 메서드
- 인자로 콜백함수를 받는다:
```js
arr.map(callback(currentValue[, index[, array]])[, thisArg])
```
- 필수 인자: `callback()`
	- array 자료 갯수만큼 해당 콜백함수의 내용을 실행한다.
	- 콜백함수의 파라미터는 array 안에 있던 각각의 데이터(요소)다. 

```js
title.map((value, idx) => {return (
          <div className = "list">
            <h4>{value}</h4>
            <p>2월 1{idx}일 발행</p>
          </div>
        );})
```

- 반복문으로 html을 생성하면 key={html별로 고유한 값}를 추가해야 한다.

<br/>

## `<input>` 태그 알아보기
- `type`
	- `text`
	- `date`
	- `range` 등...
- `select` 등...
- `onChange`, `onInput` 이벤트 핸들러

#### 이벤트 객체
```js
onChange={(e) => {console.log(e.target)}}
```
- 이벤트가 발생하면, `이벤트 객체`는 동적으로 생성되어, 이벤트 핸들러에 인자로 암묵적으로 전달된다.
- DOM과 관련된 이벤트가 발생하면 관련 정보는 모두 이 `이벤트 객체`에 저장된다.
	- 이벤트 발생 요소, 이벤트 타입, 이벤트 관련 데이터도 저장된다.
- `e.target` : 이벤트가 발생한 html 태그
	- `e.target.value` : 이벤트가 발생한 html 태그에 입력한 값

#### 이벤트 버블링
- 특정 이벤트는 상위 html로 퍼진다.
- `e.stopPropagation();` 으로 해결

<br/>

## `class` 를 사용한 컴포넌트

```js
class Profile extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div>프로필입니다.</div>
		);
	}
}
```
- `state` 는 `constructor` 안에 작성한다.
	- `constructor` : `class` 의 변수/초기값을 저장할 때 사용
	- `this.state` 라는 변수에 전부 보관
- 꺼내쓸 때는 `this.state.state명`
- state를 변경할 땐 `this.setState()` 내장함수로만 가능
	- 신문법으로 만든 state 변경함수들은 아예 state를 바꿔치기해주는 역할
	- `setState()`는 객체 형태이기 때문에 필요한 부분만 수정하고 나머지는 건드리지 X
	- 1.state 복사본 만들고 2.수정하고 3.복사본을 집어넣는 절차가 필요없다.

#### 커스텀 함수와 `this`
- `constructor(){}` 와 `render(){}` 사이에 만든다.
- 필요한 자리에 `this.함수명` 형태로 사용한다.
	- **이 때 `bind` 없이는 에러가 발생할 수 있다.**
	- 자바스크립트에서 `function`을 쓴다면, **안에있는 `this`값은 항상 새롭게 재정의**된다.
	- 따라서 함수 안에 있던 `this`도 호출 시 **해당 위치에서 재정의**가 되어서 의도(context)와 다른 기능을 하게 된다.
	- `this`가 재정의되지 않으려면
		1. 함수를 쓸 때 `this.함수명.bind(this)` 사용하거나
		2. 함수를 `arrow function` 으로 선언

<br/>

## 간단하게 배포하기 (feat. Github Pages)
- state, JSX, 컴포넌트, props 같은 문법들은 브라우저가 해석할 수 없으니 그대로 배포할 수 없다.
- 이런 문법들을 전통적인 CSS, JS, HTML 문법으로 바꿔주는 작업이 필요하다.
	- 이것을 컴파일 또는 build라고 한다.
- 이 과정은 컴파일(트랜스파일)러와 번들러에 의해 수행된다.
```bash
# cra로 만든 프로젝트일 경우
npm run build


# The project was built assuming it is hosted at /.
# You can control this with the homepage field in your package.json.
# The build folder is ready to be deployed.
# You may serve it with a static server
```
- `babel`
	- JSX와 ES6+ 를 트랜스파일
- `Webpack` [(참고)](https://tecoble.techcourse.co.kr/post/2021-07-10-webpack-exercise/)
	- `엔트리 (Entry)` : 번들링을 시작하기 위한 최초 진입점 ( ex. `./src/index.js` ). 웹팩은 이 진입점으로부터 의존적인 모듈을 전부 찾아낸다. 
	- `아웃풋 (Output)` : 엔트리를 시작으로 의존되어 있는 모든 모듈을 하나로 묶어 하나의 결과물로 만들었다. 이 결과물이 위치하는 경로를 아웃풋이라고 한다.
	- `로더 (Loader)` : 웹팩은 모든 파일을 모듈로 본다. 하지만 웹팩은 자바스크립트 밖에 읽지 못한다. 그래서 HTML, CSS, Images, 폰트 등을 웹팩이 읽을 수 있게 변환해줘야 하는데, 이 역할을 하는 게 바로 로더이다.
	- `플러그인 (Plugin)` : 공식 문서에서는 로더가 할 수 없는 다른 작업을 수행한다고 설명하고 있다. 로더가 파일(모듈)을 해석하고 변환하는 과정에 필요한다면, 플러그인은 결과물(번들)에 추가적인 처리를 하고싶을 때 필요하다.
- 위 과정을 거치면 작업 프로젝트 폴더 내에 build 라는 폴더가 하나 생성된다. build 폴더 안에 안에 있는 내용을 모두 서버에 올리면 배포된다. 
	- index.html이 메인페이지다.

끝 