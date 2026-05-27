import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        required: true
    },
    selectedDate:{
        type:Date,
        required:true
    },
    travelers:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    paymentStatus:{
        type:String,
        default:'pending'
    },
    razorpayOrderId:{
        type:String,
    }

})

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;