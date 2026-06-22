import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import api from "../api/axios"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

gsap.registerPlugin(ScrollTrigger)

export default function Package() {
    const [data, setData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/package/get/all')
                setData(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (data.length === 0) return

        const ctx = gsap.context(() => {
            gsap.utils.toArray('.package-card').forEach((card) => {
                gsap.from(card, {
                    x: window.innerWidth < 768 ? 50 : 150,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                    }
                })
            })
        })

        return () => ctx.revert()
    }, [data])

    return (
        <div className="w-full overflow-x-hidden bg-white">
            <div className="bg-stone-800 w-full">
                <Navbar />
            </div>

            <section
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80')` }}
                className="h-[85vh] md:h-screen bg-cover bg-center relative"
            >
                <div className="absolute inset-0 bg-black/50 w-full h-full flex pt-16 px-4 sm:px-8 justify-center flex-col text-white">
                    <div className="text-white text-center flex flex-col items-center gap-4 md:gap-6 max-w-3xl mx-auto">
                        <p className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 backdrop-blur-md text-sm md:text-lg tracking-wide uppercase">
                            Our Expeditions
                        </p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair tracking-tight leading-tight">
                            Explore the World's <br /> <span className="font-bold">Most Beautiful Places</span>
                        </h1>
                        <p className="text-sm md:text-lg text-gray-300 max-w-md md:max-w-xl font-light">
                            Find your perfect escape — from volcanic sunrises to overwater retreats, we have it all.
                        </p>
                    </div>
                </div>
            </section>

            <div className="text-center py-12 md:py-16 px-4 sm:px-8 max-w-4xl mx-auto">
                <p className="shadow-sm border border-neutral-100 rounded-full px-4 py-1.5 bg-gray-50 text-center w-fit mx-auto mb-4 text-xs md:text-sm font-medium text-neutral-600">
                    Choose your adventure ✧˖°.
                </p>
                <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                    Find Your Perfect <span className="text-gray-400 font-normal italic">Escape</span>
                </h2>
                <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                    From volcanic sunrises to overwater retreats, handpicked expeditions for every kind of traveler.
                </p>
            </div>

            <div className="w-1/4 md:w-1/12 mx-auto border-t border-neutral-300 mb-10"></div>

            <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pb-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
                {data.map(item => {
                    let image = item.images[0]
                    return (
                        <div onClick={() => navigate(`/packages/${item._id}`)} key={item._id} className="package-card relative group overflow-hidden rounded-2xl shadow-lg border border-neutral-100 bg-neutral-900 aspect-[4/5] sm:aspect-video md:aspect-auto md:h-[420px]">
                            <img src={image} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" alt="" />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transition-transform duration-500 transform translate-y-2 group-hover:-translate-y-4 flex flex-col gap-2 z-10">
                                <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">{item.destination}</span>
                                <h3 className="text-white font-bold text-2xl md:text-3xl font-playfair tracking-tight">{item.name}</h3>

                                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden flex flex-col gap-3 pt-2 border-t border-white/10 mt-2">
                                    <div className="flex items-center justify-between text-sm text-gray-300">
                                        <p className="font-medium">{item.duration}</p>
                                        <p className="text-white font-bold text-lg">${item.price}</p>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/packages/${item._id}`)}
                                        className="w-full bg-white text-black py-3 rounded-xl font-bold text-sm cursor-pointer hover:bg-neutral-100 transition-colors shadow-md mt-1"
                                    >
                                        View details
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <Footer />
        </div>
    )
}