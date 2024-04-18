import React from "react";
import { useDispatch } from 'react-redux';
import { addItem } from "./action";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "./Loading";

const Product = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const prod =
    {
        name: localStorage.getItem('itemName'),
        price: localStorage.getItem('itemPrice'),
        img: localStorage.getItem('itemImage'),
        restor: 'anurag'
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [])
    return (
        <>
        {loading ? (<Loading />) :
        <div className="flex flex-row h-full w-[80%] max-sm:w-full m-4 justify-center">
            <img src={localStorage.getItem('itemImage')} className="object-cover h-[80%] w-[50%] m-2 rounded-lg" />
            <div className="flex flex-col m-3 w-[50%]">
                <h1 className="text-3xl font-bold max-sm:text-lg">{localStorage.getItem('itemName')}</h1>
                <h1 className="text-lg max-sm:text-md mt-2">-from Best Resturant</h1>
                <h1 className="text-2xl font-bold max-sm:text-lg">Rs {localStorage.getItem('itemPrice')}</h1>
                <h1 className="m-2">You are one step closer to enjoy your meal. Just click to have your time with best meal. And we would be happy to see you happy.</h1>
                <Link to="/cart"><button type="button" className="text-white bg-orange-300 rounded-md border-none w-[30%] max-sm:w-[100px] m-2" onClick={() => dispatch(addItem(prod))}>Add to cart</button></Link>
                <h1>(please check all different varieties...)</h1>
            </div>

        </div>
}
        </>
    )
}

export default Product;