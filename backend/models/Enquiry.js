import mongoose from 'mongoose'

const enquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    comment: { type: String },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' }
}, { timestamps: true })

export default mongoose.model('Enquiry', enquirySchema)