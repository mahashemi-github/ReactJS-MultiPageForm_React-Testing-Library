import { createContext, useState} from 'react'

export const DataContext = createContext({});

export const DataContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([])
  const [user, setUser] = useState('')
  const [followersList, setFollowersList] = useState([])

  return (
    <DataContext.Provider value={{ 
      todos, setTodos, 
      user, setUser,
      followersList, setFollowersList 
      }}>
      { children }
    </DataContext.Provider>
  )
}
