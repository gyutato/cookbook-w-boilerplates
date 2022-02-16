# 1. 프로젝트 시작 및 포맷팅

## 🌐 Create React App
```js
npx create-react-app tic-tac-toe
```
- `npx` : npm 5.2.0 함께 설치된 커맨드라인 명령어
	- 라이브러리가 최신인지 여부를 확인하여 최신 버전을 사용할 수 있게 한다.
- `create-react-app` 을 통해서 만든 리액트 프로젝트는 **노드 프로젝트**로, `node.js` 를 기반으로 한다.

<br/>

### 🔡 기본 명령어
- `npm start` : 개발 모드로, 로컬에서 프로젝트를 실행시킨다.
- `npm test`  : 테스트 모드
- `npm run build` : 프로덕션 빌드로, `build` 폴더에 저장된다.
	- 코드가 최적화(난독화) 되어 있어, 개발 모드와 달리 수정사항이 실시간으로 반영되지 않는다.
- `npm run eject` : create-react-app 에서 내 프로젝트(앱)을 꺼낸다. create-react-app의 가능 범위를 벗어난 세세한 환경 설정 등의 이유로 필요할 수 있음. (권장되지 않음)

<br/>

### 🔝 시작 코드 이해하기
- `src` 폴더 : 소스 코드가 들어있음
- `index.js` : 메인 진입점!
```js
...
import App from './App';

// id가 root인 DOM을 찾는다.
// 해당 DOM은 public 폴더에 생성되는 index.html의 body 태그 내부에 존재한다.
const root = ReactDOM.createRoot(document.getElementById('root'));

// 마치 main 함수와 같은 역할.
// <App /> 은 위에서 임포트된 대로 App.js 에서 불러와진다.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```
<br/>

### 🔄 CRA 트랜스파일
- **`webpack` 사용**
	- 프로젝트 내에 임포트된 수많은 파일들을 각기 파일 확장자에 맞는 `loader` 에게 위임한다.
	- ex. `.jsx` 파일은 `babel`(loader) 에 의해 트랜스파일되어야 한다.

<br/>

## 🎨 ESLint
- JS, JSX 파일의 코드 컨벤션을 통일하는 데 사용될 수 있다.
```bash
npm init -y # 또는 yarn init -y
npm install eslint -d
npx eslint --init
```
- `.eslintrc.js` 파일에서 코딩 룰을 설정할 수 있다.
	- ex. `semi` : 세미콜론 입력 관련 룰
	- 각 룰은 공식문서에 자세하게 설명되어 있다.

```bash
npx eslint index.js # 커맨드라인으로 확인
npx eslint index.js --fix # 자동으로 수정
```
- vscode 익스텐션으로 간편하게 확인 가능하다.

<br/>

## 🎨 Prettier
- "An **opinionated** code formatter"
	- '주관을 가진' 코드 포매터?
```bash
npm i prettier -D # 런타임(배포)에 쓸 일은 없는 도구들
npx prettier index.js
npx prettier index.js --write # 수정사항 바로 반영
```
- `.prettierrc.json` 파일로 원하지 않는 룰을 설정할 수 있음
- ESLint 설정과 충돌할 수 있다
	- `eslintconfig` 의 `extends` 에 `prettier` 를 추가해 주면 충돌을 방지할 수 있다.

<br/>

# 2. 리액트 기본

## `useState`
- `Destructuring` 문법
```js
// let num = [1, 2];
// let a = num[0];
// let b = num[1];

let [a, b] = [1, 2];
```

#### 🧐 `state` 를 왜 써야 할까?
- 일반 변수는 갑자기 변경되면 html에 자동으로 반영되지 않는다.
- **state는 갑자기 변경되면 해당 state를 쓰던 html이 <u>자동 재렌더링</u>된다.**
	- 즉, **변경될 일이 잦은 요소**를 state에 저장하는 것이 효과적이다.

## state 변경 함수
- useState 함수는 두 개의 인자를 리턴한다. 두 인자란 1) state 값과 2) **state 변경 함수**다. 
- state는 이 변경 함수에 의해서만 변경될 수 있다 (그래야만 한다). 이 변경 함수는 인자로 **대체될 state의 값** 을 받는다. 
	- 말 그대로 함수의 인자이므로 **대입 연산자** 등의 표현식은 들어갈 수 없다.
- 기존 state와 신규 state를 비교해서, 기존 == 신규일 경우 수정해주지 않는다. (당연)
	- 문제가 되는 건, **배열을 다른 변수에 저장할 때**다.
```js
let arr = [1, 2, 3];
```
- 여기서 arr 의 값은 [1, 2, 3]이 아니다. 배열 [1, 2, 3]은 메모리 어딘가에 저장되어 있고, arr에 저장된 건 그 배열의 **주소**다. 마치 포인터 같은 것.
```js
let arr = [1, 2, 3];
let newArr = arr;
arr[0] = 4;
newArr[2] = 6;
```
- 여기서 newArr와 arr의 값은 같다.
- **arr[0] = 4 라고 업데이트했지만, 여전히 arr의 값은 변함이 없다.**
- newArr[2] = 6 으로 newArr의 값을 변경했지만, arr[2] 로 확인해 보면 그 역시 바뀌어 있다.
- **array, object는 reference data type이기 때문이다.**

<br/>

## 이벤트 핸들러
- 핸들러로는 반드시 함수가 들어와야 한다.
	- console.log 등 JS 메소드를 바로 적어줄 수는 없다. 하지만 중괄호 내부에 바로 `function{}()` 또는 `() => {}` 등 함수를 만들어주는 건 가능하다.

