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