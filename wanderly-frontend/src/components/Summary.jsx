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
            console.log(data.data)
        }
        fetchData()
    }, [])

    return (
        <section className="px-20 py-24 flex flex-col gap-10">
            <div className="flex flex-col text-center w-full justify-center items-center">
                <p className="shadow rounded-full px-3 py-2 bg-white/10 backdrop-blur-md text-center w-fit">Pure Adventure <span className="font-bold">✧˖°.</span></p>
            </div>
            <div className="text-center">

                <h1 className="text-6xl">Unforgettable <span className="text-gray-600">Moments in the </span><br /> Heart of Mountains</h1>
                <p className="text-gray-500">Experience breathtaking sunrises, explore volcanic landscapes, and create <br /> memories at one of Worlds most iconic destinations.</p>

            </div>
            <div className=" flex gap-10 pt-10 justify-center">
                {Trips.slice(0, 4).map(item => {

                    let image = item.images[0]
                    return (
                        

                            <div
                                onClick={() => {
                                    navigate(`/packages/${item._id}`)
                                }}
                                key={item._id}
                                className="text-center p-4 bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 backdrop-blur-md rounded-md cursor-pointer flex flex-col gap-2 items-center">
                                <img src={image} className="w-64 h-48 object-cover rounded-2xl" alt="" />
                                <h1 className="font-bold  text-2xl pt-4">{item.name}</h1>
                                <p className="font-bold">${item.price}</p>
                                <p className="text-gray-500">{item.destination}</p>
                                <p>{item.duration}</p>

                            </div>

                        
                    )
                })}

            </div>
            <div className="text-center mt-6">
                <button
                    onClick={() => navigate('/packages')}
                    className="px-8 py-3 rounded-full bg-black text-white hover:scale-105 transition-all duration-300"
                >
                    View all packages
                </button>
            </div>
        </section>
    )
}