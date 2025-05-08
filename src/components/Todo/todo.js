import React, { useState } from 'react';
import './todo.css';

function TodoItem({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo-app__todo-item"
      style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
    >
      <div className="todo-app__todo-text">{todo.text}</div>
      <div className="todo-app__todo-buttons">
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>Delete</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <div className="todo-app__form-container">
      <form onSubmit={handleSubmit} className="todo-app__form">
        <input
          type="text"
          className="todo-app__input"
          placeholder="Add todo..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="todo-app__add-button">Add</button>
      </form>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { text: 'Make posters', isCompleted: false },
    { text: 'do complete blind art', isCompleted: false },
    { text: 'Share with friends', isCompleted: false },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text, isCompleted: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="todo-app__layout">
      <div className="todo-app__left-container">
        <h1 className="todo-app__title">Todo List</h1>
        <TodoForm addTodo={addTodo} />
      </div>
      
      <div className="todo-app__right-container">
        <div className="todo-app__list">
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;