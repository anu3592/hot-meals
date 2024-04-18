import React, { useEffect, useState } from "react";
import Map from "../Map/Map";
import { useNavigate } from "react-router";
import { latLng } from "leaflet";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Loading from "./Loading";

export default function CheckOutPage() {
    const myState = useSelector((state) => state.locAddress);
    const [loading, setLoading] = useState(true);
    const myState2 = useSelector((state) => state.sendCartDetails);
    const myState3 = useSelector((state)=>state.addInCart);
    const [name, setName] = useState();
    const navigate = useNavigate();
    const [order, setOrder] = useState();
    const [location, setLocation] = useState("");
    const [location2, setLocation2] = useState("");
    let total = 1;
    let sum = 0;
    useEffect(() => {
        setLocation(myState[2]);
        console.log(myState3);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    })

    const paymentFunc = async (sum) => {
        let address = "";
        if(location2!="")
            {
                address = location2;
            }
            else{
                address = location;
            }
        let result = await fetch("http://localhost:5000/",{
            method: 'POST',
            body: JSON.stringify({name,address,sum}),
            headers:{
                
                "Content-Type": "application/json"
            }
        });
        result = await result.json();

         myState3.map(async (value, index)=>{
            let name = value.name;
            let resturant = value.restor;
            let price = value.price;
            let address = "";
            if(location2!="")
            {
                address = location2;
            }
            else{
                address = location;
            }
            let result = await fetch("http://localhost:5000/orders",{
                method: 'POST',
                body: JSON.stringify({name,resturant,price,address}),
                headers:{
                    authorization: JSON.parse(localStorage.getItem('token')),
                    "Content-Type": "application/json"
                }
            })
        })
        console.log(result);
        console.log(sum);

        window.location.href = "http://localhost:5000/pay";
    }

    return (
        <>
        {loading ? (<Loading />):
        <div>
            <form>
                <div className="flex flex-row w-full h-full justify-evenly">
                    <div className="content m-3 p-3">
                        <h1 className="flex m-3 justify-center text-2xl ">Order Form</h1>
                        <div className="flex flex-col mt-5 p-4">
                            <input type="text" placeholder="name" className="flex mb-3 p-2 shadow-md w-[50%] h-[50px] " onChange={e => setName(e.target.value)}></input>
                            <input type="text" placeholder={location ? `${location}` : "address"} className="flex mb-3 p-2 shadow-md w-[80%] h-[50px]" onChange={e => setLocation2(e.target.value)}></input>
                            <p className="text-[0.8em]">(There might be a issue if your location is not correct using map, you can fill manually your address...)</p>
                        </div>
                        <h1 className="flex justify-center text-2xl">Order items</h1>
                        <div className="flex flex-col w-[90%] rounded-xl shadow-xl p-4">
                            {myState2.length > 0 ? myState2.map((item, index) =>
                                <div className="flex flex-row w-[93%] h-[70px] items-center p-2 m-3 justify-between">
                                    <div className="hidden">{total = sum + total * (item[0].price * item[0].quantity)}</div>
                                    <div className="hidden">{sum = total}</div>
                                    <div className="hidden">{total = 1}</div>
                                    <img src={item[0].img.length>100?`data:image/jpg;base64,${item[0].img}`:item[0].img} className=" w-[50px] h-[50px] rounded-full" />
                                    <h1>{item[0].name}</h1>
                                    <h1>{item[0].price}</h1>
                                    <h1>{item[0].quantity}</h1>
                                    <h1>{item[0].price * item[0].quantity}</h1>
                                </div>) : <></>
                            }
                            <div className="flex flex-row justify-between">
                                <h1></h1>
                                <h1>Total: {sum}</h1>

                            </div>
                        </div>

                    </div>
                    <div className="hidden md:flex flex-col w-[600px] h-[400px] m-3">
                        <h1>Choose Your Location</h1>
                        <Map
                            location=""
                            onChange={latlng => {
                                setOrder({ ...order, addressLatLng: latlng });
                            }}
                        />
                    </div>
                </div>
                <div className="buttons_container">
                    <div className="buttons">
                        <button type="button" className="border-none bg-orange-400 text-white" onClick={()=>paymentFunc(sum)}>Go To Payment</button>
                    </div>
                </div>
            </form>
        </div>
}
        </>
    );
}