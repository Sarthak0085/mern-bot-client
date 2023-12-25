import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Chat from './pages/Chat'
import { useAuth } from './context/AuthContext'
import Register from './pages/Register'

function App() {
  const auth = useAuth();

  return (
    <main>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {
          auth?.isLoggedIn && auth?.user &&
          <Route path='/chat' element={<Chat />} />
        }
        <Route path='*' element={<NotFound />} />
      </Routes>
   </main>
  )
}

export default App
