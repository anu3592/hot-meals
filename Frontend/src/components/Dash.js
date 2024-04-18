import React, { useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from "./utlis/Data";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";

const Dash = () => {
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState(0);
    const [users, setUsers] = useState(0);
    const [newOrder, setNewOrder] = useState(0);
    const [resturants, setResturants] = useState(0);
    const [restData, setRestData] = useState([]);
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

    useEffect(() => {
        fetch('http://localhost:5000/orders', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
            .then((result) => result.json())
            .then((result) => {
                setOrders(result.length)
                let dateArr = [];
                result.map((order, index) => {
                    let date = order.date;
                    let arr = date.split('|');
                    let todayDate = new Date();
                    let year = todayDate.getFullYear();
                    let month = todayDate.getMonth();
                    if (month < 10) {
                        month = '0' + (month + 1);
                    }
                    let nowDate = todayDate.getDate();
                    if (nowDate < 10) {
                        nowDate = '0' + nowDate;
                    }

                    let fullDate = " " + nowDate + " " + month + " " + year;
                    if (fullDate === arr[1]) {
                        //setNewOrder(newOrder+1);
                        dateArr.push(arr);
                    }
                })
                setNewOrder(dateArr.length);
            })
            .catch((error) => console.log(error))

        fetch('http://localhost:5000/users', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
            .then((result) => result.json())
            .then((result) => setUsers(result.length))
            .catch((error) => console.log(error))

        fetch('http://localhost:5000/resturants', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
            .then((result) => result.json())
            .then((result) => {
                setResturants(result.length);
                setRestData(result);
            })
            .catch((error) => console.log(error))

    }, [])

    return (
        <>
            <div className="flex flex-row w-full mt-4 ml-4 mb-4 mr-0 overflow-y-auto">

                <div className="flex flex-col p-4 m-2 w-[180px] max-sm:w-[80px] bg-white rounded-md shadow-md items-center">
                    <h1 className="text-lg font-bold text-orange-400 max-sm:text-sm cursor-pointer">Total orders</h1>
                    <h1 className="text-3xl font-bold m-2 max-sm:text-sm">{orders}</h1>
                    <ProgressBar completed={70} bgColor="orange" animateOnRender={true} height="10px" className="w-full" />
                </div>



                <div className="flex flex-col p-4 m-2 w-[180px] max-sm:w-[80px] bg-white rounded-md shadow-md items-center">
                    <h1 className="text-lg font-bold text-orange-400 max-sm:text-sm cursor-pointer">Visitors</h1>
                    <h1 className="text-3xl font-bold m-2 max-sm:text-sm">1200</h1>
                    <ProgressBar completed={50} bgColor="orange" animateOnRender={true} height="10px" className="w-full" />
                </div>



                <div className="flex flex-col p-4 m-2 w-[180px] max-sm:w-[80px] bg-white rounded-md shadow-md items-center">
                    <h1 className="text-lg font-bold text-orange-400 max-sm:text-sm cursor-pointer">New Orders</h1>
                    <h1 className="text-3xl font-bold m-2 max-sm:text-sm">{newOrder}</h1>
                    <ProgressBar completed={50} bgColor="orange" animateOnRender={true} height="10px" className="w-full" />
                </div>


                <div className="flex flex-col p-4 m-2 w-[180px] max-sm:w-[80px] bg-white rounded-md shadow-md items-center">
                    <h1 className="text-lg font-bold text-orange-400 max-sm:text-sm cursor-pointer">Customers</h1>
                    <h1 className="text-3xl font-bold m-2 max-sm:text-sm">{users + resturants}</h1>
                    <ProgressBar completed={50} bgColor="orange" animateOnRender={true} height="10px" className="w-full" />
                </div>



            </div>
            <div className="flex max-sm:flex-col flex-row">
                <div className="flex w-[50%] h-[50%] m-6 max-sm:ml-14 p-4 bg-white max-sm:bg-gray-100 justify-center rounded-lg shadow-md max-sm:shadow-none items-center">
                    <LineChart chartData={chartData} />
                </div>
                <div className="flex flex-col w-[20%] max-sm:w-[50%] items-center p-4 m-4 bg-white rounded-lg shadow-md overflow-y-auto">
                    <h1 className="text-lg font-bold max-sm:text-sm">Top 5 Resturants</h1>
                    <ul>
                        <li className="text-md max-sm:text-sm">Pano</li>
                        <li className="text-md max-sm:text-sm">Black Pepper</li>
                        <li className="text-md max-sm:text-sm">The Sky Patio</li>
                        <li className="text-md max-sm:text-sm">Garden Grills</li>
                        <li className="text-md max-sm:text-sm">World Cafe</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Dash;