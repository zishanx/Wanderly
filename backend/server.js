import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoute.js'
import packageRoutes from './routes/packageRoute.js'
import bookingRoutes from './routes/bookingRoutes.js'


dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/package',packageRoutes)
app.use('/api/booking',bookingRoutes)


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => { console.log(`Server running on ${process.env.PORT}`) })
        console.log(`MONGO Db connected.!!`)
    }).catch(err => { console.log(err) })

