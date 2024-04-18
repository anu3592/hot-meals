import { useState } from 'react';
import img from '../img/frontPage.jpg';
import { Link } from 'react-router-dom';

const FrontPage = () => {
    return (
        <div className='relative w-full h-[550px] mb-1'>
            <div className='absolute w-full h-full bg-black/50 text-white'>
                <div className='flex flex-row justify-center items-center'>
                <h1 className='text-2xl m-2 cursor-pointer border-2 p-2 rounded-lg hover:opacity-50 max-sm:text-lg'><Link to='/addresturant'>Add resturant</Link></h1>
                <h1 className='text-2xl m-2 cursor-pointer border-2 p-2 rounded-lg hover:opacity-50 max-sm:text-lg'><Link to='/rlogin'>Resturant Login</Link></h1>
                <h1 className='text-2xl m-2 cursor-pointer border-2 p-2 rounded-lg hover:opacity-50 max-sm:text-lg'><Link to='/login'>User Login</Link></h1>
                <h1 className='text-2xl m-2 cursor-pointer border-2 p-2 rounded-lg hover:opacity-50 max-sm:text-lg'><Link to='/signup'>Register</Link></h1>
                </div>
                <h1 className='text-6xl giv ml-[50%] mt-[19%] max-sm:text-4xl'>HotMeals</h1>
                <p className='text-3xl ml-[25%] mt-3 max-sm:text-xl'>You are just one click away to your happy meal!</p>
            </div>
            <img src={img} className='h-full w-full object-cover'/>
        </div>
    )
}

export default FrontPage;