import { useEffect, useState } from "react"
import api from "../api/axios"
import Navbar from "../components/Navbar"



export default function Package() {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/package/get/all');
            setData(response.data)
            console.log(response.data)
        }
        fetchData()
    }, [])
    return (
        <>
            <div className="bg-stone800 w-full">
                <Navbar></Navbar>
            </div>
            <section
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80')` }}
                className="h-screen bg-cover bg-center relative">

                <div
                    className="absolute inset-0 bg-black/50 w-full h-screen flex pt-24 px-20 justify-center flex-col text-white">

                    <div className="pb-20 text-white text-center flex flex-col items-center gap-6">
                        <p className="bg-white/10 p-2 rounded-full backdrop-blur-md text-lg">Our Expeditions</p>
                        <h1 className=" text-6xl">Explore the World's <br /> <span className="font-bold">Most Beautiful Places</span></h1>
                        <p className="text-lg text-gray-400">Find your perfect escape -- from volcanic sunrises <br />to overwater retreats, we have it all.</p>
                    </div>

                </div>
            </section>

            <h1 className="text-center p-2 text-2xl mt-5 flex items-center justify-center">Choose your adventure <span className="font-bold">✧˖°.</span></h1>
            <div className="px-20 py-24 grid grid-cols-2 gap-5">

                {data.map(item => {
                    let image = item.images[0]
                    return (
                        <div key={item._id} className="relative group overflow-hidden rounded-2xl cursor-pointer shadow-md">
                            <img src={image} className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                            <div className="absolute bottom-0 left-0 right-0 group-hover:opacity-0 transition-opacity duration-300 p-4">
                                <h1 className="text-white font-bold text-3xl">{item.name}</h1>
                            </div>
                            <div className="absolute inset-0 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-center justify-end p-6 text-center">
                                <h2 className="text-white font-bold text-2xl">{item.name}</h2>
                                <p className="text-gray-300">{item.destination}</p>
                                <p className="text-white font-bold">${item.price}</p>
                                <p className="text-gray-300">{item.duration}</p>
                                <button className="mt-3 border border-white text-white px-4 py-2 rounded-full mx-auto font-bold text-sm">
                                    View details
                                </button>
                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    )
}