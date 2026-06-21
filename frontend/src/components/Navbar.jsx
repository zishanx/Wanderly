import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { useState } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="px-6 md:px-30 py-4 fixed top-0 w-full z-50">
            <div className="grid grid-cols-2 md:grid-cols-3 items-center">
                <h2 className="font-bold text-2xl text-white">Wanderly</h2>

                {/* Desktop Menu */}
                <ul className="hidden md:flex justify-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl items-center p-2 text-white">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/packages">Packages</Link></li>
                    <li><Link to="/hiw">How it works</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>

                {/* Desktop Buttons */}
                <div className="hidden md:flex justify-end gap-2">
                    {user?.isAdmin && (
                        <button
                            className="p-2 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl"
                            onClick={() => navigate('/dashboard')}
                        >
                            Dashboard
                        </button>
                    )}
                    {user ? (
                        <button
                            className="p-2 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            className="p-2 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    )}
                </div>

                {/* Hamburger */}
                <button
                    className="md:hidden text-white focus:outline-none justify-self-end"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden mt-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col gap-3 text-white">
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/packages" onClick={() => setMenuOpen(false)}>Packages</Link>
                    <a href="">Gallery</a>
                    <a href="">How it works</a>
                    <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                    <hr className="border-white/20" />
                    {user?.isAdmin && (
                        <button
                            className="text-left"
                            onClick={() => { navigate('/dashboard'); setMenuOpen(false); }}
                        >
                            Dashboard
                        </button>
                    )}
                    {user ? (
                        <button
                            className="text-left"
                            onClick={() => { logout(); setMenuOpen(false); }}
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            className="text-left"
                            onClick={() => { navigate('/login'); setMenuOpen(false); }}
                        >
                            Login
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
}