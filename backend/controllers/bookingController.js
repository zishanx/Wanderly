import Razorpay from 'razorpay'
import Package from '../models/Package.js';
import Booking from '../models/Booking.js'
import crypto from 'crypto'

console.log(process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET)




export const createBooking = async (req, res) => {
    try {

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const { packageId, selectedDate, travelers } = req.body;
        const getpackage = await Package.findById(packageId);
        const totalPrice = getpackage.price * travelers;

        const order = await razorpay.orders.create({ amount: totalPrice * 100, currency: "INR" })

        await Booking.create({
            user: req.user.user_id,
            package: packageId,
            selectedDate,
            travelers,
            totalPrice,
            paymentStatus: "pending",
            razorpayOrderId: order.id
        })


        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const verifyPayment = async (req, res) => {
    try {

        const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body

        const body = razorpayOrderId + "|" + razorpayPaymentId;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex")


        if (expectedSignature === razorpaySignature) {
            const currentbooking = await Booking.findOneAndUpdate(
                { razorpayOrderId },
                { paymentStatus: "paid" }
            )

            res.status(200).json("Payment verified.")
        } else {
            res.status(400).json("Payment verification failed")
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}