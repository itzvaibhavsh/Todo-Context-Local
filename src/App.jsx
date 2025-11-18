import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoProvider } from './contexts'
import { TodoForm, TodoItem } from './components/index'

function App() {
  const [todos, setTodos] = useState([])
  // this add todo is used to change the state by using the object it got from TodoForm.jsx
  const addTodo = (todo) => {   // as we didn't need to return something, we just needed to update the state, that's why we didn't use return value
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])  //prev is an array, todo is an object
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? todo : prevTodo))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id != id)) // in deletion from arrays generally prefer filter as it works on true statement
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  // function on loading might have some todos stored in local storage. on loading we should be shown those. useEffect will query with local storage, take the todos and update it in todos of useState on loading.
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    // we have converted this to JSON but ultimately its an array so we checked length.
    // we are using setTodos only in case todos exist, because if not we don't need to setTodo because by default it is an empty array
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])
  // we want that if any change happens in todos array, we want to store it in localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/*Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {
              todos.map((todo) => (   // map must return a JSX element each time as not reutrning would mean undefined and nothing would be present in UI
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
