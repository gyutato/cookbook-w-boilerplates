/*eslint-disable*/

import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {

  let [title, settitle] = useState(['리액트 기본', 'state란?', 'jsx란?']);
  let [like, setlike] = useState(title.map(() => {return 0;}));
  let [modal, setmodal] = useState(false);
  let [clicked, setclicked] = useState(null);

  return (
    <div className="App">
      <div className="black-nav">
        <h4>블로그</h4>
      </div>
      {
        title.map((value, idx) => {return (
          <div className = "list">
            <h4 onClick={() => {setmodal(!modal); setclicked(idx);}}>{value} 
              <span  onClick={() => {
                let copy = [...like];
                copy[idx] += 1;
                setlike(copy)}}>👍</span> 
              {like[idx]}
            </h4>
            <p>2월 1{idx}일 발행</p>
          </div>
        );})
      }
      {
        modal == true ? <Modal title={title} settitle={settitle} clicked={clicked}/> : null
      }
      <div className="btns">
        <button onClick={() => {let sort = [...title].sort(); settitle(sort)}}>가나다순 정렬</button>
      </div>
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.title[props.clicked]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={() => {
        let copy = [...props.title];
        copy[props.clicked] = '리액트 심화';
        props.settitle(copy)}}>글 수정</button>
    </div>
  );
}

export default App;
