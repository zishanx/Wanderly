import express from 'express'
import Enquiry from '../models/Enquiry.js'

const router = express.Router()

router.post('/create', async (req, res) => {
    try {
        const enquiry = await Enquiry.create(req.body)
        res.status(201).json(enquiry)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

export default router