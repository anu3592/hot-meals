import React from "react";
const PaymentSuccess = ()=>{
    return(
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center w-[60%] h-[300px] rounded-lg bg-green-100 shadow-xl p-5 m-7">
            <h1 className="text-4xl text-green-500 fondt-bold m-4">Your Payment is successfully recieved!</h1>
            <p className="text-lg text-green-500">Thank you for ordering the meal. Your your order will be delivered within a short time. Happy Meal!...</p>
        </div>
        </div>
    )
}

export default PaymentSuccess;