import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from '../api/axios.js'

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        const registering = async () => {
            try {
                await api.post('/auth/register', form)
                navigate('/login')
            } catch (err) {
                setError(err.response?.data?.message || "Something went wrong")
            } finally {
                setLoading(false)
            }
        }
        registering()
    }

    return (
        <div className="min-h-screen flex">

            {/* Left — Adventure Photo */}
            <div className="hidden lg:flex w-1/2 relative">
                <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80"
                    alt="Adventure"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <h1 className="font-playfair text-white text-4xl font-bold leading-tight mb-3">
                        Every journey<br />starts with one step.
                    </h1>
                    <p className="text-white/70 text-sm font-dm">
                        Create your account and start exploring with Wanderly.
                    </p>
                </div>
            </div>

            {/* Right — Form */}
            <div className="w-full lg:w-1/2 bg-[#0a0a0a] flex items-center justify-center px-8 py-16">
                <div className="w-full max-w-md">

                    <p className="font-playfair text-white text-2xl font-bold mb-10 tracking-wide">
                        Wanderly
                    </p>

                    <h2 className="font-playfair text-white text-3xl font-semibold mb-2">
                        Create account
                    </h2>
                    <p className="text-white/40 font-dm text-sm mb-8">
                        Already have an account?{' '}
                        <Link to="/login" className="text-amber-400 hover:text-amber-300 transition-colors">
                            Sign in
                        </Link>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-white/60 text-xs font-dm uppercase tracking-widest mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-lg px-4 py-3 text-sm font-dm focus:outline-none focus:border-amber-400/60 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-white/60 text-xs font-dm uppercase tracking-widest mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-lg px-4 py-3 text-sm font-dm focus:outline-none focus:border-amber-400/60 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-white/60 text-xs font-dm uppercase tracking-widest mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-lg px-4 py-3 text-sm font-dm focus:outline-none focus:border-amber-400/60 transition-colors"
                            />
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm font-dm">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-amber-400 hover:bg-amber-300 text-black font-dm font-semibold text-sm py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}