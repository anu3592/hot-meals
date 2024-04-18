import { useEffect, useState } from "react"
import { mealData } from "../data/data"
import { ArrowSmRightIcon } from '@heroicons/react/outline'
import { Link } from "react-router-dom"
import Loading from './Loading';

function Meal() {
    const [foods, setFoods] = useState(mealData)
    const filterCat = (category) => {
        setFoods(
            mealData.filter((item) => {
                return item.category === category
            })
        )
    }
    const filterAllCat = (data) => {
        setFoods(data)
    }

    const viewMore = (item) => {
        let name = item.name;
        let amount = item.price;
        amount = amount.slice(3);
        amount = Number(amount);
        let img = item.img;
        localStorage.setItem('itemName', name);
        localStorage.setItem('itemPrice', amount);
        localStorage.setItem('itemImage', img);
    }

    return (
        <div className="max-w-[1520px] m-auto px-4 py-12">
            <h1 className="text-orange-500 font-bold text-2xl text-center py-2">
                Our Meal
            </h1>
            <div className="felx flex-col lg:flex-row justify-center">
                <div className="flex justify-center md:justify-center">
                    <button onClick={() => filterAllCat(mealData)} className="m-1 border-orange-700 text-white bg-orange-700 hover:bg-white hover:text-orange-700">All</button>
                    <button onClick={() => filterCat("Pizza")} className="m-1 border-orange-700 text-white bg-orange-700 hover:bg-white hover:text-orange-700">Pizza</button>
                    <button onClick={() => filterCat("Shake")} className="m-1 border-orange-700 text-white bg-orange-700 hover:bg-white hover:text-orange-700">Shake</button>
                    <button onClick={() => filterCat("Sweet")} className="m-1 border-orange-700 text-white bg-orange-700 hover:bg-white hover:text-orange-700">Sweet</button>
                </div>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-4 gap-6 py-4">
                {
                    foods.map((item) => (
                        <div key={item.id} className="border-none hover:scale-105 duration-300">
                            <img src={item.img} className="w-full h-[200px] object-cover rounded-lg" />
                            <div className="flex justify-between py-2 px-2">
                                <p className="font-bold">{item.name}</p>
                                <p className="bg-orange-700 h-18 w-18 rounded-full -mt-10 text-white py-4 px-2 border-8">{item.price}</p>
                            </div>
                            <div className="pl-2 py-4 -mt-7">
                                <Link to="/product"><p className="flex items-center text-indigo-700 cursor-pointer" onClick={() => viewMore(item)}>View More<ArrowSmRightIcon className="w-5 ml-2" /></p></Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Meal

// we installed "npm i @heroicons/react" package.