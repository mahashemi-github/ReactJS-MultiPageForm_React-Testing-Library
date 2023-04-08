import { Link, Outlet} from 'react-router-dom'
import ToDoForm from './ToDoForm'
import ToDoItem from './ToDoItem'
import { DataContext } from '../context/DataContext'
import { useState, useContext } from 'react'
import Followers from './Followers'

const URL_FOLLOWERS = 'http://localhost:8000/followerss'

const ToDoList = () => {
  const { todos, setFollowersList } = useContext(DataContext)
  const [followersToggle, setFollowersToggle] = useState(false)

  const calcNumberOfIncompletedTasks = () => {
      let count = 0;
      if(todos) {
          todos.forEach(todo => {
              if(!todo.completed) count++
          })
       }
      return count
  }
  const numberOfRemainedTasks =  calcNumberOfIncompletedTasks()

  const followersDataFetch = async () => {   
    if(!followersToggle){
      try {
          const response = await fetch(URL_FOLLOWERS)
          const json = await response.json() 
      
          if(response.ok) {
          setFollowersList(json)
          }        
      } catch(err) {
          if(err.message === 'Failed to fetch') {
          throw new Error('There was a problem loading data from the database.');
          }
          throw new Error('There was a problem loading data from the database.');
      }   
      setFollowersToggle(true)
    } else {
      setFollowersList([])
      setFollowersToggle(false)
    }
  }

  return (
    <div className='todos-page'>
      <div className="todo-container">
        <ToDoForm />
        <div className="todo">
          {/* <h2>To-Dos</h2> */}
          <table>
            <thead>
              <tr>
              <th>Task</th>
              <th>Time Interval</th>
              <th></th>
              </tr>
            </thead>
            {todos && todos.map((todo, index) => (
              <ToDoItem todo={todo} index={index} key={index} />
            ))}
          </table>
          <span className="number-of-tasks">
            {numberOfRemainedTasks} {(numberOfRemainedTasks === 1 || numberOfRemainedTasks === 0) ? 'task ' : 'tasks '} 
            left</span>
        </div>
      </div>
      <button 
      id='followers-btn'
      className={followersToggle ? 'activee' : ''}
      onClick={followersDataFetch}>Followers
      {/* <Link to='followers' className={followersToggle ? 'activee' : ''} onClick={followersDataFetch}>Followers</Link> */}
      </button>
      <Followers />
    </div>
  )
}
 
export default ToDoList