import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import api from "../api/axios"

export default function Booking() {
    const { id } = useParams()
    const [booking, setBooking] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [travelers, setTravelers] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`/package/get/one/${id}`)
            setBooking(response.data)
            console.log(response.data)
        }
        fetchData()
    }, [])

    const createOrder = async () => {
        if (!selectedDate) return setError("Please select a departure date")
        if (!travelers || travelers < 1) return setError("Please enter number of travelers")
        setLoading(true)
        setError("")
        try {
            const response = await api.post('/booking/create', {
                selectedDate,
                travelers,
                packageId: booking._id
            })
            const order = response.data
            const option = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                order_id: order.id,
                handler: async function (paymentResponse) {
                    await api.post('/booking/verify', {
                        razorpayOrderId: paymentResponse.razorpay_order_id,
                        razorpayPaymentId: paymentResponse.razorpay_payment_id,
                        razorpaySignature: paymentResponse.razorpay_signature
                    })
                    navigate('/my-bookings')
                }
            }
            const rzp = new window.Razorpay(option)
            rzp.open()
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    if (!booking) return <div className="min-h-screen bg-white flex items-center justify-center text-gray-400 font-dm">Loading...</div>

    const totalPrice = booking.price * travelers

    return (
        <div className="min-h-screen bg-[#f0f9ff] text-gray-900 font-dm">

            <div className="relative h-48 sm:h-64 w-full">
                <img src={booking.images[0]} alt={booking.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-cyan-900/40" />
                <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 pb-6 sm:pb-8">
                    <p className="text-cyan-200 text-xs uppercase tracking-widest mb-1">{booking.destination}</p>
                    <h1 className="font-playfair text-white text-2xl sm:text-4xl font-bold leading-tight">{booking.name}</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl px-6 py-4 shadow-sm mb-8 md:mb-10 border border-cyan-100">
                    <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
                        <div className="flex items-center gap-3">
                            <span className="text-cyan-500 text-sm">⏱</span>
                            <span className="text-gray-500 text-sm">{booking.duration}</span>
                        </div>
                        <div className="hidden sm:block w-px h-6 bg-gray-200 ml-3" />
                    </div>
                    <div className="sm:hidden h-px w-full bg-gray-100" />
                    <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
                        <div className="flex items-center gap-3">
                            <span className="text-cyan-500 text-sm">👥</span>
                            <span className="text-gray-500 text-sm">Max {booking.maxTraveler} travelers</span>
                        </div>
                        <div className="hidden sm:block w-px h-6 bg-gray-200 ml-3" />
                    </div>
                    <div className="sm:hidden h-px w-full bg-gray-100" />
                    <div className="flex justify-between sm:justify-start items-center w-full sm:w-auto">
                        <span className="text-gray-400 text-xs sm:hidden">Price:</span>
                        <div>
                            <span className="text-cyan-600 font-semibold text-lg">₹{booking.price.toLocaleString()}</span>
                            <span className="text-gray-400 text-sm"> / person</span>
                        </div>
                    </div>
                </div>

                <div className="mb-8 md:mb-10">
                    <h2 className="font-playfair text-xl sm:text-2xl font-semibold mb-1 text-gray-800">Select Departure Date</h2>
                    <p className="text-gray-400 text-xs sm:text-sm mb-5">Pick from available departure slots</p>
                    <div className="grid grid-cols-1 [@media(min-width:400px)]:grid-cols-2 sm:grid-cols-3 gap-3">
                        {booking.departureDate.map((item, index) => {
                            const date = new Date(item.date)
                            const isSelected = selectedDate === item.date
                            const noSlots = item.slots === 0
                            return (
                                <button
                                    key={index}
                                    disabled={noSlots}
                                    onClick={() => setSelectedDate(item.date)}
                                    className={`p-4 rounded-xl border text-left transition-all
                                ${noSlots
                                            ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                                            : isSelected
                                                ? 'border-cyan-400 bg-cyan-50 shadow-md shadow-cyan-100'
                                                : 'border-gray-200 bg-white hover:border-cyan-300 hover:shadow-sm'
                                        }`}
                                >
                                    <p className={`font-semibold text-sm ${isSelected ? 'text-cyan-700' : 'text-gray-800'}`}>
                                        {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>
                                    <p className={`text-xs mt-1 ${noSlots ? 'text-red-400' : isSelected ? 'text-cyan-500' : 'text-gray-400'}`}>
                                        {noSlots ? 'Sold out' : `${item.slots} slots left`}
                                    </p>
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="mb-8 md:mb-10">
                    <h2 className="font-playfair text-xl sm:text-2xl font-semibold mb-3 sm:mb-5 text-gray-800">Number of Travelers</h2>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setTravelers(t => Math.max(1, t - 1))}
                            className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-600 text-lg hover:border-cyan-400 hover:text-cyan-500 transition-colors"
                        >−</button>
                        <span className="text-2xl font-semibold text-gray-800 w-8 text-center">{travelers}</span>
                        <button
                            onClick={() => setTravelers(t => Math.min(booking.maxTraveler, t + 1))}
                            className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-600 text-lg hover:border-cyan-400 hover:text-cyan-500 transition-colors"
                        >+</button>
                        <span className="text-gray-400 text-sm ml-2">Max {booking.maxTraveler}</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-cyan-100 shadow-sm px-6 sm:px-8 py-5 sm:py-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Total Amount</p>
                        <p className="font-playfair text-2xl sm:text-3xl font-bold text-cyan-600">₹{totalPrice.toLocaleString()}</p>
                        <p className="text-gray-400 text-xs mt-1">{travelers} traveler{travelers > 1 ? 's' : ''} × ₹{booking.price.toLocaleString()}</p>
                    </div>
                    <div className="text-left md:text-right w-full md:w-auto">
                        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
                        <button
                            onClick={createOrder}
                            disabled={loading}
                            className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-400 text-white font-semibold text-sm px-10 py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-cyan-200"
                        >
                            {loading ? "Processing..." : "Confirm & Pay →"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}