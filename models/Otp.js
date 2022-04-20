const mongoose = require("mongoose");


const OtpSchema = new mongoose.Schema(
    {
        userid:{type:String},
        otp:{type:Number},
        type:{type:String}
    },
    { timestamps: true }
);

module.exports = mongoose.model("Otp", OtpSchema);