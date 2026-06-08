// GMB Get My Booking 

import Booking from "../models/Booking.js"
import Package from "../models/Package.js"

export const getMyBooking = async (req, res) => {

    try {
        const user = req.user.user_id;
        const bookings = await Booking.find({ user }).populate('package');
        if (!bookings) {
            res.status(404).json("No Booking found")
        } else {
            res.status(200).json(bookings);
        }
    } catch (err) {
        console.log(err.message)
        res.status(400).json(err.message);
    }
}