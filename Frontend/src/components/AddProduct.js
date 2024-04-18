import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const AddProduct = ()=>{
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [restor, setRestor] = useState("");
    const [img, setImg] = useState(null);
    const [desc, setDesc] = useState("");
    const navigate = useNavigate();
    
    const submitV = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('restor', restor);
        formData.append('desc',desc);
        formData.append('img',img); 
        let result = await fetch("http://localhost:5000/addproduct", {
            method: "POST",
            body: formData,
            headers: {
                //'content-type' : 'multipart/form-data', no need to use header as we use FormData class
                //'content-length': 182056
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/resturant');
    }
    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl text-orange-700 p-4 m-4">Add Food Product</h1>
            <input className="border-2 border-orange-600 rounded-lg p-5 m-4 w-[300px] h-5" placeholder="enter food name" onChange={(e)=>setName(e.target.value)}/>
            <input className="border-2 border-orange-600 rounded-lg p-5 m-4 w-[300px] h-5" placeholder="enter price in rupees" onChange={(e)=>setPrice(e.target.value)}/>
            <input className="border-2 border-orange-600 rounded-lg p-5 m-4 w-[300px] h-5" placeholder="enter category" onChange={(e)=>setCategory(e.target.value)}/>
            <input className="border-2 border-orange-600 rounded-lg p-5 m-4 w-[300px] h-5" placeholder="enter restor name" onChange={(e)=>setRestor(e.target.value)}/>
            <h1>Please add some description to your food item:</h1>
            <textarea rows="5" cols="50" placeholder="add your description..." className="border-2 border-orange-600 rounded-lg p-2 m-4" onChange={e=>setDesc(e.target.value)}></textarea>
            <h1 className="text-md m-0">Please upload your food image:</h1>
            <input type="file" accept="image/*" className="border-2 border-orange-600 rounded-lg p-5 m-4 mt-2 mb-0 w-[300px] h-[100px] items-center justify-center" onChange={(e)=>setImg(e.target.files[0])}/>
            <button className="rounded-md ml-[-180px] m-1">remove</button>
            <button className="rounded-lg text-white bg-blue-700 border-none p-2 m-3 w-[100px] mb-10" onClick={(e)=>submitV(e)}>Submit</button>
        </div>
    )
}

export default AddProduct;