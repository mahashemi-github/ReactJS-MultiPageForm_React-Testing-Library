import {
  BrowserRouter, 
  Route, 
  Routes
} from 'react-router-dom'

// layouts import
import RootLayout from './layouts/RootLayout'

// pages import
import ToDoList from './pages/ToDoList'
import Followers from './pages/Followers'
import SubscriptionForm from './pages/SubscriptionForm'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout />}> 
            <Route index element={<SubscriptionForm />} />
            <Route path='todos' element={<ToDoList />} > 
              <Route path='followers' element={<Followers />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
