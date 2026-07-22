import React, { useContext } from 'react'
import { GlobalContext } from '../Context/Context'

const Home = () => {
    const {state}=useContext(GlobalContext)
    console.log("State" , state)

  return (
    <div>
        {state.user.Firstname} {state.user.Lastname}
    </div>
  )
}

export default Home