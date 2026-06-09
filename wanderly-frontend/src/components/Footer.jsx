import { Link, useNavigate } from "react-router-dom"

export default function Footer() {
    const navigate = useNavigate()

    return (
        <section className="px-6 sm:px-12 lg:px-20 py-12 md:py-20 border-t border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-5 w-full">

                <div className="flex flex-col gap-3">
                    <h1 className="text-black text-2xl font-bold">Wanderly</h1>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                        We provide travel experiences with expert local guides, safe transportation and unforgettable moments.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <h1 className="font-bold text-lg">Quick links</h1>
                    <ul className="text-gray-500 flex flex-col gap-2 text-sm">
                        <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
                        <li><Link to="/packages" className="hover:text-black transition-colors">Packages</Link></li>
                        <li><Link to="/login" className="hover:text-black transition-colors">Login</Link></li>
                        <li><Link to="/register" className="hover:text-black transition-colors">Register</Link></li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <h1 className="font-bold text-lg">Contact info</h1>
                    <ul className="text-gray-500 flex flex-col gap-2 text-sm">
                        <li><a href="mailto:hello@wanderly.com" className="hover:text-black transition-colors">hello@wanderly.com</a></li>
                        <li>+62 81 xx xx xx xx</li>
                        <li>East Java, Indonesia</li>
                    </ul>
                </div>

                <div className="flex flex-col items-start gap-4">
                    <div className="flex gap-2">
                        <button className="py-2 px-5 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors" onClick={() => navigate('/login')}>Login</button>
                        <button className="py-2 px-5 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors" onClick={() => navigate('/register')}>Register</button>
                    </div>
                    <div className="social-icons flex gap-2 pt-2">
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="shadow-sm border border-gray-100 p-2 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center w-9 h-9">
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                        <a href="https://x.com" target="_blank" rel="noreferrer" className="shadow-sm border border-gray-100 p-2 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center w-9 h-9">
                            <i className="fa-brands fa-x-twitter"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="shadow-sm border border-gray-100 p-2 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center w-9 h-9">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="shadow-sm border border-gray-100 p-2 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center w-9 h-9">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                    </div>
                </div>

            </div>

            <h1 className="text-gray-400 text-sm text-center pt-12 md:pt-20 border-t border-gray-100 mt-12">
                &copy; {new Date().getFullYear()} Wanderly. All rights reserved.
            </h1>
        </section>
    )
}