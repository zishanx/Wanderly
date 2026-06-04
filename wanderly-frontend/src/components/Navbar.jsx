import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className=" px-30 py-4 fixed top-0 w-full z-50">
            <div className="flex justify-between">
                <h2 className="font-bold text-2xl text-white">Wanderly</h2>
                <ul className="flex gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl items-center p-2 text-white">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/packages">Packages</Link></li>
                    <li><a href="">Gallery</a></li>
                    <li><a href="">How it works</a></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                <button className="p-2 text-white rounded bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">Book now</button>
            </div>
        </nav>
    )
}