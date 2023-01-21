import React from 'react'

// We need to return a 'todo' and a 'toggleTodo' to each todo. 
export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }
  
  return (
    <div className='line'>
      <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
      {todo.name}
    </div>
  )
}
