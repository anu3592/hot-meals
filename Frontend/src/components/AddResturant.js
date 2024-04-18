import { useState, useEffect } from 'react';
import img from '../img/food.jpg';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const AddResturant = () => {
    const [imge, setImge] = useState(img);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [owner, setOwner] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [moto, setMoto] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/resturant');
        }
    })
    const submit = async ()=>{
        const formData = new FormData();
        formData.append('name',name);
        formData.append('address',address);
        formData.append('owner',owner);
        formData.append('contact',contact);
        formData.append('email',email);
        formData.append('moto',moto);
        formData.append('password',password);
        formData.append('image',image);

        let result = await fetch("http://localhost:5000/resturants",{
            method: "POST",
            body: formData,
            headers: {}
        });
        result = await result.json();
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('tokenR', JSON.stringify(result.auth));
        navigate('/resturant');
    }
    return <div className='flex flex-row  justify-center items-center h-full w-full give'>

        <div className='flex flex-col justify-center items-center m-4 lg:w-[600px] bg-white rounded-3xl p-4'>
            <img src={imge}
                className='object-cover w-36 h-36 rounded-full m-5 bg-white border-2 border-gray-800 p-1' />
            <h1 className='text-3xl text-orange-700 font-bold'>Add Your Resturant</h1>
            <input className="border-2 border-orange-600 rounded-lg p-5 m-4 w-[300px] h-5" placeholder="enter name" onChange={(e)=>setName(e.target.value)}/>
            <textarea rows="5" cols="50" placeholder="add your address..." className="border-2 border-orange-600 rounded-lg p-2 m-4" onChange={(e)=>setAddress(e.target.value)}></textarea>
            <input className="border-2 border-orange-600 rounded-lg p-5 m-4 w-[300px] h-5" placeholder="enter resturant's owner name" onChange={(e)=>setOwner(e.target.value)}/>
            <input className="border-2 border-orange-600 rounded-lg p-5 m-4 w-[300px] h-5" placeholder="enter contact number" onChange={(e)=>setContact(e.target.value)}/>
            <input type="email" className="border-2 border-orange-600 rounded-lg p-5 m-4 w-[300px] h-5" placeholder="enter your email" onChange={(e)=>setEmail(e.target.value)}/>
            <textarea rows="5" cols="50" placeholder="add moto of your resturant..." className="border-2 border-orange-600 rounded-lg p-2 m-4" onChange={(e)=>setMoto(e.target.value)}></textarea>
            <input type="password" className="border-2 border-orange-600 rounded-lg p-5 m-4 w-[300px] h-5" placeholder='enter paswword...' onChange={(e)=>setPassword(e.target.value)}/>
            <h1 className="text-md m-0">Please upload your resturant image:</h1>
            <input type="file" accept="image/*" className="border-2 border-orange-600 rounded-lg p-5 m-4 mt-2 mb-0 w-[300px] h-[100px] items-center justify-center" onChange={(e)=>setImage(e.target.files[0])}/>
            <button className="rounded-lg text-white bg-blue-700 border-none p-2 m-3 w-[200px] mb-10" onClick={submit}>Add Resturant</button>
            <li className="list-none text-lg text-purple-500 cursor-pointer"><Link to='/rlogin'>(already have an account)</Link></li>
        </div>
    </div>
}

export default AddResturant;