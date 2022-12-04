import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import ArticleDetail from './components/ArticleDetail'
import Editor from './components/Editor'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import { loginReduxUser } from './reducers/userReducer'
import { getUserFromEmail } from './utils/firebaseFunctions'

function App() {
  const authentication = getAuth()
  const dispatch = useDispatch()

  const getUsersFromEmail = async (email, id) => {
    const user = await getUserFromEmail(email)
    console.log('user', user)
    dispatch(loginReduxUser({ ...user, email: email, id: id }))
  }

  useEffect(() => {
    authentication.onAuthStateChanged((user) => {
      if (user) {
        getUsersFromEmail(user.email, user.uid)
      } else {
        console.log('something wrong')
      }
    })
  }, [])

  return (
    <>
      <div className='relative pt-24 flex flex-col justify-center min-w-screen items-center min-h-screen overflow-hidden bg-slate-900'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/editor' element={<Editor />} />
          <Route path='/articles/:key' element={<ArticleDetail />} />
        </Routes>
      </div>
    </>
  )
}

export default App
