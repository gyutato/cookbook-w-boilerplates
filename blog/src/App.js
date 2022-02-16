/*eslint-disable*/

import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {

  let [title, settitle] = useState(['리액트 기본', 'state란?', 'jsx란?']);
  let [like, setlike] = useState(0);
  let alter = ['리액트 심화', 'state란?', 'jsx란?'];

  function addLike() {

  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4>블로그</h4>
      </div>
      <div className="list">
        <h4>
          {title[0]} 
          <span onClick={() => {setlike(like + 1)}}>👍</span> {like} 
          <button onClick={() => {settitle(alter)}}>다른 글?</button>
        </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{title[1]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{title[2]}</h4>
        <p>2월 17일 발행</p>
      </div>
    </div>
  );
}

export default App;
