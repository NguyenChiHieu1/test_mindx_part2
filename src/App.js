import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import axios from 'axios';

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import "./styles/styles.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Fetch todos from local storage or an API if needed
    // Example using local storage
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    // Save todos to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task) => {
    setTodos([...todos, { id: Date.now(), task, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearTodos = () => {
    setTodos([]);
  };

  const filterTodos = () => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "complete":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <Router>
      <div className="all_in">
        <h1># Todo App</h1>
        
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="button_active">
                  <button onClick={() => setFilter("all")}>All</button>
                  <button onClick={() => setFilter("active")}>Active</button>
                  <button onClick={() => setFilter("complete")}>
                    Complete
                  </button>
                </div>
                <hr />
                <TodoForm addTodo={addTodo} />
                <TodoList
                  todos={filterTodos()}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />

                {/* <div>
                  <button onClick={clearTodos}>Clear All</button>
                </div> */}
              </>
            }
          />
        </Routes>
        
      </div>
    </Router>
  );
};

export default App;
