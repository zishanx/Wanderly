export default function Navbar() {
    return (
        <nav className="p-4 fixed top-0 w-full z-50">
            <div className="flex justify-between">
                <h2 className="font-bold text-2xl">Wanderly</h2>
                <ul className="flex gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl items-center p-2 text-white">
                    <li>Home</li>
                    <li>Packages</li>
                    <li>Gallery</li>
                    <li>How it works</li>
                    <li>Contact</li>
                </ul>
                <button className="p-2 bg-black text-white rounded">Book now</button>
            </div>
        </nav>
    )
}