import React from 'react'
import MenWatch from "../assets/imagesjs/MenWatchpng.jpg"
import WomenWatch from '../assets/imagesjs/WomenWatch.png'





const MainBar2 = () => {
  return (
  
    <div className=' bg-white rounded-3xl'>
        <div className='bg-black text-center  w-full h-20 flex items-center justify-center font-extrabold text-white'>
            <h2>Buy one, get one 50% off** | code: BOGO_50</h2>
        </div>
          <div className='bg- flex  w-full p-10 justify-around rounded-4xl border-t-gray-300'>
        <div className=' bg-amber-50 p-4 rounded-4xl'>
            <img className='h-98 rounded-4xl' src={MenWatch} alt="" />
        </div>
        <div className='bg-amber-50 p-4 rounded-4xl'>
  <img  className='h-98 rounded-4xl' src={WomenWatch} alt="" />
        </div>
    </div>
    </div>
       
  )
}

export default MainBar2