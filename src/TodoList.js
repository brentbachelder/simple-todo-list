// When you have the ES7 / React Redux plugin installed, you can
// just type 'rfc' and it creates the import statement and the
// function to export back to our App.js
import React from 'react';
import Todo from './Todo';

export default function TodoList({ todos, toggleTodo }) {
  return (
    todos.map(todo => {
        // We're mapping each of the todos in the todos array, and
        // with each one we're creating a "Todo" object and passing
        // it the current todo in the array. Now React needs each
        // object to have it's own identity, so you can run it with-
        // out a 'key' component, but it will console an error. By
        // passing the 'key={todo.id}', we're giving each 'Todo' a
        // unique key. Also React then only has to update keys that
        // have changed (not all in the array).
        return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
    })
  )
}
