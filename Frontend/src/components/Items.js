import { useEffect, useState } from "react";
import { TfiShoppingCart } from "react-icons/tfi";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "./action";
import { useNavigate } from "react-router";
import Loading from "./Loading";

const Items = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const myState = useSelector((state)=>state.addInCart);
    const myState2 = useSelector((state)=>state.searchValue);
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    let searchItem = '';
    useEffect(() => {
        searchItem = localStorage.getItem('search');
        func(); 
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [localStorage.getItem('search')]);
    const func = ()=>{
        fetch(`http://localhost:5000/items/${searchItem}`,{
            headers:{
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        .then(result => result.json())
        .then(data => {
            //let arr = [data];
            setItems(data);
            //console.log(data);
           console.log(myState);
        })
        .catch(error => console.error('Error fetching image:', error));
    }

    const takeAction = (item)=>{
        dispatch(addItem(item));
        alert("Sucessfully added into the cart");
    }
    return (
        <>
        {loading ? (<Loading />):
        <div className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="text-4xl font-bold items-center justify-center m-2">Your <span className="text-orange-500">Items</span></h1>
            {items.length>0?items.map((item,index)=>
                <div className="flex flex-row items-center w-[90%] lg:h-[250px] sm:h-[220px] border-2 rounded-lg border-orange-600 shadow-xl p-2 m-4 sm:p-3">
                    <img src={`data:image/jpg;base64,${item.img}`} alt="img" className="h-[90%] w-[30%] sm:w-[40%] rounded-md float-left m-2" />
                    <div className="flex flex-col lg:w-[70%] sm:w-[50%] sm:h-[90%] m-2 p-2">
                        <h1 className="text-2xl text-orange-400 font-bold">{item.name}</h1>
                        <h1 className="text-xl font-bold">Category - {item.category}</h1>
                        <h1 className="text-xl text-orange-700 font-bold">Resturant - {item.restor}</h1>
                        <p className="sm:text-sm lg:text-md">{item.desc}
                        </p>
                        <h1 className="text-xl font-bold text-gray-600">Rs {item.price}</h1>
                        {/*<h1 className="text-lg text-orange-700 font-semibold font-serif">Quantity</h1>
                        <input type="text" className="w-[70px] lg:h-7 sm:h-5 border-1 border-gray-500 p-2 rounded-lg text-center" placeholder="1"></input>*/}
                        <button className="w-[10%] text-center bg-red-300 text-white border-none m-1"><TfiShoppingCart size={20} onClick={()=>takeAction(item)}/></button>
                    </div>
                </div>
            ):
            <div className="flex flex-col justify-center items-center w-[60%] h-[300px] rounded-lg bg-purple-100 shadow-xl p-5 m-7">
                <h1 className="text-4xl text-purple-500 fondt-bold m-4">No Result Found</h1>
                <p className="text-lg text-purple-500">There is no item according to your search result. May be it is not available right now or mat be you type wrong in search bar.</p>
            </div>
}
        </div>
        }
        </>
    );
}

export default Items;
