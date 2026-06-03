import { useEffect, useState } from "react"
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import api from "../api/axios"
import Navbar from "../components/Navbar"


gsap.registerPlugin(ScrollTrigger)

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


    useEffect(() => {
        if (data.length === 0) return

        const ctx = gsap.context(() => {
            gsap.utils.toArray('.package-card').forEach((card) => {
                gsap.from(card, {
                    x: 200,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    }
                })
            })
        })

        return () => ctx.revert()
    }, [data])


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
                        <p className="bg-white/10 p-2 rounded-lg border border-white/20 backdrop-blur-md text-lg">Our Expeditions</p>
                        <h1 className=" text-6xl">Explore the World's <br /> <span className="font-bold">Most Beautiful Places</span></h1>
                        <p className="text-lg text-gray-400">Find your perfect escape -- from volcanic sunrises <br />to overwater retreats, we have it all.</p>
                    </div>

                </div>
            </section>

            <div className="text-center py-16 px-20">
                <p className="shadow rounded-full px-3 py-2 bg-gray-100 text-center w-fit mx-auto mb-4">
                    Choose your adventure ✧˖°.
                </p>
                <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl font-bold mb-4">
                    Find Your Perfect <span className="text-gray-500">Escape</span>
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                    From volcanic sunrises to overwater retreats, handpicked expeditions for every kind of traveler.
                </p>
            </div>
            <div className="w-1/2 mx-auto border-t-2 border-black mb-10"></div>

            <div className="px-32 py-16 grid grid-cols-2 gap-5">

                {data.map(item => {
                    let image = item.images[0]
                    return (
                        <div 
                        key={item._id} className="package-card relative group overflow-hidden rounded-2xl cursor-pointer shadow-md">
                            <img src={image} className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
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