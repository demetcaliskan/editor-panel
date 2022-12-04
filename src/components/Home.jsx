import { useSelector } from 'react-redux'

const Home = () => {
  const user = useSelector((state) => state.user)
  return (
    <div>
      <h1 className='text-center text-white font-bold text-[42px]'>
        Welcome, {user?.name}
      </h1>
    </div>
  )
}

export default Home
