import { useEffect, useState } from "react"
import api from "../api/axios"
import Navbar from "../components/Navbar"

const emptyForm = {
    name: '',
    price: '',
    destination: '',
    duration: '',
    maxTraveler: '',
    description: '',
    things: [''],
    images: [''],
    departureDate: [{ date: '', slots: '' }],
    included: [{ title: '', detail: '' }],
    itinerary: [{ days: '', location: '', description: '' }]
}

export default function AdminDashboard() {
    const [bookings, setBookings] = useState([])
    const [packages, setPackages] = useState([])
    const [activeTab, setActiveTab] = useState('bookings')
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [editingPackage, setEditingPackage] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bookingsRes, packagesRes] = await Promise.all([
                    api.get('/admin/all'),
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

    const openAddModal = () => {
        setEditingPackage(null)
        setForm(emptyForm)
        setModalOpen(true)
    }

    const openEditModal = (pkg) => {
        setEditingPackage(pkg)
        setForm({
            name: pkg.name,
            price: pkg.price,
            destination: pkg.destination,
            duration: pkg.duration,
            maxTraveler: pkg.maxTraveler,
            description: pkg.description,
            things: pkg.things.length ? pkg.things : [''],
            images: pkg.images.length ? pkg.images : [''],
            departureDate: pkg.departureDate.length ? pkg.departureDate.map(d => ({
                date: d.date?.slice(0, 10),
                slots: d.slots
            })) : [{ date: '', slots: '' }],
            included: pkg.included.length ? pkg.included : [{ title: '', detail: '' }],
            itinerary: pkg.itinerary.length ? pkg.itinerary : [{ days: '', location: '', description: '' }]
        })
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
        setEditingPackage(null)
        setForm(emptyForm)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleStringArray = (field, index, value) => {
        const updated = [...form[field]]
        updated[index] = value
        setForm({ ...form, [field]: updated })
    }

    const addStringArrayItem = (field) => {
        setForm({ ...form, [field]: [...form[field], ''] })
    }

    const removeStringArrayItem = (field, index) => {
        const updated = form[field].filter((_, i) => i !== index)
        setForm({ ...form, [field]: updated })
    }

    const handleObjectArray = (field, index, key, value) => {
        const updated = [...form[field]]
        updated[index] = { ...updated[index], [key]: value }
        setForm({ ...form, [field]: updated })
    }

    const addObjectArrayItem = (field, template) => {
        setForm({ ...form, [field]: [...form[field], template] })
    }

    const removeObjectArrayItem = (field, index) => {
        const updated = form[field].filter((_, i) => i !== index)
        setForm({ ...form, [field]: updated })
    }

    const handleSubmit = async () => {
        setSubmitting(true)
        try {
            if (editingPackage) {
                const res = await api.put(`/package/update/${editingPackage._id}`, form)
                setPackages(packages.map(p => p._id === editingPackage._id ? res.data : p))
            } else {
                const res = await api.post('/package/new', form)
                setPackages([...packages, res.data])
            }
            closeModal()
        } catch (err) {
            console.error(err)
        } finally {
            setSubmitting(false)
        }
    }

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
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-16">

                <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
                <p className="text-white/40 text-sm mb-8 md:mb-10">Manage bookings and packages</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 md:mb-10">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6">
                        <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Total Bookings</p>
                        <p className="font-playfair text-2xl md:text-3xl font-bold text-white">{bookings.length}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6">
                        <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Total Packages</p>
                        <p className="font-playfair text-2xl md:text-3xl font-bold text-white">{packages.length}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6">
                        <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Total Revenue</p>
                        <p className="font-playfair text-2xl md:text-3xl font-bold text-cyan-400">
                            ₹{bookings.filter(b => b.paymentStatus === 'paid').reduce((acc, b) => acc + b.totalPrice, 0).toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center mb-8">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`flex-1 sm:flex-none text-center px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'bookings' ? 'bg-cyan-500 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                        >
                            Bookings
                        </button>
                        <button
                            onClick={() => setActiveTab('packages')}
                            className={`flex-1 sm:flex-none text-center px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'packages' ? 'bg-cyan-500 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                        >
                            Packages
                        </button>
                    </div>
                    {activeTab === 'packages' && (
                        <button
                            onClick={openAddModal}
                            className="w-full sm:w-auto text-center px-5 py-2 rounded-lg bg-cyan-500 text-white text-sm font-semibold hover:bg-cyan-400 transition-colors"
                        >
                            + Add Package
                        </button>
                    )}
                </div>

                {activeTab === 'bookings' && (
                    <div className="flex flex-col gap-3">
                        {bookings.length === 0 ? (
                            <p className="text-white/30 text-sm">No bookings yet.</p>
                        ) : bookings.map((booking) => (
                            <div key={booking._id} className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0 hover:border-white/20 transition-colors">
                                <div className="flex items-center gap-4">
                                    <img src={booking.package?.images[0]} className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-cover shrink-0" alt="" />
                                    <div className="min-w-0">
                                        <p className="text-white font-semibold text-sm truncate">{booking.package?.name}</p>
                                        <p className="text-white/40 text-xs mt-0.5 truncate">{booking.user?.name} · {booking.user?.email}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:items-center gap-4 lg:gap-8 border-t border-white/5 lg:border-t-0 pt-4 lg:pt-0">
                                    <div>
                                        <p className="text-white/30 text-xs uppercase tracking-widest mb-0.5">Date</p>
                                        <p className="text-white text-xs md:text-sm font-medium">{new Date(booking.selectedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/30 text-xs uppercase tracking-widest mb-0.5">Travelers</p>
                                        <p className="text-white text-xs md:text-sm font-medium">{booking.travelers}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/30 text-xs uppercase tracking-widest mb-0.5">Amount</p>
                                        <p className="text-cyan-400 text-xs md:text-sm font-bold">₹{booking.totalPrice?.toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center lg:block col-span-2 sm:col-span-1 justify-end sm:justify-start">
                                        <span className={`text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full ${booking.paymentStatus === 'paid' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                            {booking.paymentStatus === 'paid' ? '✓ Paid' : '⏳ Pending'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'packages' && (
                    <div className="flex flex-col gap-3">
                        {packages.map((pkg) => (
                            <div key={pkg._id} className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 hover:border-white/20 transition-colors">
                                <div className="flex items-center gap-4">
                                    <img src={pkg.images[0]} className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-cover shrink-0" alt="" />
                                    <div className="min-w-0">
                                        <p className="text-white font-semibold text-sm truncate">{pkg.name}</p>
                                        <p className="text-white/40 text-xs mt-0.5 truncate">{pkg.destination} · {pkg.duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-start gap-6 md:gap-8 border-t border-white/5 sm:border-t-0 pt-3 sm:pt-0">
                                    <div className="flex gap-6 md:gap-8">
                                        <div>
                                            <p className="text-white/30 text-xs uppercase tracking-widest mb-0.5">Price</p>
                                            <p className="text-cyan-400 text-xs md:text-sm font-bold">₹{pkg.price.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/30 text-xs uppercase tracking-widest mb-0.5">Max</p>
                                            <p className="text-white text-xs md:text-sm font-medium">{pkg.maxTraveler} travelers</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEditModal(pkg)}
                                            className="px-3.5 py-1.5 md:px-4 md:py-2 rounded-lg bg-white/5 text-white/70 border border-white/10 text-xs font-semibold hover:bg-white/10 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(pkg._id)}
                                            className="px-3.5 py-1.5 md:px-4 md:py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold hover:bg-red-500/20 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-6 md:py-10 px-4">
                    <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl p-5 md:p-8 my-auto">
                        <div className="flex justify-between items-center mb-6 md:mb-8">
                            <h2 className="font-playfair text-xl md:text-2xl font-bold text-white">
                                {editingPackage ? 'Edit Package' : 'Add Package'}
                            </h2>
                            <button onClick={closeModal} className="text-white/40 hover:text-white text-lg">✕</button>
                        </div>

                        <div className="flex flex-col gap-5">

                            {[
                                { label: 'Name', name: 'name', type: 'text' },
                                { label: 'Price (₹)', name: 'price', type: 'number' },
                                { label: 'Destination', name: 'destination', type: 'text' },
                                { label: 'Duration', name: 'duration', type: 'text' },
                                { label: 'Max Travelers', name: 'maxTraveler', type: 'number' },
                            ].map(field => (
                                <div key={field.name}>
                                    <label className="text-white/50 text-xs uppercase tracking-widest mb-1 block">{field.label}</label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={form[field.name]}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="text-white/50 text-xs uppercase tracking-widest mb-1 block">Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 resize-none"
                                />
                            </div>

                            <div>
                                <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">Things to Do</label>
                                {form.things.map((item, i) => (
                                    <div key={i} className="flex gap-2 mb-2">
                                        <input
                                            value={item}
                                            onChange={e => handleStringArray('things', i, e.target.value)}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                                        />
                                        <button onClick={() => removeStringArrayItem('things', i)} className="text-red-400 text-xs px-2">✕</button>
                                    </div>
                                ))}
                                <button onClick={() => addStringArrayItem('things')} className="text-cyan-400 text-xs mt-1">+ Add</button>
                            </div>

                            <div>
                                <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">Image URLs</label>
                                {form.images.map((item, i) => (
                                    <div key={i} className="flex gap-2 mb-2">
                                        <input
                                            value={item}
                                            onChange={e => handleStringArray('images', i, e.target.value)}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                                        />
                                        <button onClick={() => removeStringArrayItem('images', i)} className="text-red-400 text-xs px-2">✕</button>
                                    </div>
                                ))}
                                <button onClick={() => addStringArrayItem('images')} className="text-cyan-400 text-xs mt-1">+ Add</button>
                            </div>

                            <div>
                                <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">Departure Dates</label>
                                {form.departureDate.map((item, i) => (
                                    <div key={i} className="flex gap-2 mb-2">
                                        <input
                                            type="date"
                                            value={item.date}
                                            onChange={e => handleObjectArray('departureDate', i, 'date', e.target.value)}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2 text-white text-xs md:text-sm focus:outline-none focus:border-cyan-500/50"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Slots"
                                            value={item.slots}
                                            onChange={e => handleObjectArray('departureDate', i, 'slots', e.target.value)}
                                            className="w-20 md:w-24 bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2 text-white text-xs md:text-sm focus:outline-none focus:border-cyan-500/50"
                                        />
                                        <button onClick={() => removeObjectArrayItem('departureDate', i)} className="text-red-400 text-xs px-2">✕</button>
                                    </div>
                                ))}
                                <button onClick={() => addObjectArrayItem('departureDate', { date: '', slots: '' })} className="text-cyan-400 text-xs mt-1">+ Add</button>
                            </div>

                            <div>
                                <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">What's Included</label>
                                {form.included.map((item, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row gap-2 mb-2 p-2 sm:p-0 border border-white/5 sm:border-none rounded-xl">
                                        <input
                                            placeholder="Title"
                                            value={item.title}
                                            onChange={e => handleObjectArray('included', i, 'title', e.target.value)}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                                        />
                                        <div className="flex gap-2 flex-1">
                                            <input
                                                placeholder="Detail"
                                                value={item.detail}
                                                onChange={e => handleObjectArray('included', i, 'detail', e.target.value)}
                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                                            />
                                            <button onClick={() => removeObjectArrayItem('included', i)} className="text-red-400 text-xs px-2">✕</button>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => addObjectArrayItem('included', { title: '', detail: '' })} className="text-cyan-400 text-xs mt-1">+ Add</button>
                            </div>

                            <div>
                                <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">Itinerary</label>
                                {form.itinerary.map((item, i) => (
                                    <div key={i} className="flex flex-col gap-2 mb-4 p-3 border border-white/10 rounded-xl">
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <input
                                                placeholder="Days (e.g. Day 1-2)"
                                                value={item.days}
                                                onChange={e => handleObjectArray('itinerary', i, 'days', e.target.value)}
                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                                            />
                                            <div className="flex gap-2 flex-1">
                                                <input
                                                    placeholder="Location"
                                                    value={item.location}
                                                    onChange={e => handleObjectArray('itinerary', i, 'location', e.target.value)}
                                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                                                />
                                                <button onClick={() => removeObjectArrayItem('itinerary', i)} className="text-red-400 text-xs px-2">✕</button>
                                            </div>
                                        </div>
                                        <textarea
                                            placeholder="Description"
                                            value={item.description}
                                            onChange={e => handleObjectArray('itinerary', i, 'description', e.target.value)}
                                            rows={2}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50 resize-none"
                                        />
                                    </div>
                                ))}
                                <button onClick={() => addObjectArrayItem('itinerary', { days: '', location: '', description: '' })} className="text-cyan-400 text-xs mt-1">+ Add</button>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="w-full py-3 rounded-xl bg-cyan-500 text-white font-semibold text-sm hover:bg-cyan-400 transition-colors disabled:opacity-50 mt-2"
                            >
                                {submitting ? 'Saving...' : editingPackage ? 'Update Package' : 'Add Package'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}