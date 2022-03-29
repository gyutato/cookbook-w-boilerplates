import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';
import TodoCreate from './components/TodoCreate';
import { TodoProvider, useTodoState, useTodoDispatch, useTodoNextId } from './TodoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export { TodoTemplate, TodoHead, TodoList, TodoItem, TodoCreate };
export { TodoProvider, useTodoState, useTodoDispatch, useTodoNextId };

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
