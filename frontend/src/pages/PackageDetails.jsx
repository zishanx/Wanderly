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
    const [enquiryForm, setEnquiryForm] = useState({ name: '', phone: '', comment: '' })
    const [enquirySent, setEnquirySent] = useState(false)

    const handleEnquiry = async (e) => {
        e.preventDefault()
        try {
            await api.post('/enquiry/create', { ...enquiryForm, packageId: id })
            setEnquirySent(true)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/package/get/one/${id}`)
                setData([response.data])
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [id])

    useEffect(() => {
        if (!data.length) return

        const ctx = gsap.context(() => {
            gsap.from(".page-wrapper", {
                x: "100%",
                duration: 0.8,
                ease: "power3.out"
            })

            gsap.from(".hero-title", {
                y: 60,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: "power3.out"
            })

            gsap.from(".hero-img", {
                x: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                delay: 0.5,
                ease: "power3.out"
            })

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
    }, [data])

    return (
        <div className="page-wrapper overflow-x-hidden">
            <Navbar />
            {data.map((item) => {
                return (
                    <div key={item._id}>
                        <section
                            style={{ backgroundImage: `url(${item.images[1]})` }}
                            className="min-h-screen lg:h-screen bg-cover bg-center relative flex flex-col justify-between"
                        >
                            <div className="absolute inset-0 bg-black/60 z-0" />

                            <div className="relative z-10 flex-1 flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-30 text-white gap-12 lg:gap-0">
                                <div className="flex items-center justify-start lg:pt-12">
                                    <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-playfair tracking-tight leading-tight max-w-4xl">
                                        {item.name}
                                    </h1>
                                </div>

                                <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-8">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full lg:w-3/4">
                                        {item.images.slice(2, 7).map((hero, index) => (
                                            <div key={'hero' + index} className="w-full flex flex-col">
                                                <img src={hero} className="hero-img rounded-xl shadow-xl h-40 sm:h-52 lg:h-64 xl:h-72 w-full object-cover" alt="" />
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => navigate(`/booking/${id}`)}
                                        className="w-full lg:w-auto bg-white text-black px-10 py-4 font-bold rounded-xl hover:bg-neutral-200 transition-all text-center tracking-wide shrink-0 shadow-lg"
                                    >
                                        Book now
                                    </button>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#0f0f0f] z-0" />
                        </section>

                        <div className="bg-[#0f0f0f] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-30 py-12 md:py-20">
                            <div className="flex items-center gap-4 mb-10 md:mb-16">
                                <div className="flex-1 h-px bg-white/20"></div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-playfair text-gray-400 tracking-wider text-center whitespace-normal px-2">
                                    ABOUT THE TOUR
                                </h2>
                                <div className="flex-1 h-px bg-white/20"></div>
                            </div>

                            <div className="relative flex flex-col w-full px-0 sm:px-4 md:px-10">
                                <div className="mb-12 md:mb-20 max-w-3xl mx-auto">
                                    <p className="text-neutral-300 text-base md:text-lg text-center leading-relaxed font-light">{item.description}</p>
                                </div>

                                <div className="relative">
                                    <div className="absolute left-4 md:left-1/2 top-2 bottom-0 w-px bg-white/20 -translate-x-1/2 md:translate-x-0"></div>

                                    {item.itinerary.map((stop, index) => {

                                        return (
                                            <div
                                                key={index}
                                                className={`relative flex flex-col md:flex-row items-stretch gap-8 lg:gap-12 timeline-item mb-16 pl-10 md:pl-0 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'
                                                    }`}
                                            >

                                                {/* Center dot - Locked left on mobile, perfectly centered on md+ screens */}
                                                <div className="absolute left-4 md:left-1/2 top-2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 z-10 ring-4 ring-cyan-950"></div>

                                                {/* Images Block - Generous flex sizing instead of rigid fractional scaling */}
                                                <div className="w-full md:flex-1 flex flex-col gap-3">
                                                    <img
                                                        src={item.images[(index * 2 + 7) % item.images.length]}
                                                        className="rounded-2xl h-52 sm:h-64 object-cover shadow-lg w-full max-w-xl md:ml-auto"
                                                        alt=""
                                                    />
                                                    {index % 2 === 0 && (
                                                        <img
                                                            src={item.images[(index * 2 + 8) % item.images.length]}
                                                            className="hidden sm:block rounded-2xl h-52 sm:h-64 object-cover shadow-lg w-full max-w-xl md:ml-auto"
                                                            alt=""
                                                        />
                                                    )}
                                                </div>

                                                {/* Content Block - Fixed padding offsets prevent overlaps on tablet widths */}
                                                <div className={`w-full md:flex-1 flex flex-col justify-center text-left ${index % 2 === 0 ? 'md:pl-8 lg:pl-12' : 'md:pr-8 lg:pr-12'
                                                    }`}>
                                                    <p className="text-cyan-400 font-semibold tracking-widest text-xs uppercase mb-1">{stop.days}</p>
                                                    <h3 className="text-white text-xl md:text-2xl font-bold font-playfair">{stop.location}</h3>
                                                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed mt-2 max-w-sm">
                                                        {stop.description}
                                                    </p>
                                                </div>

                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <section
                            style={{ backgroundImage: `url(${item.images[item.images.length - 1]})` }}
                            className="relative bg-cover bg-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-30 py-16 md:py-24"
                        >
                            <div className="absolute inset-0 bg-black/75 z-0" />
                            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-[#0f0f0f] z-0" />

                            <div className="relative z-10 flex items-center gap-4 mb-10 md:mb-16">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-playfair text-white whitespace-normal tracking-wide">
                                    WHAT'S INCLUDED
                                </h2>
                                <div className="flex-1 bg-white/20 h-px"></div>
                            </div>

                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-24">
                                {item.included.map((thing, index) => (
                                    <div key={'id' + index} className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col gap-3 hover:border-white/20 transition-all duration-300">
                                        <h3 className="text-white text-lg md:text-xl font-bold flex items-center gap-2">
                                            <span className="text-cyan-400">✦</span> {thing.title}
                                        </h3>
                                        <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-light">{thing.detail}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center lg:items-stretch gap-12 lg:gap-6">
                                <div className="w-full max-w-md backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
                                    <h2 className="text-white text-xl md:text-2xl font-semibold mb-1">Want to join us,</h2>
                                    <h2 className="text-white text-xl md:text-2xl font-semibold mb-6">but still have questions?</h2>
                                    <p className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-4">Leave a request</p>

                                    {enquirySent ? (
                                        <div className="flex flex-col items-center justify-center h-48 gap-3">
                                            <p className="text-4xl">✓</p>
                                            <p className="text-white text-lg font-semibold">We'll be in touch soon!</p>
                                            <p className="text-white/40 text-sm">Our team will contact you shortly.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleEnquiry} className="flex flex-col gap-4">
                                            <input value={enquiryForm.name} onChange={e => setEnquiryForm({ ...enquiryForm, name: e.target.value })} type="text" placeholder="Your name" className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/30 py-2 text-sm outline-none focus:border-cyan-400 transition-colors" />
                                            <input value={enquiryForm.phone} onChange={e => setEnquiryForm({ ...enquiryForm, phone: e.target.value })} type="text" placeholder="Phone number" className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/30 py-2 text-sm outline-none focus:border-cyan-400 transition-colors" />
                                            <input value={enquiryForm.comment} onChange={e => setEnquiryForm({ ...enquiryForm, comment: e.target.value })} type="text" placeholder="Comment" className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/30 py-2 text-sm outline-none focus:border-cyan-400 transition-colors" />
                                            <button type="submit" className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-neutral-200 transition-all mt-4 tracking-wide text-sm shadow-md">Send</button>
                                        </form>
                                    )}
                                </div>

                                <div className="w-full max-w-md lg:max-w-none lg:flex-1 grid grid-cols-2 gap-3 md:gap-4 max-h-[450px] items-center">
                                    <img src={item.images[2]} className="w-full h-40 sm:h-48 md:h-52 lg:h-56 xl:h-64 object-cover rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-300" alt="" />
                                    <img src={item.images[3]} className="w-full h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-2xl shadow-xl self-end hover:scale-[1.02] transition-transform duration-300" alt="" />
                                    <img src={item.images[4]} className="w-full h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-300" alt="" />
                                    <img src={item.images[5]} className="w-full h-40 sm:h-48 md:h-52 lg:h-56 xl:h-64 object-cover rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-300" alt="" />
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0a0a0a] z-0" />
                        </section>

                        <Footer />
                    </div>
                )
            })}
        </div>
    )
}