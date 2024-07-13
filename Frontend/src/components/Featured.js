import { useState } from "react"
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs"
import { RxDotFilled } from 'react-icons/rx';
import Delivery from './Delivery';
import TopPicks from './TopPicks'
import Meal from './Meal';
import Categories from './Categories';
import NewsLetter from './NewsLetter';
function Featured() {
    
    const sliders = [
        {
            url: "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg"
        },
        {
            url: "https://images.yummy.ph/yummy/uploads/2023/02/biryani.jpg"
        },
        {
            url: "https://www.tastingtable.com/img/gallery/what-makes-restaurant-burgers-taste-different-from-homemade-burgers-upgrade/intro-1662064407.jpg"
        },
    ]
    const [currentInd, setCurrentInd] = useState(0);
    const prevSlide = () => {
        const isFirstSlide = currentInd === 0
        const newInd = isFirstSlide ? sliders.length - 1 : currentInd - 1
        setCurrentInd(newInd)
    }
    const nextSlide = () => {
        const isLastSlide = currentInd === sliders.length - 1
        const newInd = isLastSlide ? 0 : currentInd + 1
        setCurrentInd(newInd)
    }
    const moveToSlide = (slideIndex) => {
        setCurrentInd(slideIndex)
    }
    
    setInterval(setTimeout(nextSlide,6000),6000);
    return (
        <div>
            <div className="max-w-[1520px] h-[400px] w-full py-4 px-4 relative group">
                <div className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
                    style={{ backgroundImage: `url(${sliders[currentInd].url})` }}>
                </div>
                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-orange-600 text-white cursor-pointer">
                    <BsChevronCompactLeft onClick={prevSlide} />
                </div>
                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-orange-600 text-white cursor-pointer">
                    <BsChevronCompactRight onClick={nextSlide} />
                </div>
                <div className="flex top-4 justify-center py-2">
                    {
                        sliders.map((sliderItems, sliderIndex) => (
                            <div key={sliderIndex} onClick={() => moveToSlide(sliderIndex)} className="text-2xl cursor-pointer">
                                <RxDotFilled />
                            </div>
                        ))
                    }
                </div>
            </div>
            <Delivery/>
            <TopPicks/>
            <Meal/>
            <Categories/>
            <NewsLetter/>
        </div>

    )
}

export default Featured
