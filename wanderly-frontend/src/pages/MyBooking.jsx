import { useEffect, useState } from "react"
import api from "../api/axios"
import Navbar from "../components/Navbar"

export default function MyBookings() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/booking/all')
                setBookings(response.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) return (
        <div className="min-h-screen bg-[#f0f9ff] flex items-center justify-center text-gray-400 font-dm">
            Loading your bookings...
        </div>
    )

    return (
        <div className="min-h-screen bg-[#0a0a0a] font-dm">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16">

                <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-2">My Bookings</h1>
                <p className="text-white/40 text-sm mb-8 md:mb-10">All your upcoming and past adventures</p>

                {bookings.length === 0 ? (
                    <div className="bg-white/5 rounded-2xl border border-white/10 p-8 md:p-16 text-center">
                        <p className="text-white/40 text-base md:text-lg mb-2">No bookings yet</p>
                        <p className="text-white/20 text-xs md:text-sm">Start exploring packages and book your first adventure!</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-5">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col sm:flex-row hover:border-white/20 transition-colors">

                                <img
                                    src={booking.package.images[0]}
                                    alt={booking.package.name}
                                    className="w-full sm:w-40 md:w-48 h-48 sm:h-auto object-cover shrink-0"
                                />

                                <div className="flex-1 p-5 md:p-6 flex flex-col justify-between gap-6 sm:gap-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="text-cyan-400 text-[10px] md:text-xs uppercase tracking-widest mb-1 truncate">{booking.package.destination}</p>
                                            <h2 className="font-playfair text-lg md:text-xl font-semibold text-white truncate sm:normal-case sm:whitespace-normal">{booking.package.name}</h2>
                                        </div>
                                        <span className={`text-[10px] md:text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${booking.paymentStatus === 'paid'
                                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            }`}>
                                            {booking.paymentStatus === 'paid' ? '✓ Paid' : '⏳ Pending'}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 sm:flex sm:items-center sm:gap-4 md:gap-6 border-t border-white/5 sm:border-t-0 pt-4 sm:pt-0">
                                        <div>
                                            <p className="text-white/30 text-[10px] md:text-xs uppercase tracking-widest mb-0.5">Departure</p>
                                            <p className="text-white text-xs md:text-sm font-semibold">
                                                {new Date(booking.selectedDate).toLocaleDateString('en-IN', {
                                                    day: 'numeric', month: 'short', year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="hidden sm:block w-px h-8 bg-white/10" />
                                        <div>
                                            <p className="text-white/30 text-[10px] md:text-xs uppercase tracking-widest mb-0.5">Travelers</p>
                                            <p className="text-white text-xs md:text-sm font-semibold">{booking.travelers}</p>
                                        </div>
                                        <div className="hidden sm:block w-px h-8 bg-white/10" />
                                        <div>
                                            <p className="text-white/30 text-[10px] md:text-xs uppercase tracking-widest mb-0.5">Total</p>
                                            <p className="text-cyan-400 text-xs md:text-sm font-bold Indian-Rupee">₹{booking.totalPrice.toLocaleString()}</p>
                                        </div>
                                        <div className="hidden sm:block w-px h-8 bg-white/10" />
                                        <div>
                                            <p className="text-white/30 text-[10px] md:text-xs uppercase tracking-widest mb-0.5">Duration</p>
                                            <p className="text-white text-xs md:text-sm font-semibold">{booking.package.duration}</p>
                                        </div>
                                    </div>
                                end text layout container</div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}