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
            <div className="max-w-4xl mx-auto px-6 py-16">

                <h1 className="font-playfair text-4xl font-bold text-white mb-2">My Bookings</h1>
                <p className="text-white/40 text-sm mb-10">All your upcoming and past adventures</p>

                {bookings.length === 0 ? (
                    <div className="bg-white/5 rounded-2xl border border-white/10 p-16 text-center">
                        <p className="text-white/40 text-lg mb-2">No bookings yet</p>
                        <p className="text-white/20 text-sm">Start exploring packages and book your first adventure!</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-5">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex hover:border-white/20 transition-colors">

                                {/* Package Image */}
                                <img
                                    src={booking.package.images[0]}
                                    alt={booking.package.name}
                                    className="w-48 h-48 object-cover"
                                />

                                {/* Details */}
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-cyan-400 text-xs uppercase tracking-widest mb-1">{booking.package.destination}</p>
                                            <h2 className="font-playfair text-xl font-semibold text-white">{booking.package.name}</h2>
                                        </div>
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${booking.paymentStatus === 'paid'
                                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            }`}>
                                            {booking.paymentStatus === 'paid' ? '✓ Paid' : '⏳ Pending'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6 mt-4">
                                        <div>
                                            <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Departure</p>
                                            <p className="text-white text-sm font-semibold">
                                                {new Date(booking.selectedDate).toLocaleDateString('en-IN', {
                                                    day: 'numeric', month: 'short', year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="w-px h-8 bg-white/10" />
                                        <div>
                                            <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Travelers</p>
                                            <p className="text-white text-sm font-semibold">{booking.travelers}</p>
                                        </div>
                                        <div className="w-px h-8 bg-white/10" />
                                        <div>
                                            <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Total</p>
                                            <p className="text-cyan-400 text-sm font-bold">₹{booking.totalPrice.toLocaleString()}</p>
                                        </div>
                                        <div className="w-px h-8 bg-white/10" />
                                        <div>
                                            <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Duration</p>
                                            <p className="text-white text-sm font-semibold">{booking.package.duration}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}