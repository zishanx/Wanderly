export default function Hero() {
    return (
        <section
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')` }}
            className="min-h-screen bg-cover bg-center relative flex items-center justify-center py-12 lg:py-0"
        >
            <div className="absolute inset-0 bg-black/50 w-full h-full z-0" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 flex flex-col justify-center items-center gap-10 lg:gap-16 text-white">
                
                <div className="text-center flex flex-col items-center gap-4 lg:gap-6">
                    <p className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-2 px-4 text-sm w-fit">
                        East Java's Natural Wonder
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight">
                        Unforgettable Mount Bromo <br /> 
                        <span className="font-bold">Sunrise Experience</span>
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row w-full gap-10 lg:gap-20 items-center justify-center">
                    
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl w-full max-w-sm lg:w-72 flex flex-col gap-5 p-5 justify-between h-fit">
                        <div className="flex items-center">
                            <img src="https://i.pravatar.cc/32?img=1" className="w-8 h-8 rounded-full border-2 border-white" alt="User 1" />
                            <img src="https://i.pravatar.cc/32?img=2" className="w-8 h-8 rounded-full border-2 border-white -ml-2" alt="User 2" />
                            <img src="https://i.pravatar.cc/32?img=3" className="w-8 h-8 rounded-full border-2 border-white -ml-2" alt="User 3" />
                            <img src="https://i.pravatar.cc/32?img=4" className="w-8 h-8 rounded-full border-2 border-white -ml-2" alt="User 4" />
                            <p className="w-8 h-8 rounded-full border-2 border-white -ml-2 text-center text-xs flex items-center justify-center bg-black/20">
                                +50
                            </p>
                            <p className="pl-3 text-sm font-medium">People Joined</p>
                        </div>
                        <p className="text-sm md:text-base text-white/90 leading-relaxed">
                            Travel through volcanic landscapes, golden skies, and timeless beauty with expertly guided Mount Bromo tours.
                        </p>
                        <button className="backdrop-blur-md bg-white/20 hover:bg-white/30 transition-all p-2.5 px-6 rounded-full border border-white/30 w-fit font-bold text-sm">
                            Book now
                        </button>
                    </div>

                    <div className="flex items-end justify-center gap-2 sm:gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
                        <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80"
                            className="w-20 sm:w-28 md:w-36 h-28 sm:h-36 md:h-44 object-cover rounded-2xl shrink-0" alt="Bromo 1" />
                        <img src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80"
                            className="w-20 sm:w-28 md:w-36 h-36 sm:h-48 md:h-60 object-cover rounded-2xl shrink-0" alt="Bromo 2" />
                        <img src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80"
                            className="w-20 sm:w-28 md:w-36 h-32 sm:h-44 md:h-52 object-cover rounded-2xl shrink-0" alt="Bromo 3" />
                        <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80"
                            className="w-20 sm:w-28 md:w-36 h-28 sm:h-36 md:h-44 object-cover rounded-2xl shrink-0" alt="Bromo 4" />
                    </div>

                </div>
            </div>
        </section>
    );
}