// GMB Get My Booking 

import Booking from "../models/Booking.js"

export const getMyBooking = async (req, res) => {

    try {
        const user = req.user.user_id;
        const bookings = await Booking.find({ user });
        if (!bookings) {
            res.status(404).json("No Booking found")
        } else {
            res.status(200).json(bookings);
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}