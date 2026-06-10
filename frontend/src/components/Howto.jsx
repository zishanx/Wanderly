import { useState } from "react"

export default function HowToBook() {
    const [activeStep, setActiveStep] = useState(1)

    const steps = [
        {
            id: 1,
            title: "Choose a Package",
            description: "Select the tour that best fits your schedule and travel style."
        },
        {
            id: 2,
            title: "Check Availability",
            description: "Pick your preferred date and group size."
        },
        {
            id: 3,
            title: "Make a Reservation",
            description: "Confirm your booking securely online in minutes."
        },
        {
            id: 4,
            title: "Enjoy the Experience",
            description: "Arrive, explore, and create unforgettable memories."
        }
    ]

    const tags = [
        "Exploration", "Sunrise Explorer", "Tour Guide",
        "Adventure", "Sunrise Viewing"
    ]

    return (
        <section id="hiw" className="bg-white py-16 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 font-sans overflow-hidden">

            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 mb-8">
                    How to Book Your Tour
                </h2>

                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-xs md:text-sm text-neutral-500 font-medium">
                    {tags.map((tag, i) => (
                        <div key={i} className="flex items-center gap-1.5 whitespace-nowrap">
                            <span className="text-neutral-400 text-lg">✧</span>
                            <span>{tag}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-stretch gap-10 lg:gap-16">

                <div className="w-full lg:w-1/2 relative aspect-[4/5] sm:max-h-[550px] rounded-3xl overflow-hidden shadow-xl group">
                    <img
                        src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80"
                        alt="Mount Bromo adventure"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-x-4 bottom-4 backdrop-blur-md bg-white/20 border border-white/20 p-5 rounded-2xl flex items-center justify-between gap-4 shadow-lg">
                        <div className="text-white">
                            <p className="text-xs sm:text-sm leading-relaxed font-light drop-shadow-sm max-w-[240px] sm:max-w-xs">
                                Plan your adventure in minutes with our simple and secure booking process.
                            </p>
                        </div>
                        <button className="bg-white/90 text-neutral-900 hover:bg-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all shadow-md shrink-0">
                            Book now
                            <span className="text-xs transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                        </button>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 lg:py-4">
                    <div className="mb-2">
                        <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold block mb-1">
                            How it works
                        </span>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
                            Book Tour in 4 Easy Steps
                        </h3>
                    </div>

                    <div className="flex flex-col gap-3 w-full">
                        {steps.map((step) => {
                            const isActive = activeStep === step.id
                            return (
                                <div
                                    key={step.id}
                                    onClick={() => setActiveStep(step.id)}
                                    className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer border ${isActive
                                            ? "bg-neutral-50 border-neutral-100 shadow-sm"
                                            : "bg-transparent border-transparent hover:bg-neutral-50/50"
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border transition-all duration-300 ${isActive
                                            ? "bg-white text-neutral-900 border-neutral-200 shadow-sm"
                                            : "bg-neutral-50 text-neutral-500 border-neutral-100"
                                        }`}>
                                        {step.id}
                                    </div>

                                    <div className="flex-1 pt-1">
                                        <h4 className="font-bold text-base md:text-lg text-neutral-900 leading-tight mb-1">
                                            {step.title}
                                        </h4>
                                        <p className={`text-sm leading-relaxed transition-all duration-300 ${isActive ? "text-neutral-500" : "text-neutral-400"
                                            }`}>
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </section>
    )
}