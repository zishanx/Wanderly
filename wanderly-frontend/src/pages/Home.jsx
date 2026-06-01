export default function Home() {
    return (
        <>
            <nav className="m-10 p-2">
                <div className="flex justify-between">
                    <h2 className="font-bold text-2xl">Wanderly</h2>
                    <ul className="flex gap-4">
                        <li>Home</li>
                        <li>Contact</li>
                        <li>About</li>
                    </ul>
                    <button className="p-2 bg-black text-white rounded">Book now</button>
                </div>
            </nav>



        </>
    )
}