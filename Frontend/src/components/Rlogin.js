import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import img from '../img/food.jpg';

const Rlogin = ()=>{
    const [name, setName] = useState("");
    const [owner, setOwner] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/resturant');
        }
    })
    const submit = async ()=>{
        let result = await fetch("http://localhost:5000/rlogin",{
            method: "POST",
            body: JSON.stringify({name,owner,email,password}),
            headers:{
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.log(result);
        /*if(!result.result)
        {
            console.log(result);
            navigate('/');
        }
        else{
            navigate('/addresturant');
        }*/
        if(result.auth)
        {
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("tokenR", JSON.stringify(result.auth));
            navigate('/resturant');
        }
        else{
            alert("please enter valid credential");
        }
    }
    return (<div>
        <div className="flex w-full justify-center items-center give">
        <div className="flex flex-col w-[500px] justify-center items-center border-1 rounded-3xl shadow-2xl m-5 p-5 bg-white">
        <img src={img}
                className='object-cover w-36 h-36 rounded-full m-3 bg-white border-2 border-gray-800 p-1' />
            <h1 className="text-4xl text-orange-500 font-bold p-4 m-4">Login To Site</h1>
            <input placeholder="enter the resturant name..." type="text" className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2" onChange={e=>setName(e.target.value)}></input>
            <input placeholder="enter the owner name..." type="text" className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2" onChange={e=>setOwner(e.target.value)}></input>
            <input placeholder="enter the email address..." type="email" className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2" onChange={e=>setEmail(e.target.value)}></input>
            <input type="password" placeholder="enter the password..." className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2" onChange={e=>setPassword(e.target.value)}></input>
            <button className="border-none bg-blue-400 rounded-md text-white m-8 w-[100px] p-2" onClick={submit}>Login</button>
            <li className="list-none text-lg text-purple-500 cursor-pointer"><Link to='/addresturant'>(Create account)</Link></li>
        </div>
        </div>
    </div>)
}

export default Rlogin;