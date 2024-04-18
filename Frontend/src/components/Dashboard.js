import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from "./utlis/Data";
import LineChart from "./LineChart";
import Dash from "./Dash";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { SlArrowLeftCircle } from "react-icons/sl";
import Loading from "./Loading";
import { useEffect } from "react";

const Dashboard = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained ",
                data: Data.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
    });

    const logout = () => {
        localStorage.clear();
        navigate('/front');
    }

    const goBack = ()=>{
        navigate('/');
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [])
    return (
        <>
        {loading ? (<Loading />):
        <div className="flex flex-row h-screen w-full z-20 mb-[-100px]">

            <div className="absolute top-0 left-0 w-[20%] h-full bg-orange-300">
                <div className="flex flex-row">
                    <SlArrowLeftCircle className="text-white mt-4 ml-4 cursor-pointer" size={25} onClick={goBack} />
                    <h2 className='text-2xl p-4 text-white font-bold max-sm:text-sm'>Hot <span className='text-orange-700 font-bold'>Meals</span></h2>
                </div>
                <nav>
                    <ul className="flex flex-col p-2 text-white justify-center">
                        <Link to=''><li className="text-xl w-full p-2 mt-3 flex cursor-pointer rounded-lg hover:bg-orange-700 max-sm:text-[0.65em] ">
                            Dashboard
                        </li></Link>
                        <Link to='dashProduct'><li className="text-xl w-full p-2 mt-3 flex cursor-pointer rounded-lg hover:bg-orange-700 max-sm:text-[0.65em]">
                            Product
                        </li></Link>
                        <Link to='dashCustomer'><li className="text-xl w-full p-2 mt-3 flex cursor-pointer rounded-lg hover:bg-orange-700 max-sm:text-[0.65em]">
                            User
                        </li></Link>
                        <Link to='dashResturant'><li className="text-xl w-full p-2 mt-3 flex cursor-pointer rounded-lg hover:bg-orange-700 max-sm:text-[0.65em]">
                            Resturant
                        </li></Link>

                    </ul>
                </nav>
            </div>
            <div className="absolute h-full w-full z-20 bg-gray-100 top-0 left-[20%]">
                <div className="flex flex-row justify-center">
                    <div className='bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px] ml-10 mt-4 mr-4 '>
                        <input className='bg-transparent p-2 w-full focus:outline-none' type='text' placeholder='search' value={search} onChange={(e) => setSearch(e.target.value)} />
                        <AiOutlineSearch size={25} className='cursor-pointer' />
                    </div>
                    <FaUser size={25} className="bg-white rounded-full shadow-md p-1 ml-20 mt-5 mr-4 cursor-pointer" onClick={logout} />
                </div>
                <Outlet />
            </div>
        </div>
}
        </>
    
    );
}

export default Dashboard;