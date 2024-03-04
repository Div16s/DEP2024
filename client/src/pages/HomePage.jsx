import React from 'react'

const HomePage = () => {
  return (
    <div className='flex flex-col items-center'>
        <img src='dep-homepage.png' alt='Homepage' className='w-1500 h-1500 mt-4' />
        <div className='w-full max-w-4xl mt-8'>
            <h2 className='text-4xl text-black mb-4'>About</h2>
            <p className='text-xl text-gray-500'>
                Welcome to the Purchase Management Portal of IIT ROPAR. This portal is designedd to help in filling the  purchase management forms for purchasing any item in the institute by a faculty/Department.  Using this portal, you will be able to download a prefilled form, and also send it online for further procedures, thus making the process of purchasing items easier, faster and eco-friendly.
            </p>
        </div>
        <div className='w-full max-w-4xl mt-8'>
            <h2 className='text-4xl text-black mb-4'>Teams</h2>
            <div className='flex flex-wrap justify-center'>
                <div className='w-60 h-60 m-20'>
                    <img src='Doodhnath.jpeg' alt='Doodhnath Tiwari' className='w-64 h-64 rounded-full' />
                    <summary className='text-xl text-gray-700 text-center mt-2'>Doodhnath Tiwari</summary>
                    <p className='text-xl text-gray-700 text-center mt-2'>+91 6203 087 513</p>
                </div>
                <div className='w-60 h-60 m-20'>
                    <img src='Divyankar.jpeg' alt='Divyankar Shah' className='w-64 h-64 rounded-full' />
                    <summary className='text-xl text-gray-700 text-center mt-2'>Divyankar Shah</summary>
                    <p className='text-xl text-gray-700 text-center mt-2'>+91 95696 91304</p>
                </div>
                <div className='w-60 h-60 m-20'>
                    <img src='Niroopma.jpg' alt='Niroopma Verma' className='w-64 h-64 rounded-full' />
                    <summary className='text-xl text-gray-700 text-center mt-2'>Niroopma Verma</summary>
                    <p className='text-xl text-gray-700 text-center mt-2'>+91 77058 34401</p>
                </div>
                <hr></hr>
                <div className='w-60 h-60 m-20'>
                    <img src='Shashank.png' alt='Shashank Kumar' className='w-64 h-64 rounded-full' />
                    <summary className='text-xl text-gray-700 text-center mt-2'>Shashank Kumar</summary>
                    <p className='text-xl text-gray-700 text-center mt-2'>+91 7764 833 505</p>
                </div>
            </div>
        </div>
        <div className='w-full max-w-4xl mt-8'>
            <h2 className='text-4xl text-black mb-4'>FAQ</h2>
            <details className='bg-gray-100 p-4 rounded-lg'>
                <summary className='text-xl text-gray-900'>What is the purpose of the Purchase Management Portal?</summary>
                <p className='text-gray-750'>The Purchase Management Portal is designed to simplify the process of filling purchase management forms for purchasing any item in the institute by a faculty/Department. It allows users to download a prefilled form and send it online for further procedures, making the process easier, faster, and eco-friendly.</p>
            </details>
            <details className='bg-gray-100 p-4 rounded-lg'>
                <summary className='text-xl text-gray-900'>Who can use the Purchase Management Portal?</summary>
                <p className='text-gray-750'>The Purchase Management Portal can be used by any faculty or department in the institute to request the purchase of any item.</p>
            </details>
            <details className='bg-gray-100 p-4 rounded-lg'>
                <summary className='text-xl text-gray-900'>How do I access the Purchase Management Portal?</summary>
                <p className='text-gray-750'>The Purchase Management Portal can be accessed through the IIT ROPAR website. Simply navigate to the Purchase Management Portal page and log in with your institute credentials.</p>
            </details>
        </div>
    </div>
  )
}

export default HomePage