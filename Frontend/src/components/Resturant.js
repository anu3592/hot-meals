import { useEffect, useState } from 'react';
import img from '../img/plate.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Loading from "./Loading";

const Resturant = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    //const [items, setItems] = useState([]);
    const [arr, setArr] = useState([]);
    const [imge, setImge] = useState(img);
    const [order, setOrder] = useState(0);
    let auth = localStorage.getItem('tokenR');
    let result = JSON.parse(localStorage.getItem('user'));
    let imgee = result.image;
    let resturantName = "";
    /*const logout = ()=>{
        localStorage.clear();
        navigate('/front');
    }*/
    useEffect(() => {
        resturantName = JSON.parse(localStorage.getItem('user'));
        resturantName = resturantName.name;
        auth = localStorage.getItem('tokenR');
        show();
        getOrders();

        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [])

    const show = () => {
        result = JSON.parse(localStorage.getItem('user'));
        imgee = result.image;
        fetch(`http://localhost:5000/items/${result.name}`,{
            headers: {
                authorization: JSON.parse(localStorage.getItem('tokenR'))
            }
        })
        .then(ans => ans.json())
        .then(data => {
            setArr(data);
        })
        .catch(error => console.error('Error fetching image:', error));
    }
    const getOrders = () => {
        fetch(`http://localhost:5000/orders/${resturantName}`,{
            headers:{
                authorization: JSON.parse(localStorage.getItem('tokenR'))
            }
        })
        .then(ans => ans.json())
        .then((data) => {
            let value = 0;
            for (let i = 0; i < data.length; i++) {
                if (data[i].resturant === result.name) {
                    setOrder(value + 1);
                    value++;
                    console.log(value);
                }
            }
        })
        .catch(error => console.error('Error fetching image:', error));

    }
    const [detail, setDetail] = useState();
    return (
        <>
        {loading ? (<Loading />):
        <div className='flex flex-row max-sm:flex-col h-full w-full'>
            <div className='w-[40%] m-3 max-sm:w-full'>
                <img src={imge} className='h-full object-cover rounded-xl' />
            </div>
            <div className='flex flex-col w-[60%] items-center m-4 p-2 max-sm:w-full'>
                <h1 className='lg:text-4xl text-3xl font-bold text-orange-600'>{result.name} Resturant</h1>
                <div className='flex flex-row m-3 p-1'>

                    {imgee ? <img src={`data:image/jpg;base64,${imgee}`}
                        className=' w-[40%] h-[200px] rounded-md mr-3 max-sm:w-[100px] max-sm:h-[100px]' /> :
                        <img src='https://source.unsplash.com/1000x500/?Burger,Burger'
                            className=' w-[40%] h-[200px] rounded-md mr-3 max-sm:w-[100px] max-sm:h-[100px]' />}

                    <div className='flex flex-col w-[70%] ml-2 items-center p-2'>
                        <h1 className='lg:text-2xl sm:text-xl font-bold'>About the Resturant</h1>
                        <p className='sm:text-sm lg:text-lg'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book. It has survived not only five centuries, but also the leap into
                            electronic typesetting, remaining essentially unchanged. It was popularised in
                            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.</p>

                        <div className='m-2 p-2 border-2 rounded-lg shadow-lg items-center'>
                            <h1 className='lg:text-2xl sm:text-xl font-bold'>Location</h1>
                            <p>{result.address}</p>
                        </div>
                        <div className='m-2 p-2 border-2 rounded-lg shadow-lg items-center'>
                            <h1 className='lg:text-2xl sm:text-xl font-bold'>Reviews</h1>
                            <p>4.2*</p>
                        </div>

                        <div className='m-2 p-2 border-2 rounded-lg shadow-lg items-center'>
                            <h1 className='lg:text-2xl sm:text-xl font-bold'>Menu</h1>
                            <ul className='m-2'>
                                {
                                    arr.length > 0 ?
                                        arr.map((item, index) => (
                                            <li key={index} className='m-1'>{item.name}</li>
                                        ))
                                        : <></>
                                }
                            </ul>
                            <Link to="/addproduct"><button className='text-md w-[150px] flex justify-center items-center cursor-pointer border-1 rounded-md bg-orange-400 text-white'>Add Product</button></Link>
                        </div>
                        {/*<button onClick={logout}>Logout</button>*/}

                        <div className='flex flex-col m-2 p-2 border-2 rounded-lg shadow-lg items-center'>
                            <h1 className='lg:text-2xl sm:text-xl font-bold'>Orders</h1>
                            <p className='m-2'>You have {order} orders left</p>
                            <Link to="/order"><button className='lg:text-md sm:text-sm lg:w-[150px] sm:w-[100px] flex justify-center items-center cursor-pointer border-1 rounded-md bg-orange-400 text-white'>View Orders</button></Link>
                        </div>

                    </div>
                </div>
            </div>

        </div>
}
        </>
    )
}

export default Resturant;