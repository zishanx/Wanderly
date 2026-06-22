import Razorpay from 'razorpay'
import Package from '../models/Package.js';
import Booking from '../models/Booking.js'
import crypto from 'crypto'

console.log(process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET)




export const createBooking = async (req, res) => {



    try {

        console.log("REQ BODY:", req.body)
        console.log("REQ USER:", req.user)

        const { packageId, selectedDate, travelers } = req.body;
        const getpackage = await Package.findById(packageId);
        const totalPrice = getpackage.price * travelers;

        const getdate = getpackage.departureDate.find(task => new Date(task.date).toDateString() === new Date(selectedDate).toDateString());

        if (!getdate) {
            return res.status(400).json({ message: "Selected date not found in package" });
        }

        if (getdate.slots > 0) {
            const razorpay = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET
            })

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
            getdate.slots -= 1

            await getpackage.save()

            res.status(200).json(order)
        } else {
            res.status(300).json("No slot available")
        }


    } catch (error) {
        res.status(400).json({
            message: error.message,
            detail: JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
        })

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