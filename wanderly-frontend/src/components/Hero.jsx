export default function Hero() {
    return (


        <section
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')` }}
            className="h-screen bg-cover bg-center relative "
        >
            <div className="absolute inset-0 bg-black/50 w-full h-screen flex
                pt-24 px-20 justify-center flex-col text-white">
                <div className="pb-20 text-white text-center flex flex-col items-center gap-6">
                    <p className="rounded bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 w-fit">East Java's Natural Wonder</p>
                    <h1 className="text-6xl">Unforgettable Mount Bromo <br /> <span className="font-bold">Sunrise Experience</span></h1>
                </div>
                <div className="flex w-full gap-40 items-center justify-center">
                    <div className="bg-white/10 backdrop-blur-md border border-white rounded-2xl  w-72 flex flex-col gap-5 p-5 justify-between h-fit">
                        <div className="flex items-center">
                            <img src="https://i.pravatar.cc/32?img=1" className="w-8 h-8 rounded-full border-2 border-white" />
                            <img src="https://i.pravatar.cc/32?img=2" className="w-8 h-8 rounded-full border-2 border-white -ml-2" />
                            <img src="https://i.pravatar.cc/32?img=3" className="w-8 h-8 rounded-full border-2 border-white -ml-2" />
                            <img src="https://i.pravatar.cc/32?img=4" className="w-8 h-8 rounded-full border-2 border-white -ml-2" />
                            <p className="w-8 h-8 rounded-full border-2 border-white -ml-2 text-center text-xs flex items-center justify-center ">+50</p>
                            <p className="pl-2 text-sm">People Joined</p>
                        </div>
                        <p>Travel through volcnic landscapes, golden skies, and timeless beauty with expertly guided Mount Bromo tours</p>
                        <button className="backdrop-blur-md bg-white/10 p-2 rounded-full border border-white-2 w-fit font-bold">Book now</button>
                    </div>
                    <div className="w-1/2 flex items-end justify-end gap-3 pr-0 ">
                        <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80"
                            className="w-36 h-44 object-cover rounded-2xl" />
                        <img src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80"
                            className="w-36 h-60 object-cover rounded-2xl" />
                        <img src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80"
                            className="w-36 h-52 object-cover rounded-2xl" />
                        <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80"
                            className="w-36 h-44 object-cover rounded-2xl" />
                    </div>
                </div>
            </div>
        </section>
    )
}