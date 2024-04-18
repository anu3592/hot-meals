import { FaTwitterSquare, FaGithubSquare, FaInstagramSquare, FaFacebookSquare } from 'react-icons/fa'
function Footer()
{
    return (
        <div className="max-w-[1520px] m-auto px-4 py-2 bg-[#24262b]">
            <div className="py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300">
                <div>
                    <h1 className="w-full text-3xl font-bold text-orange-500">HotMeals</h1>
                    <p>
                        The very intersting site with easily usable and easy experienced to our every
                        user or customer is now available at different countries and cities and now easily available at 
                        mobile phone. Let's have some good time.
                    </p>
                    <div className="flex justify-between md:w-[75%] my-6">
                        <FaFacebookSquare size={30}/>
                        <FaGithubSquare size={30}/>
                        <FaInstagramSquare size={30}/>
                        <FaTwitterSquare size={30}/>
                    </div>
                </div>
                <div className='lg:col-span-2 flex justify-between mt-6'>
                    <div>
                        <h6 className='font-medium text-[#9b9b9b]'>Location</h6>
                        <ul>
                            <li className='py-2 text-sm'>India</li>
                            <li className='py-2 text-sm'>Russia</li>
                            <li className='py-2 text-sm'>Israel</li>
                            <li className='py-2 text-sm'>USA</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='font-medium text-[#9b9b9b]'>Location</h6>
                        <ul>
                            <li className='py-2 text-sm'>England</li>
                            <li className='py-2 text-sm'>Japan</li>
                            <li className='py-2 text-sm'>South Korea</li>
                            <li className='py-2 text-sm'>Shri Lanka</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='font-medium text-[#9b9b9b]'>Location</h6>
                        <ul>
                            <li className='py-2 text-sm'>Nepal</li>
                            <li className='py-2 text-sm'>Australia</li>
                            <li className='py-2 text-sm'>Argentina</li>
                            <li className='py-2 text-sm'>Austria</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='font-medium text-[#9b9b9b]'>Location</h6>
                        <ul>
                            <li className='py-2 text-sm'>Dubai</li>
                            <li className='py-2 text-sm'>Singa Pore</li>
                            <li className='py-2 text-sm'>New York</li>
                            <li className='py-2 text-sm'>Germany</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer