import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const DashResturant = ()=>{
    const [data, setData] = useState([]);
    const [len, setLen] = useState([]);
    const [alert, setAlert] = useState(false);
    const [updat, setUpdat] = useState(false);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [items, setItems] = useState(0);
    const [rest, setRest] = useState({});

    const [id, setId] = useState();
    useEffect(()=>{
        fetch('http://localhost:5000/resturants',{
            headers:{
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        .then((result)=>result.json())
        .then((result)=>{
            setData(result);
            console.log(result);
        })
        .catch((error)=>console.log(error))


    },[])

    const update = () => {
        //console.log(id);
        setUpdat(!updat);
        //setAlert(!alert);
    }

    const Delete = async () => {
        let result = await fetch(`http://localhost:5000/resturants/${id}`, {
            method: "DELETE",
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json();
        console.log(result);
        setAlert(!alert);
    }

    const submitV = async () => {
        const formData = new FormData();
        formData.append('name',name);
        formData.append('address',address);
        formData.append('owner',rest.owner);
        formData.append('contact',rest.contact);
        formData.append('email',rest.email);
        formData.append('moto',rest.moto);
        formData.append('password',rest.password);
        formData.append('image',rest.image);

        let result = await fetch(`http://localhost:5000/resturants/${id}`, {
            method: "PUT",
            body: JSON.stringify({name,address}),
            headers: {
                authorization: JSON.parse(localStorage.getItem('token')),
                "Content-Type": "application/json"
            }
        })

        result = await result.json();
        console.log(result);
        setAlert(!alert);
        setUpdat(!updat);
    }

    const manage = (id, value, ind) => {
        setId(id);
        setRest(value);
        setAlert(!alert);
    }

    const close = ()=>{
        setAlert(!alert);
        setUpdat(!updat);
        
    }

    return(
        <>
            <div className="flex flex-col p-4 m-2 w-[77%] h-[85%] bg-white rounded-lg shadow-md overflow-x-auto">
                <h1 className="flex text-2xl font-bold justify-center m-1 max-sm:text-md">Resturants</h1>
                <div className="flex flex-row w-full h-[70px] items-center justify-between p-3 m-2">
                    <h1 className="font-bold mr-3 max-sm:text-sm">Name</h1>
                    <h1 className="font-bold mr-3 max-sm:text-sm">Address</h1>
                    <h1 className="font-bold mr-3 max-sm:text-sm">Products</h1>
                    <h1 className="font-bold mr-3 max-sm:text-sm">Action</h1>
                </div>
                {data.map((value,index)=>
                <div className="flex flex-row w-full h-[70px] items-center justify-between p-3 m-2">
                    <h1 className="text-lg max-sm:text-sm">{value.name}</h1>
                    <h1 className="text-lg max-sm:text-sm">{value.address}</h1>
                    <h1 className="text-lg max-sm:text-sm">4</h1>
                    <button className="text-white p-2 bg-blue-300 border-none max-sm:w-[30px] max-sm:text-[0.5em]" onClick={() => manage(value._id, value, index)}>Manage</button>
                </div>
)}
            </div>
            {
                alert ? (<div className="bg-black/60 fixed top-0 left-0 w-full h-screen z-10"></div>) : ("")
            }
            {updat ? <div className="fixed w-[50%] max-sm:w-[70%] h-[90%] z-10 top-0 left-[25%] max-sm:left-[15%] bg-white overflow-x-auto p-2 m-2">
                <div className="m-2">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-3xl text-orange-700 p-4 m-4 max-sm:text-md">Update Resturant</h1>
                        <AiOutlineClose size={25} onClick={close} className="cursor-pointer" />
                    </div>
                    <input className="border-2 border-orange-600 rounded-lg p-5 m-2 w-[300px] h-3" placeholder="enter resturant name" onChange={(e) => setName(e.target.value)} />
                    <input className="border-2 border-orange-600 rounded-lg p-5 m-2 w-[300px] h-3" placeholder="enter address" onChange={(e) => setAddress(e.target.value)} />
                    <input className="border-2 border-orange-600 rounded-lg p-5 m-2 w-[300px] h-3" placeholder="enter products" onChange={(e) => setItems(e.target.value)} />
                </div>
                <div className="flex flex-row justify-center m-2">
                    <button className="rounded-lg text-white bg-blue-700 border-none p-2 m-3 w-[100px] mb-10 max-sm:w-[50px] max-sm:text-[0.65em]" onClick={(e) => submitV(e)}>Submit</button>
                </div>
            </div> :
                <div className={alert ? `fixed w-[35%] h-[30%] bg-white rounded-lg p-4 top-0 left-[30%] z-10 m-4` :
                    `fixed w-[35%] h-[30%] bg-white rounded-lg p-4 top-0 left-[-100%] z-10 m-4`}>
                    <div className="flex flex-row justify-between">
                        <h1 className="flex text-xl font-bold max-sm:text-sm">Manage</h1>
                        <AiOutlineClose size={25} onClick={() => setAlert(!alert)} className="cursor-pointer" />
                    </div>
                    <p className="max-sm:text-sm">Please select any option to do an operation of selected item...</p>
                    <button className="w-[35%] p-2 border-none bg-blue-400 text-white max-sm:text-[0.5em] m-2" onClick={update}>Update</button>
                    <button className="w-[35%] p-2 border-none bg-blue-400 text-white max-sm:text-[0.5em] m-2" onClick={Delete}>Delete</button>
                </div>
            }
        </>
    );
}

export default DashResturant;