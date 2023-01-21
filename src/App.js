import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import "./style.css";

/* BIG NOTE FOR REACT: Because React uses states, every time
a parameter of the state changes it runs the function attached.
So good practice is to always duplicate a state variable and
don't directly modify it. See toggleTodo. */

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  /* React uses what's called states. Basically, any time a state
    changes, it will re-render our App. So I had to add it to the
    import statement, and we're going to start it with an empty
    array (because it starts with 0 to-do's). Now, for the var
    declaration... you're looking at object destructuring. Basically
    the first component is the list of todos, and the second is the
    function it calls when the state changes. */
  const [todos, setTodos] = useState([]);
  /* Another thing React has is useRef(). Basically by importing it
    you can set an element in the HTML to have a ref (basically an id)
    that React can grab values from. So we're going to add a ref to 
    the input to get the todo name. */
  const todoNameRef = useRef();

  // NOTE: I MADE THIS SECOND, BUT IT HAS TO BE ABOVE THE NEXT useEffect
  // Now we're going to use a second useEffect to load our todos from
  // local storage. Now we only want to call this once, so if we send
  // an empty array as the second parameter, it'll only load once.
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos) setTodos(storedTodos);
  }, []);
  
  // useEffect is ran anytime certain properties change. We use this
  // so that we don't lose our todos on page reload. It takes two
  // parameters. The first is the function that runs any time the 2nd
  // parameter (an array of properties) changes. This will run our
  // useEffect function even if only one of the properties changes.
  useEffect(() => {
    // We're going to use the useEffect so save to local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    // Creating a copy of the state variable so I don't modify it
    const newTodos = [...todos];
    // Make a new variable out of the matching todo
    const todo = newTodos.find(todo => todo.id === id);
    // Change the todo.complete to toggle the checkbox
    todo.complete = !todo.complete;
    checkSelectedTodo(newTodos);
    // Set our todos to the newTodos variable
    setTodos(newTodos);
  }

  function checkSelectedTodo(todoList) {
    var todoSelected = false;
    todoList.forEach(todo => {
      if(todo.complete) todoSelected = true;
    });
    if(todoSelected) document.getElementById('clear-todo').classList.add('showing');
    else document.getElementById('clear-todo').classList.remove('showing');
  }


  function handleAddTodo(e) {
    // Calls the current value of the input and sets to name var.
    const name = todoNameRef.current.value;
    if(name === '') return;
    setTodos(prevTodos => {
      // We want to give a random ID number so we're going to use
      // a library called the UUID
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    })
    // After submitting, clear the input
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    checkSelectedTodo(newTodos);
    setTodos(newTodos);
  }
  
  return (
    /* So JavaScript can only return one element. So in order to
      return multiple things, we have to wrap it in an empty element
      (called a fragment) */
    <>
      {/* (this is how you do a comment in react) So the line below
        is calling in our TodoList object, but we can use 'props' to
        pass to the todo list before it returns. This is actually really
        similar to basic html, except that we've defined the function 
        (instead of say <button> we have a <TodoList>) and then we've
        defined the attributes (so instead of <button style=> we're
        saying <TodoList todos=>) */}
      <div className="container">
        <header>
          <h1>Todo List</h1>
          <button id='clear-todo' onClick={handleClearTodos}>Clear Todo(s)</button>
        </header>
        <div className='todo-container'>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
        <div className='addNew'>
          <input ref={todoNameRef} placeholder="Add New Todo..." type="text" />
          <button class='showing' onClick={handleAddTodo}>Add Todo</button>
        </div>
      </div>
    </>
  );
}

export default App;
