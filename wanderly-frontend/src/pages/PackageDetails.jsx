import { useParams, useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useEffect, useState } from "react"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import gsap from 'gsap'


export default function PackageDetails() {

    const { id } = useParams()
    const [data, setData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`/package/get/one/${id}`);
            setData([response.data])

        }

        fetchData()
    }, [])

    useEffect(() => {
        if (!data.length) return  // wait for data

        const ctx = gsap.context(() => {
            // 1. Page slide in
            gsap.from(".page-wrapper", {
                x: "100%",
                duration: 0.8,
                ease: "power3.out"
            })

            // 2. Hero title
            gsap.from(".hero-title", {
                y: 60,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: "power3.out"
            })

            // 3. Hero images staggered
            gsap.from(".hero-img", {
                x: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                delay: 0.5,
                ease: "power3.out"
            })

            // 4. Timeline items on scroll
            gsap.from(".timeline-item", {
                scrollTrigger: ".timeline-item",
                x: -60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            })
        })

        return () => ctx.revert()
    }, [data])  // runs when data loads


    return (
        <div className="page-wrapper">
            <Navbar></Navbar>
            {data.map((item) => {
                return (
                    <div key={item._id}>
                        <section style={{ backgroundImage: `url(${item.images[1]})` }}
                            className="h-screen bg-cover bg-center relative">
                            <div className="absolute inset-0 bg-black/50 w-full h-screen flex  pt-20 px-30  justify-between flex-col text-white ">
                                <div className="h-screen justify-between py-5 text-white flex flex-col gap-10">
                                    <div className="flex jutify-center items-center pt-20">
                                        <h1 className="hero-title text-7xl">{item.name}</h1>
                                    </div>
                                    <div className="flex justify-between items-end gap-2 pb-15 ">
                                        <div className="flex gap-4 w-3/4">
                                            {item.images.slice(2, 7).map((hero, index) => {
                                                return (
                                                    <div key={'hero' + index} className="w-full flex flex-col ">
                                                        <img src={hero} className=" hero-img rounded-md shadow-md h-72 object-cover" alt="" />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <button
                                            onClick={() => {
                                                console.log('Clickec' + id)
                                                navigate(`/booking/${id}`)
                                            }}
                                            className="bg-white text-black px-8 py-4 font-bold rounded-md pointer z-4" >Book now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#0f0f0f]"></div>
                        </section>
                        <div className="bg-[#0f0f0f] px-30 py-20">
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-px bg-white/30"></div>
                                <h2 className="text-5xl font-bold text-gray-400 whitespace-nowrap">ABOUT THE TOUR</h2>
                                <div className="flex-1 h-px bg-white/30"></div>
                            </div>

                            <div className=" relative flex flex-col w-full p-30">
                                <div className="mb-20">
                                    <p className="text-white text-lg text-center">{item.description}</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute left-1/2 top-2 bottom-0 w-px bg-white/30"></div>
                                    {item.itinerary.map((stop, index) => {
                                        return (
                                            <div key={index} className={`relative flex items-start gap-10 timeline-item mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>

                                                {/* Center dot */}
                                                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white z-10"></div>

                                                {/* Images */}
                                                <div className="w-5/12 ">
                                                    <img src={item.images[(index * 2 + 7) % item.images.length]} className="rounded-xl h-60 w-90 object-cover" />
                                                    {index % 2 === 0 && <img src={item.images[(index * 2 + 8) % item.images.length]} className="rounded-xl w-90  h-60  object-cover mt-2" />}
                                                </div>

                                                {/* Content */}
                                                <div className={`w-5/12 ${index % 2 === 0 ? 'text-left ml-auto' : 'text-left'}`}>
                                                    <p className="text-white/50 text-sm">{stop.days}</p>
                                                    <h3 className="text-white text-2xl font-bold">{stop.location}</h3>
                                                    <p className="text-white/60 mt-2 w-70">{stop.description}</p>
                                                </div>

                                            </div>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>

                        <section style={{ backgroundImage: `url(${item.images[item.images.length - 1]})` }} className=" relative h-content bg-cover px-30">

                            <div className="absolute inset-0 bg-black/50 w-full h-screen flex  pt-20 px-30  justify-between flex-col text-white"></div>

                            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-t from-transparent to-[#0f0f0f]"></div>
                            <div className="z-20 position relative flex items-center gap-1 -top-10">
                                <h1 className="flex-no-wrap text-white text-6xl ">WHAT'S INCLUDED</h1><div className=" flex-1 bg-white h-px "></div>
                            </div>
                            <div className="flex gap-5 justify-between">
                                {item.included.map((thing, index) => {
                                    return (
                                        <div key={'id' + index} className="bg-white/10 backdrop-blur-md rounded-xl border border-1 border-white p-4 flex flex-col gap-4">
                                            <h1 className=" text-white text-2xl font-bold">
                                                ✧ {thing.title}
                                            </h1>
                                            <p className="text-gray-200 text-md">{thing.detail}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex justify-between ">
                                <div className="relative z-10 w-96 backdrop-blur-md bg-gray/10 border border-white/20 rounded-2xl h-fit p-8 mt-10">
                                    <h2 className="text-white text-2xl font-semibold mb-1">Want to join us,</h2>
                                    <h2 className="text-white text-2xl font-semibold mb-6">but still have questions?</h2>

                                    <p className="text-white font-bold text-md mb-4">Leave a request</p>

                                    <input type="text" placeholder="Your name" className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/40 py-2 mb-4 outline-none" />
                                    <input type="text" placeholder="Phone number" className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/50 py-2 mb-4 outline-none" />
                                    <input type="text" placeholder="Comment" className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/40 py-2 mb-6 outline-none" />

                                    <button className="w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-white/90 transition">Send</button>
                                </div>

                                <div className="p-8 mt-10 grid grid-cols-2 gap-3 z-40 relative">
                                    <img src={item.images[2]} className="w-50 h-60 bg-cover rounded shadow" alt="" />
                                    <img src={item.images[3]} className="w-40 h-40 bg-cover self-end object-cover rounded shadow" alt="" />
                                    <img src={item.images[4]} className="w-40 h-40 bg-cover ml-auto object-cover rounded shadow" alt="" />
                                    <img src={item.images[5]} className="w-50 h-60 bg-cover rounded shadow" alt="" />

                                </div>

                            </div>



                            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transpartent to-white"></div>
                        </section>


                        <Footer></Footer>
                    </div>
                )
            })}

        </div>

    )
}