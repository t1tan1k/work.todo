import { useState } from "react"

function TodoForm( {onAdd} ) {
    const [text,setText]=useState('')

    function handleSubmit(e){
        e.preventDefault()
        if(!text.trim()) return
        onAdd(text)
        setText('')
    }
  return (
    <form onSubmit={handleSubmit} className='flex gap-2 mb-4'>
        <input 
        type="text" 
        placeholder='new name'
        value={text}
        onChange={(e)=> setText(e.target.value)}
        className='border rounded px-3 py-2 flex-1'
        />
        <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>Submit</button>
    </form>
  )
}

export default TodoForm
