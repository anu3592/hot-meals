import { React, useEffect, useState } from "react";
import image1 from '../img/placed.jpg';
import image2 from '../img/preparing.jpg';
import image3 from '../img/picked.jpg';
import image4 from '../img/complete.jpg';
import icon1 from '../img/placedicon.png';
import icon2 from '../img/preparingicon.jpg';
import icon3 from '../img/pickedicon.jpg';
import icon4 from '../img/completeicon.png';
import { orderStatus } from '../data/data';
import { orderStatusImage } from "../data/data";
import Loading from "./Loading";

const Orders = () => {
    const [image, setImage] = useState(orderStatusImage[0].img);
    const [loading, setLoading] = useState(true);
    const [currentInd, setCurrentInd] = useState(0);
    const [data, setData] = useState([]);
    const resturantName = JSON.parse(localStorage.getItem('user')).name;
    
    const nextSlide = (ind) => {
        /*const isLastSlide = currentInd === orderStatusImage.length - 1
        const newInd = isLastSlide ? 0 : currentInd + 1*/
        setCurrentInd(ind);
    }
    useEffect(() => {
        //setResturantName(JSON.parse(localStorage.getItem('user')).name);
        //console.log(resturantName);

        fetch(`http://localhost:5000/orders/${resturantName}`, {
            headers: {
                authorization: JSON.parse(localStorage.getItem('tokenR'))
            }
        })
            .then(result => result.json())
            .then((result) => {
                setData(result);
                console.log(data);
            })
            .catch(error => console.error('Error fetching image:', error));

            const timer = setTimeout(() => {
                setLoading(false);
            }, 2000);
    
            return () => clearTimeout(timer);
    }, []);

    const deleteOrder = async (index) => {
        let result = await fetch(`http://localhost:5000/orders/${index}`, {
            method: "Delete",
            headers: {
                authorization: JSON.parse(localStorage.getItem('tokenR'))
            }
        });
        getOrder();
    }

    const getOrder = () => {
        fetch(`http://localhost:5000/orders/${resturantName}`, {
            headers: {
                authorization: JSON.parse(localStorage.getItem('tokenR'))
            }
        })
            .then(result => result.json())
            .then((result) => {
                setData(result);
                //console.log(data);
            })
            .catch(error => console.error('Error fetching image:', error));
    }
    return (
        <>
        {loading ? (<Loading />):
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl bg-orange-400 rounded-lg text-white shadow-lg p-4 m-4">Orders</h1>
            {data.length > 0 ? data.map((i, j) =>
                <div className="w-[50%] max-sm:w-[70%] border-2 rounded-lg shadow-xl m-4 p-3">
                    <div className="float-left m-2">
                        <h1 className="m-1">Order: #{i.orderId}</h1>
                        <h1 className="m-1">{i.resturant} Resturant</h1>
                        <hr />
                    </div>
                    <div className="float-right m-2">
                        <h1 className="m-1">{i.date}</h1>
                        <h1 className="m-1">Cash on delivery</h1>
                        <hr />
                    </div>

                    <img src={orderStatusImage[currentInd].img} className="mt-[60px] sm:ml-[80px] ml-[80px] h-[40%]" />

                    <div className="flex flex-row justify-center items-center">
                        {/*  <img src={icn1} className="rounded-full h-12 w-12 m-4" />
                    <img src={icn2} className="rounded-full h-12 w-12 m-4" />
                    <img src={icn3} className="rounded-full h-12 w-12 m-4" />
                    <img src={icn4} className="rounded-full h-12 w-12 m-4" />*/

                            orderStatus.map((item, index) =>
                                <div className="flex flex-col">
                                    <img src={item.img} className="rounded-full cursor-pointer h-12 w-12 m-5" onClick={() => nextSlide(index)} />
                                    <h1 className="ml-5">{item.name}</h1>
                                </div>
                            )
                        }
                    </div>
                    <h1 className="text-xl font-bold m-4 float-left">items</h1><br />
                    <div className="flex flex-row w-full m-5">
                        <h1 className="float-left lg:text-xl sm:text-lg mr-[30%] sm:mr-[20%] lg:mr-[30%]">{i.name}</h1>
                        <h1 className="float-right lg:text-xl sm:text-lg ml-[30%] max-sm:ml-[25%] sm:ml-[20%] lg:ml-[30%]">{i.price}</h1>
                    </div>
                    <hr />
                    <div className="flex flex-row w-full m-2">
                        <button onClick={() => deleteOrder(i.orderId)} className="float-left rounded-md lg:p-3 sm:p-1 border-none bg-yellow-500 text-white lg:w-[30%] sm:w-[50%] mr-[25%] sm:mr-[20%] lg:mr-[25%]">Confirm Order</button>
                        <h1 className="float-right lg:text-xl sm:text-lg font-bold mt-2 ml-[30%] max-sm:ml-[20%] sm:ml-[20%] lg:ml-[23%]">Total: Rs {i.price}</h1>
                    </div>
                </div>
            ) :
                <div className="flex flex-col justify-center items-center w-[60%] h-[300px] rounded-lg bg-purple-100 shadow-xl p-5 m-7">
                    <h1 className="text-4xl text-purple-500 fondt-bold m-4">No Result Found</h1>
                    <p className="text-lg text-purple-500">There is no order till now.</p>
                </div>
            }
        </div>
}
        </>
    );
}

export default Orders;