import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authUserTokens, loginReduxUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../utils/firebaseFunctions'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginFunction = async () => {
    const response = await loginUser(email, password)
    dispatch(
      loginReduxUser({
        id: response?.user?.uid,
        name: response?.user?.displayName,
        email: response?.user?.email,
      })
    )
    navigate('/')
  }

  return (
    <div className='w-full p-6 m-auto bg-slate-400 rounded-md shadow-md lg:max-w-xl'>
      <h1 className='text-3xl font-semibold text-center text-slate-700'>
        Login
      </h1>
      <div className='mt-6'>
        <div className='mb-2'>
          <label
            for='email'
            className='block text-sm font-semibold text-gray-800'
          >
            Email
          </label>
          <input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            className='block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>
        <div className='mb-2'>
          <label
            for='password'
            className='block text-sm font-semibold text-gray-800'
          >
            Password
          </label>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            className='block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>
        <span className='text-xs text-slate-600 hover:underline'>
          Forget Password?
        </span>
        <div className='mt-6'>
          <button
            onClick={async () => loginFunction()}
            className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-slate-700 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600'
          >
            Login
          </button>
        </div>
      </div>

      <p className='mt-8 text-xs font-light text-center text-gray-700'>
        {' '}
        Forget your password?{' '}
        <span className='font-medium text-slate-600 hover:underline'>
          Reset
        </span>
      </p>
    </div>
  )
}

export default Login
