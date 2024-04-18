import React from "react";

const PaymentError = ()=>{
    return(
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center w-[60%] h-[300px] rounded-lg bg-red-100 shadow-xl p-5 m-7">
            <h1 className="text-4xl text-red-500 fondt-bold m-4">Error! Payment was unsuccessfull</h1>
            <p className="text-lg text-red-500">There is some error eccor your payment is not recieved. Please try after some time....</p>
        </div>
        </div>
    );
}

export default PaymentError;