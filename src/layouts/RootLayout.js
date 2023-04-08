import { Outlet, Link, useNavigate  } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import { useContext } from 'react'

const RootLayout = () => {
  const { user, setUser } = useContext(DataContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    setUser('')
    navigate('/')   
  }

  return ( 
    <div className="root-layout">
      <header>
        <h2>MyNoteBook</h2>
        {!user && <Link className="subscriptionbtn" to='/'>Subscription </Link>}
        {user && <button onClick={handleLogout}>Log out</button>}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
 
export default RootLayout