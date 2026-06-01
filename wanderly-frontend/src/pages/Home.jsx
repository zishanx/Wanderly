import Navbar from "../components/Navbar"

// // Hero
// https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80
// // Packages
// https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80
// https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80
// https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80
// https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80
// https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80
export default function Home() {
    return (
        <>

            <Navbar></Navbar>

            <section
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')` }}
                className="h-screen bg-cover bg-center relative"
            >
                <div className="absolute inset-0 bg-black/50"></div>
            </section>



        </>
    )
}