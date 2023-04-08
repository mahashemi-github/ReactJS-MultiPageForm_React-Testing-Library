import { DataContext } from '../context/DataContext'
import { useContext } from 'react'

const ToDoItem = ({ todo, index }) => {
  const { todos, setTodos } = useContext(DataContext)
  // const id = todo.id;
  console.log(index,'ppp')

  const handleClick = async () => {
    const newTodosArray = todos.filter(key => key !== todo)
    setTodos(newTodosArray)
  }

  const updateTask = (id) => {
    let updatedTasks = todos.map((todo) => {
        if(todo.id === id) {
            todo.completed = !todo.completed;
            return todo
        } else {
            return todo
        }
    })
    setTodos(updatedTasks)
}

  return (
    <tbody>
    <tr 
      className="todo-details"
      data-testid={`todo-item-${index}`} 
    >      
      <td 
      className={`${todo.completed && "todo-item-done"}`}
      onClick={() => updateTask(todo.id)}
      >{todo.task}</td>
      <td 
      className={`${todo.completed && "todo-item-done"}`}
      onClick={() => updateTask(todo.id)}
      >{todo.timeinterval}</td>
      <td>
        <span className='delete' onClick={handleClick}>delete</span>
      </td>
    </tr>
    </tbody>
  )
}

export default ToDoItem