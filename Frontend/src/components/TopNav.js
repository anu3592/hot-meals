import React, { useEffect, useState } from 'react'
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose, AiFillTag } from 'react-icons/ai'
import { BsFillCartFill, BsPerson } from 'react-icons/bs'
import { TbTruckReturn } from 'react-icons/tb'
import { FaUserFriends, FaGoogleWallet } from 'react-icons/fa'
import { MdHelp, MdOutlineFavorite } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { keyValue } from './action'
import { useDispatch } from 'react-redux';
function TopNav() {
    const dispatch = useDispatch();
    const [sideNav, setSideNav] = useState(false)
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [admin, setAdmin] = useState(false);
    let token = localStorage.getItem('tokenR');

    useEffect(() => {
        let user = localStorage.getItem('admin');
        token = localStorage.getItem('tokenR');
        if (user) {
            setAdmin(true);
        }
    })

    const logout = () => {
        localStorage.clear();
        navigate('/front');
    }

    const openCart = () => {
        navigate('/cart');
    }

    const getFood = () => {
        localStorage.setItem("search", search);
        setSearch('');
    }
    console.log(sideNav);
    return (
        <div className='max-w-[1520px] mx-auto flex justify-between items-center p-4'>
            <div className='flex items-center'>
                {(!token)?
                <div onClick={() => setSideNav(!sideNav)} className='cursor-pointer'>
                    <AiOutlineMenu size={25} />
                </div>:<></>
                }
                <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>Hot
                    <span className='font-bold text-orange-700'>Meals</span>
                </h1>
                <div className='hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]'>
                    <p className='bg-orange-700 text-white rounded-full p-2 text-bold'>Free</p>
                    <p className='p-2 text-bold'>Delivery</p>
                </div>
            </div>
            {(!token)?
            <div className='bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]'>

                <input className='bg-transparent p-2 w-full focus:outline-none' type='text' placeholder='search meals' value={search} onChange={(e) => setSearch(e.target.value)} />
                <Link to="/item"><AiOutlineSearch size={25} onClick={getFood} className='cursor-pointer' /></Link>
            </div>:<></>
}
            <button className='border-2 border-orange-300 text-orange-300 rounded-md p-2 hover:bg-orange-300 hover:text-white' onClick={logout}>
                Logout</button>
                {(!token)?
            <button className='bg-orange-700 text-white hidden md:flex items-center py-2 rounded-full' onClick={openCart}>
                <BsFillCartFill size={20} />Cart
            </button>:<></>
}
            {
                sideNav ? (
                    <div className='bg-black/60 fixed w-full h-screen z-10 top-0 left-0'
                        onClick={() => setSideNav(!sideNav)}>
                    </div>
                ) : ("")
            }
            <div className={
                sideNav ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-200"
                    : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-200"
            }>
                <AiOutlineClose onClick={() => setSideNav(!sideNav)} size={25}
                    className='absolute right-4 top-4 cursor-pointer' />
                <h2 className='text-2xl p-4'>Hot <span className='text-orange-700 font-bold'>Meals</span></h2>
                <nav>
                    <ul className='flex flex-col p-4 text-gray-900'>
                        {admin ?
                            <Link to='/dashboard'><li className='text-xl py-4 flex cursor-pointer' onClick={()=>setSideNav(!sideNav)}>
                                <BsPerson size={25}
                                    className='mr-4 text-white bg-orange-500 rounded-full'
                                />
                                Admin Dashboard
                            </li></Link> :

                            <li className='text-xl py-4 flex cursor-pointer'>
                                <BsPerson size={25}
                                    className='mr-4 text-white bg-orange-500 rounded-full'
                                />
                                My Account
                            </li>
                        }
                        <li className='text-xl py-4 flex cursor-pointer'>
                            <TbTruckReturn size={25}
                                className='mr-4 text-white bg-orange-500 rounded-full'
                            />
                            Delivery
                        </li>
                        <li className='text-xl py-4 flex cursor-pointer'>
                            <MdOutlineFavorite size={25}
                                className='mr-4 text-white bg-orange-500 rounded-full'
                            />
                            My Favourite
                        </li>
                        <li className='text-xl py-4 flex cursor-pointer'>
                            <FaGoogleWallet size={25}
                                className='mr-4 text-white bg-orange-500 rounded-full'
                            />
                            My Wallet
                        </li>
                        <li className='text-xl py-4 flex cursor-pointer'>
                            <MdHelp size={25}
                                className='mr-4 text-white bg-orange-500 rounded-full'
                            />
                            Help
                        </li>
                        <Link to='/cart'><li className='text-xl py-4 w-[200px] flex justify-center items-center cursor-pointer border-1 rounded-md bg-orange-400 text-white' onClick={(e) => setSideNav(false)}>
                        <BsFillCartFill size={20} />Cart
                        </li></Link>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default TopNav;