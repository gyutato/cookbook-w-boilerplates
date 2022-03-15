## To do list

- 투두리스트 구현
- json-server를 활용해서 로컬에 REST API 구축 및 연동
- 기본적인 데이터 처리인 생성, 읽기, 수정, 삭제(CRUD)를 구현

### `strict mode`

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode

- 엄격하게 문법 검사를 실시하여 기존에는 무시되던 오류를 발생시킴

### json-server

https://github.com/typicode/json-server

- 짧은 시간에 REST API를 구축해주는 패키지
- 실제 프로덕션에서는 사용하지 않음
- npm을 통해 설치 가능

```bash
npm install -g json-server
json-server --watch db.json
```

### REST API
- [API?](https://dev-dain.tistory.com/50)
	- 클라이언트와 서버가 대화하는 **규칙**
	- 데이터를 주고 받기 위한 방법과 그 규격
	> 📌 흔히 API를 레스토랑에 빗대어 표현하기도 한다.<br/>`손님(내가 만드는 프로그램)`이 자리에 앉아 `웨이터(API)`에게 주문을 한다. 그럼 웨이터는 내 주문 내역을 `주방(API 제공자. 기상청, 공공포탈 등)`에 갖다준다. 주방에서 요리를 해 웨이터에게 주면 웨이터가 다시 나에게 음식을 가져다준다. 웨이터가 손님의 주문을 주방으로 전달하는 매개체 역할을 하는 것이다. <br/> 여기서 `손님`은 **주방에서 무슨 일이 일어나는지 잘 모른다.** 대개는 관심도 없으며 관심을 가질 필요도 딱히 없다. 이것이 API의 장점이다. **내가 가져다쓰려는 API의 기능을 어떻게 구현하는지 몰라도 되고 난 그저 API가 갖다주는 걸 사용만 하면 된다는 것이다.** 시간과 노력을 동시에 아낄 수 있다. 이처럼 API는 처음부터 개발하거나 유지 보수할 필요가 없는 외부 데이터와 기능에 접속할 수 있게 해준다.

- **Representational State Transfer** API
	- `자원(RESOURCE)` - URI
	- `행위(Verb)` - HTTP Method(GET, POST, PUT, DELETE 등)
	- `표현(Representations)` - 응답, 결과
	- 간단히 말하면 **HTTP를 활용하여 CRUD를 실행하는 API**

### `DOMContentLoaded`

https://developer.mozilla.org/ko/docs/Web/API/Window/DOMContentLoaded_event

- 초기 HTML 문서를 완전히 불러오고 분석했을 때 발생하는 이벤트

```
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});
```

- 본 프로젝트에서는 HTML 코드가 전부 로드 된 후에 `getTodos()` 함수로 할 일 목록 데이터가 불러와지도록 사용함

### `getTodos`
- 본 프로젝트의 커스텀 함수로, Ajax와 Fetch API 사용을 위해 구현함

- 

### Ajax
- Asynchronous JavaScript And XML
- **페이지 전체를 새로고침 하지 않고서도 수행 되는 "비동기성"**
	- 이러한 비동기성을 통해 사용자의 Event가 있으면 전체 페이지가 아닌 일부분만을 업데이트 할 수 있게 된다.
	- 웹 페이지가 로드된 후에 서버로 데이터 요청을 보낼 수 있다.
	- 웹 페이지가 로드된 후에 서버로부터 데이터를 받을 수 있다.
	- 백그라운드 영역에서 서버로 데이터를 보낼 수 있다.

#### Javacript fetch API
- [AJAX 요청을 하기 위한 기술](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch)
```js
let promise = fetch(url, [options])
```
- `url` : 접근하고자 하는 URL
- `options` : 선택 매개변수, method나 header 등을 지정할 수 있음
	- `options` 에 아무것도 넘기지 않으면 요청은 `GET` 메서드로 진행되어 url로부터 콘텐츠가 다운로드 된다.

- fetch api의 response는 실제 json 이 아니다.
- 따라서 fetch api에서는 추가 메서드를 호출해 응답 본문을 받을 필요가 있다. (`.json()`)
  - axios는 이 과정을 자동으로 해주기 떄문에 바로 response를 받을 수 있다.
- body 데이터 타입은 헤더의 content-type 헤더와 일치해야 한다.

```js
var url = 'https://example.com/profile';
var data = {username: 'example'};

fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));

```

### HTML data-\*

https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/Use_data_attributes

- custom attibute를 만들 때 사용
- 표준이 아닌 속성이나 추가적인 DOM 속성

#### javascript에서 접근하기

- dataset 객체를 통해 data 속성을 가져오기 위해서는 속성 이름의 data- 뒷 부분을 사용
- 대시들은 camelCase로 변환되는 것에 주의

```
var article = document.getElementById('electriccars');

article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.parent // "cars"
```

#### javascript로 할당하기

```
var article = document.getElementById('electriccars');

article.dataset.columns = 3
article.dataset.indexNumber = "12314"
```
