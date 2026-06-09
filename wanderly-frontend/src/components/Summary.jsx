import { useEffect, useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom";

export default function Summary() {
    const [Trips, setTrips] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const data = await api.get('/package/get/all');
            setTrips(data.data)
        }
        fetchData()
    }, [])

    return (
        <section className="px-6 sm:px-12 lg:px-20 py-12 md:py-24 flex flex-col gap-6 md:gap-10">
            <div className="flex flex-col text-center w-full justify-center items-center">
                <p className="shadow rounded-full px-4 py-2 bg-white/10 backdrop-blur-md text-center w-fit text-sm">
                    Pure Adventure <span className="font-bold">✧˖°.</span>
                </p>
            </div>
            
            <div className="text-center px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                    Unforgettable <span className="text-gray-600">Moments in the </span><br className="hidden sm:inline" /> Heart of Mountains
                </h1>
                <p className="text-gray-500 mt-4 text-sm md:text-base max-w-2xl mx-auto">
                    Experience breathtaking sunrises, explore volcanic landscapes, and create memories at one of Worlds most iconic destinations.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-6 md:pt-10 max-w-7xl mx-auto w-full">
                {Trips.slice(0, 4).map(item => {
                    let image = item.images[0]
                    return (
                        <div
                            onClick={() => navigate(`/packages/${item._id}`)}
                            key={item._id}
                            className="text-center p-4 bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 backdrop-blur-md rounded-2xl cursor-pointer flex flex-col gap-2 items-center w-full"
                        >
                            <img src={image} className="w-full h-48 object-cover rounded-xl" alt={item.name} />
                            <h1 className="font-bold text-xl md:text-2xl pt-2 line-clamp-1">{item.name}</h1>
                            <p className="font-bold text-lg">${item.price}</p>
                            <p className="text-gray-500 text-sm">{item.destination}</p>
                            <p className="text-sm bg-gray-100 px-3 py-1 rounded-full">{item.duration}</p>
                        </div>
                    )
                })}
            </div>

            <div className="text-center mt-4 md:mt-6">
                <button
                    onClick={() => navigate('/packages')}
                    className="px-8 py-3 rounded-full bg-black text-white text-sm md:text-base font-medium hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                >
                    View all packages
                </button>
            </div>
        </section>
    )
}