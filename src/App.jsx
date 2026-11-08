import { useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [todos, setTodos] = useLocalStorage('todos', [])
  const [currentFilter, setCurrentFilter] = useState('all')

  function addTodo(text) {
    setTodos([...todos, { id: Date.now(), text, done: false }])
  }

  function toggleTodo(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id))
  }

  function clearDone() {
    setTodos(todos.filter((t) => !t.done))
  }

  function editTodo(id, newText) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: newText } : t)))
  }

  const doneCount = todos.filter((t) => t.done).length

  const visibleTodos = todos.filter((t) => {
    if (currentFilter === 'active') return !t.done
    if (currentFilter === 'done') return t.done
    return true
  })

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Work</h1>

      <TodoForm onAdd={addTodo} />

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setCurrentFilter('all')}
          className={`px-3 py-1 rounded border ${currentFilter === 'all' ? 'bg-blue-600 text-white' : ''}`}
        >
          Баары
        </button>
        <button
          onClick={() => setCurrentFilter('active')}
          className={`px-3 py-1 rounded border ${currentFilter === 'active' ? 'bg-blue-600 text-white' : ''}`}
        >
          Аткарылбаган
        </button>
        <button
          onClick={() => setCurrentFilter('done')}
          className={`px-3 py-1 rounded border ${currentFilter === 'done' ? 'bg-blue-600 text-white' : ''}`}
        >
          Аткарылган
        </button>
      </div>

      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-600">
          Бардыгы: {todos.length}, аткарылды: {doneCount}
        </p>
        {doneCount > 0 && (
          <button onClick={clearDone} className="text-sm text-red-600 hover:underline">
            Аткарылгандарды өчүрүү
          </button>
        )}
      </div>

      {todos.length === 0 && <p className="text-gray-500">No work</p>}

      {visibleTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      ))}
    </div>
  )
}

export default App