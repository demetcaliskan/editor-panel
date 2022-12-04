import { Routes, Route } from 'react-router-dom'
import ArticleDetail from './components/ArticleDetail'
import Editor from './components/Editor'
import Home from './components/Home'
import Login from './components/Login'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/editor' element={<Editor />} />
        <Route path='/articles/:key' element={<ArticleDetail />} />
      </Routes>
    </div>
  )
}

export default App
