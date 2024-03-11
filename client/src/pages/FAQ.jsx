import React from 'react'

const HelpCenter = () => {
  return (
    <div className='flex flex-col items-center h-screen mt-24'>
      <p className='text-7xl text-black mt-8 mb-10'>Help Center</p>
      <details className='bg-gray-100 p-4 rounded-lg'>
                <summary className='text-3xl text-gray-900'>What is the purpose of the Purchase Management Portal?</summary>
                <p className='text-gray-750'>The Purchase Management Portal is designed to simplify the process of filling purchase management forms for purchasing any item in the institute by a faculty/Department. It allows users to download a prefilled form and send it online for further procedures, making the process easier, faster, and eco-friendly.</p>
            </details>
            <details className='bg-gray-100 p-4 rounded-lg'>
                <summary className='text-3xl text-gray-900'>Who can use the Purchase Management Portal?</summary>
                <p className='text-gray-750'>The Purchase Management Portal can be used by any faculty or department in the institute to request the purchase of any item.</p>
            </details>
            <details className='bg-gray-100 p-4 rounded-lg'>
                <summary className='text-3xl text-gray-900'>How do I access the Purchase Management Portal?</summary>
                <p className='text-gray-750'>The Purchase Management Portal can be accessed through the IIT ROPAR website. Simply navigate to the Purchase Management Portal page and log in with your institute credentials.</p>
            </details>
    </div>
  )
}

export default HelpCenter