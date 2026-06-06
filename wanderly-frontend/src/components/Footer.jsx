import { Link, useNavigate } from "react-router-dom"

export default function Footer() {

    const navigate = useNavigate()
    return (


        <section className="px-50 py-20 ">
            <div className="flex gap-5  justify-between ">
                <div className="w-1/3">
                    <h1 className="text-black text-2xl font-bold">Wanderly</h1>
                    <p className="text-gray-500">We provide travel experiences with expert local guides, safe transportation and unfrogettable moments.</p>
                </div>
                <div>
                    <h1 className="font-bold text-lg">Quick links</h1>
                    <ul className="text-gray-500">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/packages">Packages</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                </div>

                <div>
                    <h1 className="font-bold text-lg">Contact info</h1>
                    <ul className="text-gray-400">
                        <li><a href="">hello@wanderly.com</a></li>
                        <li>+62 81 xx xx xx xx</li>
                        <li>East Java, Indonesia</li>
                    </ul>
                </div>

                <div className="flex flex-col  items-start gap-4">
                    <div className="flex gap-2">
                        <button className="py-2 px-4 bg-black text-white rounded-full " onClick={() => { navigate('/login') }}>Login</button>
                        <button className="py-2 px-4 bg-black text-white rounded-full" onClick={() => { navigate('/register') }}>Register</button>
                    </div>
                    <div className="social-icons flex gap-2 pt-2 px-1">
                        <a href="https://youtube.com" className="shadow p-2 rounded-full">
                            <i className="fa-brands fa-youtube"></i>
                        </a>

                        <a href="https://x.com" className="shadow p-2 rounded-full">
                            <i className="fa-brands fa-x-twitter"></i>
                        </a>

                        <a href="https://instagram.com" className="shadow p-2 rounded-full">
                            <i className="fa-brands fa-instagram"></i>
                        </a>

                        <a href="https://facebook.com" className="shadow p-2 rounded-full">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                    </div>

                </div>
            </div>
            <h1 className="font-bold text-lg text-center pt-20">2026 Wanderly.All right reserverd</h1>
        </section>
    )
}