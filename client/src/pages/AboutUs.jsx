import React from 'react'
import iitrpr from '/iitrpr.jpg'

const AboutUs = () => {
  return (
    <div className='flex flex-col items-center h-screen mt-24 bg-cover bg-center' style={{ backgroundImage: 'url(${iitrpr})'}}>
      <h1 className='text-9xl text-black'>About Us</h1>
      <p className='`text-7xl text-black mt-5 mb-5'>This portal is designed to shift the current on-paper process to a complete online mode.</p>
    </div>
  )
}

export default AboutUs