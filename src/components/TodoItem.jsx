import { useEffect, useRef, useState } from 'react'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing) inputRef.current.focus()
  }, [isEditing])

  function save() {
    if (draft.trim()) onEdit(todo.id, draft)
    else setDraft(todo.text)
    setIsEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') save()
    if (e.key === 'Escape') {
      setDraft(todo.text)
      setIsEditing(false)
    }
  }

  return (
    <div
      className={`flex items-center gap-2 border rounded p-3 mb-2 ${todo.done ? 'bg-green-50' : ''}`}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded px-2 py-1"
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={`flex-1 cursor-pointer ${todo.done ? 'line-through text-gray-400' : ''}`}
        >
          {todo.text}
        </span>
      )}
      <button onClick={() => onToggle(todo.id)} className="px-2 text-green-600">✓</button>
      <button onClick={() => onDelete(todo.id)} className="px-2 text-red-600">✕</button>
    </div>
  )
}

export default TodoItem
