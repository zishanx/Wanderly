import { useAuth } from '../context/Authcontext'
import { useState } from 'react'
import api from '../api/axios.js'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {
            const response = await api.post('/auth/login', form)
            const { token, user } = response.data
            login(token, user)
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex">

            {/* Left — Adventure Photo */}
            <div className="hidden lg:flex w-1/2 relative">
                <img
                    src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80"
                    alt="Adventure"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <h1 className="font-playfair text-white text-4xl font-bold leading-tight mb-3">
                        The world is<br />waiting for you.
                    </h1>
                    <p className="text-white/70 text-sm font-dm">
                        Sign in to continue your journey with Wanderly.
                    </p>
                </div>
            </div>

            {/* Right — Form */}
            <div className="w-full lg:w-1/2 bg-[#0a0a0a] flex items-center justify-center px-8 py-16">
                <div className="w-full max-w-md">

                    {/* Logo */}
                    <p className="font-playfair text-white text-2xl font-bold mb-10 tracking-wide">
                        Wanderly
                    </p>

                    <h2 className="font-playfair text-white text-3xl font-semibold mb-2">
                        Welcome back
                    </h2>
                    <p className="text-white/40 font-dm text-sm mb-8">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-amber-400 hover:text-amber-300 transition-colors">
                            Sign up
                        </Link>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
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
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}