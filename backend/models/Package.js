import mongoose, { mongo } from "mongoose";

const packageSchema = new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    destination:{type:String,required:true},
    things:{type:[String],required:true},
    images:{type:[String],required:true},
    duration:{type:String,required:true},
    maxTraveler:{type:Number,required:true},
    availableDate:{type:[Date],required:true}
})

const Package  = mongoose.model('package',packageSchema)

export default Package