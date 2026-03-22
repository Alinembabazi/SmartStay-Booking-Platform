import { useState } from 'react'
import House from './components/House'
import Navbar from './components/Navbar'
function App() {
  return (
    <div className="App ">
      <Navbar />
       <h1 className='font-bold text-2xl items-center justify-center text-center m-6'>Welcome to Our Booking Platform</h1>
       <div className='flex'>
       <House />
         </div>
    </div>
  )
}
export default App
