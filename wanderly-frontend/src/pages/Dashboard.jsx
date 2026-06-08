import { useEffect, useState } from "react"
import api from "../api/axios"
import Navbar from "../components/Navbar"

export default function AdminDashboard() {
    const [bookings, setBookings] = useState([])
    const [packages, setPackages] = useState([])
    const [activeTab, setActiveTab] = useState('bookings')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bookingsRes, packagesRes] = await Promise.all([
                    api.get('/booking/admin/all'),
                    api.get('/package/get/all')
                ])
                setBookings(bookingsRes.data)
                setPackages(packagesRes.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleDelete = async (id) => {
        if (!confirm("Delete this package?")) return
        try {
            await api.delete(`/package/delete/${id}`)
            setPackages(packages.filter(p => p._id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white/40 font-dm">
            Loading...
        </div>
    )

    return (
        <div className="min-h-screen bg-[#0a0a0a] font-dm">
            <Navbar />
            <div className="max-w-6xl mx-auto px-6 py-16">

                <h1 className="font-playfair text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
                <p className="text-white/40 text-sm mb-10">Manage bookings and packages</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Total Bookings</p>
                        <p className="font-playfair text-3xl font-bold text-white">{bookings.length}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Total Packages</p>
                        <p className="font-playfair text-3xl font-bold text-white">{packages.length}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Total Revenue</p>
                        <p className="font-playfair text-3xl font-bold text-cyan-400">
                            ₹{bookings.filter(b => b.paymentStatus === 'paid').reduce((acc, b) => acc + b.totalPrice, 0).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8">
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${
                            activeTab === 'bookings'
                                ? 'bg-cyan-500 text-white'
                                : 'bg-white/5 text-white/50 hover:bg-white/10'
                        }`}
                    >
                        Bookings
                    </button>
                    <button
                        onClick={() => setActiveTab('packages')}
                        className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${
                            activeTab === 'packages'
                                ? 'bg-cyan-500 text-white'
                                : 'bg-white/5 text-white/50 hover:bg-white/10'
                        }`}
                    >
                        Packages
                    </button>
                </div>

                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                    <div className="flex flex-col gap-3">
                        {bookings.length === 0 ? (
                            <p className="text-white/30 text-sm">No bookings yet.</p>
                        ) : bookings.map((booking) => (
                            <div key={booking._id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between hover:border-white/20 transition-colors">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={booking.package?.images[0]}
                                        className="w-14 h-14 rounded-xl object-cover"
                                    />
                                    <div>
                                        <p className="text-white font-semibold text-sm">{booking.package?.name}</p>
                                        <p className="text-white/40 text-xs mt-0.5">{booking.user?.name} · {booking.user?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div>
                                        <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Date</p>
                                        <p className="text-white text-sm">
                                            {new Date(booking.selectedDate).toLocaleDateString('en-IN', {
                                                day: 'numeric', month: 'short', year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Travelers</p>
                                        <p className="text-white text-sm">{booking.travelers}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Amount</p>
                                        <p className="text-cyan-400 text-sm font-bold">₹{booking.totalPrice?.toLocaleString()}</p>
                                    </div>
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                        booking.paymentStatus === 'paid'
                                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                    }`}>
                                        {booking.paymentStatus === 'paid' ? '✓ Paid' : '⏳ Pending'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Packages Tab */}
                {activeTab === 'packages' && (
                    <div className="flex flex-col gap-3">
                        {packages.map((pkg) => (
                            <div key={pkg._id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between hover:border-white/20 transition-colors">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={pkg.images[0]}
                                        className="w-14 h-14 rounded-xl object-cover"
                                    />
                                    <div>
                                        <p className="text-white font-semibold text-sm">{pkg.name}</p>
                                        <p className="text-white/40 text-xs mt-0.5">{pkg.destination} · {pkg.duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div>
                                        <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Price</p>
                                        <p className="text-cyan-400 text-sm font-bold">₹{pkg.price.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Max</p>
                                        <p className="text-white text-sm">{pkg.maxTraveler} travelers</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(pkg._id)}
                                        className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold hover:bg-red-500/20 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}