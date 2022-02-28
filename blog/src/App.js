/*eslint-disable*/

import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import React from 'react';

function App() {

  let [title, settitle] = useState(['리액트 기본', 'state란?', 'jsx란?']);
  let [like, setlike] = useState(title.map(() => {return 0;}));
  let [modal, setmodal] = useState(false);
  let [clicked, setclicked] = useState(null);
  let [newTitle, setNewTitle] = useState('');

  return (
    <div className="App">
      <div className="black-nav">
        <h4>블로그</h4>
      </div>
      {
        title.map((value, idx) => {return (
          <div className = "list">
            <h4 onClick={() => {setmodal(!modal); setclicked(idx);}}>{value} 
              <span onClick={(e) => {
                e.stopPropagation();
                let copy = [...like];
                copy[idx] += 1;
                setlike(copy)}}>👍</span> 
              {like[idx]}
            </h4>
            <p>2월 1{idx}일 발행</p>
            <button onClick={() => {
              let copy;
              copy = [...title];
              copy.splice(idx, 1);
              settitle(copy);
            }}>🗑</button>
          </div>
        );})
      }
      {
        modal == true ? <Modal title={title} settitle={settitle} clicked={clicked}/> : null
      }
      <div className="newArticle">
        <input type="text" onChange={(e) => {setNewTitle(e.target.value)}}/>
        <button onClick={() => {
          let copy;
          copy = [...title];
          copy.unshift(newTitle);
          settitle(copy);
        }}>발행</button>
      </div>
      <div className="btns">
        <button onClick={() => {let sort = [...title].sort(); settitle(sort)}}>가나다순 정렬</button>
      </div>
      <Profile />
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

class Profile extends React.Component {
	constructor() {
		super();
    this.state = {
      lstname : 'Lee',
      firstname: 'Gyuwon',
    }
	}
	render() {
		return (
    <div>
			<h3>프로필입니다.</h3>
      <p>저는 {this.state.firstname} 입니다.</p>
    </div>
		);
	}
}

export default App;
