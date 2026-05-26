import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'


dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => { console.log(`Server running on ${process.env.PORT}`) })
        console.log(`MONGO Db connected.!!`)
    }).catch(err => { console.log(err) })

