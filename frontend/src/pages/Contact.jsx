// import { FacebookIcon, Linkedin, Twitter, Instagram } from "lucide-react"

export default function ContactSection() {
    return (
        <section className="relative w-full bg-[#f8f9fa] min-h-[60vh] lg:h-[80vh] flex items-center py-16 lg:py-0 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 overflow-hidden select-none">

            {/* Embedded Responsive SVG World Map Background */}
            <div className="absolute inset-0 w-full h-full opacity-[0.85] pointer-events-none flex items-center justify-center z-0">
                <svg
                    className="w-full h-auto min-w-[1000px] lg:min-w-0 max-h-full object-cover translate-x-12 lg:translate-x-32"
                    viewBox="0 0 1008 651"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Simplified light grey world map projection shape */}
                    <path
                        d="M170 220c-10-5-25-2-32 5-10 10-5 25 2 30s20-2 25-10 15-20 5-25zm40 110c-5-15-20-30-35-25s-15 25-5 40 30 10 40-15zm310-180c-20-20-60-10-70 15s10 45 35 45 55-35 35-60zm40 280c-15 0-25 15-20 35s25 25 35 10 5-35-15-45zm220-130c-30-10-70 10-65 45s50 40 75 15 20-50-10-60z"
                        fill="#e5e7eb"
                        opacity="0.7"
                    />
                    <path
                        d="M300 150h50v20h-30v30h-20zm120 40h40v40h-40zm-200 80h80v60h-80zm400-30h100v80h-100zm-50 180h60v90h-60zm180 80h50v50h-50z"
                        fill="#e5e7eb"
                    />

                    {/* Interactive Geolocation Pulse Rings */}
                    {/* London / Western Europe */}
                    <circle cx="550" cy="200" r="6" fill="#f8f9fa" stroke="#16a34a" strokeWidth="3" />
                    <circle cx="550" cy="200" r="12" stroke="#16a34a" strokeWidth="1" className="animate-ping opacity-40" />

                    {/* Central Europe */}
                    <circle cx="595" cy="235" r="6" fill="#f8f9fa" stroke="#16a34a" strokeWidth="3" />

                    {/* India - North/East Hub */}
                    <circle cx="755" cy="390" r="6" fill="#f8f9fa" stroke="#16a34a" strokeWidth="3" />
                    <circle cx="755" cy="390" r="12" stroke="#16a34a" strokeWidth="1" className="animate-ping opacity-40" />

                    {/* India - South Hub */}
                    <circle cx="748" cy="425" r="6" fill="#f8f9fa" stroke="#16a34a" strokeWidth="3" />
                </svg>
            </div>

            {/* Typography and Meta Info Content Block */}
            <div className="relative z-10 max-w-xl w-full flex flex-col tracking-tight text-neutral-950">
                <div className="mb-10 md:mb-14">
                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-medium tracking-tighter mb-4">
                        Hello!
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-neutral-600 font-normal leading-snug">
                        Talk to us to choose your perfect adventure.
                    </p>
                </div>

                <div className="flex flex-col gap-8 md:gap-10">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-2">
                            Phone
                        </span>
                        <a
                            href="tel:5544458631"
                            className="text-2xl sm:text-3xl font-medium text-[#16a34a] hover:opacity-80 transition-opacity"
                        >
                            554 4458 631
                        </a>
                    </div>

                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-2">
                            Email
                        </span>
                        <a
                            href="mailto:info@mantle-labs.com"
                            className="text-2xl sm:text-3xl font-medium text-[#16a34a] underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity break-all"
                        >
                            info@wanderly-labs.com
                        </a>
                    </div>

                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-4">
                            Social
                        </span>
                        <div className="flex items-center gap-6 text-neutral-900">
                            {/* Facebook */}
                            <a href="#" className="hover:text-[#16a34a] transition-colors" aria-label="Facebook">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a href="#" className="hover:text-[#16a34a] transition-colors" aria-label="LinkedIn">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>

                            {/* Twitter / X */}
                            <a href="#" className="hover:text-[#16a34a] transition-colors" aria-label="Twitter">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a href="#" className="hover:text-[#16a34a] transition-colors" aria-label="Instagram">
                                <svg className="w-5 h-5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}