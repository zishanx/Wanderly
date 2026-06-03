import mongoose from "mongoose"
import dotenv from 'dotenv'
import Package from "./models/Package.js"

dotenv.config()

const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI)

    const data = [
        {
            name: "Mount Bromo Sunrise Trek",
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
            name: "Kashmir Valley Explorer",
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
        },
        {
            name: "Santorini Sunset Cruise",
            price: 850,
            destination: "Greece",
            images: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80'],
            duration: "5 Days",
            maxTraveler: 6,
            availableDate: new Date("2026-07-01")
        },
        {
            name: "Patagonia Wilderness Trek",
            price: 1200,
            destination: "Argentina",
            images: ['https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80'],
            duration: "10 Days",
            maxTraveler: 3,
            availableDate: new Date("2026-08-01")
        },
        {
            name: "Kyoto Cherry Blossom Tour",
            price: 650,
            destination: "Japan",
            images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80'],
            duration: "6 Days",
            maxTraveler: 5,
            availableDate: new Date("2026-04-01")
        },
        {
            name: "Sahara Desert Adventure",
            price: 480,
            destination: "Morocco",
            images: ['https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80'],
            duration: "4 Days",
            maxTraveler: 8,
            availableDate: new Date("2026-09-01")
        },
        {
            name: "Amalfi Coast Drive",
            price: 920,
            destination: "Italy",
            images: ['https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80'],
            duration: "7 Days",
            maxTraveler: 4,
            availableDate: new Date("2026-06-15")
        },
        {
            name: "Northern Lights Explorer",
            price: 1100,
            destination: "Iceland",
            images: ['https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80'],
            duration: "5 Days",
            maxTraveler: 6,
            availableDate: new Date("2026-11-01")
        }
    ]

    await Package.deleteMany()
    await Package.insertMany(data)

    mongoose.disconnect()

    console.log("Done")
}


seed()