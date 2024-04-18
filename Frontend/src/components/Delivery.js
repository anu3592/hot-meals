function Delivery(){
    return (
        <div className="w-full bg-white py-16 px-4">
            <h3 className="text-orange-500 font-bold text-2xl text-center">Quick Delivery App</h3>
            <div className="w-[1240px] mx-auto grid md:grid-cols-2">
                <img className="w-[500px] ml-[-50px] my-4" src="https://waayu.app/public/landing/img/demos/app-landing/original_img/Realistic_Silver_Smartphone_Mockup_05%201.png"/>
                <div className="flex flex-col justify-center mr-[100px] w-[500px] my-6">
                    <p className="text-[#00df9a] font-bold">Get The App</p>
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">Limitless Convenience on-demand</h1>
                    <p>The service and hospitality industries have a lot to gain from adopting automation for communicating with customers or guests. 
                        There is an expectation for any quality establishment to have timely and clear messaging about availability, bookings, payments and more. 
                        It alleviates pressures on staff while ensuring patrons get the information they need in a manner that suggests a well-run and efficient establishment.</p>
                        <button className="bg-black text-green-500 w-[200px] rounded-md font-medium my-6 mx-auto py-3">Get Started</button>
                </div>
            </div>
        </div>
    )
}

export default Delivery