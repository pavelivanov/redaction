import React from 'react'
import actions from '../actions'


const AddTodo = () => {
  let input

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) return
          actions.todos.addItem(input.value)
          input.value = ''
        }}
      >
        <input ref={node => input = node} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

export default AddTodo
