import { useEffect, useState } from "react";
import { VscTrash } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { SlArrowLeftCircle } from "react-icons/sl";
import { Link } from "react-router-dom";
import { sendCart } from "./action";
import Loading from "./Loading";

const Cart = () => {
    const myState = useSelector((state)=>state.addInCart);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [itemObj, setItemObj] = useState({});
    const navigate = useNavigate();
    let checkState = myState;
    let [del, setDel] = useState("");
    const [val, setVal] = useState(1);
    if (val < 1 || val > 10) {
        setVal(1);
    }
    useEffect(()=>{
        console.log(myState);
        checkState = myState;

        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    },[]);

    const deleteItem = (ind)=>{
        myState.splice(ind,1);
        // navigate is used because whenever we delete any item it don't show deleted at that time and we can't refresh
        // the page because it is using redux if we refresh the page then we will lose all items. so to call useEffect at the 
        // clicking of delete button we call navigation so it will call cart everytime so that useEffect will call and 
        // we will get update result of deleted item.
        navigate('/cart');
    }

    const goBack=()=>
    {
        navigate('/');
    }

    const sendItem = (food)=>{
        const arr = [];
        
        food['quantity'] = val;
        arr.push(food)
        dispatch(sendCart(arr));
    }

    return (
        <>
        {loading ? (<Loading />):
        <div className="flex flex-col w-full h-full justify-center items-center m-3">
            <div className="flex flex-row">
            <SlArrowLeftCircle className="mt-4 cursor-pointer" size={25} onClick={goBack}/>
            <h1 className="text-4xl font-bold items-center justify-center m-2">Your <span className="text-orange-500">Cart</span></h1>
            </div>
            {checkState.length>0?myState.map((foodItem, index)=>
            <div className="flex flex-row w-[80%] h-[180px] m-3 rounded-xl shadow-xl items-center">

                <img src={foodItem.img.length>100?`data:image/jpg;base64,${foodItem.img}`:foodItem.img} className="h-[70%] w-[30%] max-sm:w-[20%] rounded-lg float-left m-2" />
                <div className="flex flex-col">
                    <h1 className="text-2xl max-sm:text-md font-bold m-4 mb-[40px]">{foodItem.name}</h1>
                    <Link to="/check"><button className="w-20 h-7 ml-4 mt-[-20px] border-none bg-red-400 text-white text-center" onClick={()=>sendItem(foodItem)}>Order</button></Link>
                </div>
                <div className="flex flex-col max-sm:flex-col">
                    <h1 className="text-2xl max-sm:text-md font-bold ml-[60px] max-sm:ml-[30px] mt-3">Rs {foodItem.price}</h1>

                    <div className="flex flex-row w-[20%] max-sm:h-[15px] m-2">
                        <button className="flex inc w-[10px] h-[35px] max-sm:w-[20px] max-sm:h-[20px] items-center text-white max-sm:text-sm bg-violet-300 border-none text-center ml-[40px] max-sm:ml-2 mb-2"
                            onClick={() => setVal(val + 1)}>+</button>
                        <input type="text" className="w-[20px] h-[35px] max-sm:w-[20px] max-sm:h-[20px] max-sm:text-sm bg-violet-300 text-center text-white" value={val} />
                        <button className="flex dec w-[10px] h-[35px] max-sm:w-[20px] max-sm:h-[20px] items-center text-white max-sm:text-sm bg-violet-300 text-center border-none mb-2"
                            onClick={() => setVal(val - 1)}>-</button>
                    </div>


                </div>
                <VscTrash className="ml-[10%] m-2 cursor-pointer" size={25} onClick={()=>deleteItem(index)}/>
            </div>):
            <div className="flex flex-col justify-center items-center w-[60%] h-[300px] rounded-lg bg-purple-100 shadow-xl p-5 m-7">
            <h1 className="text-4xl text-purple-500 fondt-bold m-4">No Result Found</h1>
            <p className="text-lg text-purple-500">There is no item inside the cart. Please add any item into the cart for ordering.</p>
        </div>
}
        </div>
}
        </>

    )
}

export default Cart;