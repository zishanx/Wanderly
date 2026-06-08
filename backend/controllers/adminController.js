
import Booking from '../models/Booking.js'

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('package').populate('user', 'name email')
        res.status(200).json(bookings)
    } catch (err) {
        res.status(400).json(err.message)
    }
}


export const deletePackage = async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id)
        res.status(200).json("Package deleted")
    } catch (err) {
        res.status(400).json(err.message)
    }
}