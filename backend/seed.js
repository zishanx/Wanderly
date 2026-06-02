import mongoose from "mongoose"
import dotenv from 'dotenv'
import Package from "./models/Package.js"

dotenv.config()

const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI)

    const data = [
        {
            name: "Mount Bromo Sunirse Trek",
            price: 256,
            destination: "Indonesia",
            images: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80'],
            duration: "3 Days",
            maxTraveler: 4,
            availableDate: new Date("2026-06-01")
        },
        {
            name: "Bali Rice Terrace Escape",
            price: 200,
            destination: "Indonesia",
            images: ['https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80'],
            duration: "5 Days",
            maxTraveler: 3,
            availableDate: new Date("2026-06-01")
        },
        {
            name: "Kashmir Vallery Explorer",
            price: 256,
            destination: "India",
            images: ['https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80'],
            duration: "7 Days",
            maxTraveler: 2,
            availableDate: new Date("2026-06-01")
        },
        {
            name: "Maldives Overwater Retreat",
            price: 700,
            destination: "Maldives",
            images: ['https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80'],
            duration: "4 Days",
            maxTraveler: 4,
            availableDate: new Date("2026-06-01")
        }
    ]

    await Package.deleteMany()
    await Package.insertMany(data)

    mongoose.disconnect()
    
    console.log("Done")
}


seed()