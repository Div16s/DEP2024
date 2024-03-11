import React from 'react'
import {Link} from 'react-router-dom'


const HomePage = () => {
  return (
    <div className='flex flex-col items-center'>
        <img src='iitrpr.jpg' alt='Homepage' className='w-3000 h-3000 mt-4 mb-8' />
        <br></br>
        <br></br>
        <br></br>
        <p className='text-8xl text-black mt-8 mb-10'>Welcome to our Portal!</p>
        <p className='text-5xl text-black mt-5 mb-5'>This portal is designed to shift the current on-paper process to a complete online mode.</p>
        <p className='text-5xl text-black mt-5'><Link to='/AboutUs'className='text-blue-600'>To learn more, visit our AboutUs section.</Link></p>
        <br></br>
        <br></br>
        <br></br>
        <div className='w-full max-w-4xl mt-8'>
            <h2 className='text-8xl text-black mt-8 mb-10'>Teams</h2>
            <div className='flex flex-wrap justify-center'>
                <div className='w-100 h-100 m-20'>
                    <img src='Doodhnath.jpeg' alt='Doodhnath Tiwari' className='w-64 h-64 rounded-full' />
                    <summary className='text-3xl text-black-700 text-center mt-2'>Doodhnath Tiwari</summary>
                    <p className='text-3xl text-black-700 text-center mt-2'>+91 6203087513</p>
                </div>
                <div className='w-60 h-60 m-20'>
                    <img src='Divyankar.jpeg' alt='Divyankar Shah' className='w-64 h-64 rounded-full' />
                    <summary className='text-3xl text-black-700 text-center mt-2'>Divyankar Shah</summary>
                    <p className='text-3xl text-black-700 text-center mt-2'>+91 9569691304</p>
                </div>
                <div className='w-60 h-60 m-20'>
                    <img src='Niroopma.jpg' alt='Niroopma Verma' className='w-64 h-64 rounded-full' />
                    <summary className='text-3xl text-black-700 text-center mt-2'>Niroopma Verma</summary>
                    <p className='text-3xl text-black-700 text-center mt-2'>+91 7705834401</p>
                </div>
                <hr></hr>
                <div className='w-60 h-60 m-20'>
                    <img src='Shashank.png' alt='Shashank Kumar' className='w-64 h-64 rounded-full' />
                    <summary className='text-3xl text-black-700 text-center mt-2'>Shashank Kumar</summary>
                    <p className='text-3xl text-black-700 text-center mt-2'>+91 7764833505</p>
                </div>
            </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className='w-full max-w-4xl mt-8'>
            <p className='text-6xl text-black mt-8 mb-10'>Have some questions?</p>
            <p className='text-6xl text-black mt-8 mb=10'><Link to='/FAQ'className='text-blue-600'>Visit our Help Center</Link></p>
        </div>
    </div>
  )
}

export default HomePage