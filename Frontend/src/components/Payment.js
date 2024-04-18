import React, { useEffect } from "react";

const Payment = ()=>{
    useEffect(async ()=>{
        try {
            const response = await fetch('http://localhost:3002', {
              method: 'GET', // Or 'POST' if necessary
              headers: {
                'Content-Type': 'application/json'
                // Add any other headers if needed
              },
              // Add body if making a POST request
            });
        
            if (!response.ok) {
              throw new Error('Failed to initiate payment');
            }
        
            // If the response is successful, the browser will automatically follow the redirect
          } catch (error) {
            console.error('Error initiating payment:', error);
            // Handle error
          }
    },[]);

}

export default Payment;