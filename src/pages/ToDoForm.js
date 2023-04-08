import { useState } from 'react'
import { DataContext } from '../context/DataContext'
import { useContext } from 'react'
import { v4 } from "uuid"

const ToDoForm = () => {
  const { todos, setTodos } = useContext(DataContext)

  const [task, setTask] = useState('')
  const [timeinterval, setTimeinterval] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const todo = {id: v4(), task: task, timeinterval: timeinterval, completed: false}
      setTodos([...todos, todo])
      setTask('')
      setTimeinterval('')
  }

  return (
    <div className="todo-form">
      {/* <h3>Add a New Task</h3> */}
      <form onSubmit={handleSubmit}> 
        <label htmlFor='task'>Task:</label>
        <input 
          type="text"
          id='task' 
          name='task'
          required
          autoComplete='off' 
          value={task}
          onChange={(e) => setTask(e.target.value)} 
          />
        <label htmlFor='timeinterval'>Timeinterval:</label>
        <input 
          type="text" 
          id='timeinterval' 
          name='timeinterval'
          required
          autoComplete='off' 
          onChange={(e) => setTimeinterval(e.target.value)} 
          value={timeinterval}
        />
        <button>Add Task</button>
      </form>
    </div>
  )
}

export default ToDoForm