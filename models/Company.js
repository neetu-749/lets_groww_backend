const mongoose = require("mongoose");


const CompanySchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImg: { type: String, default: "" },
        gender:{ type:String,default:"M"},
        category:{type:String , required:true},
        sales:{type:Number, required:true },
        profit:{type:Number, required:true },
        equity:{type:Number, required:true },
        year:{type:Number},
        evolution:{type:Number, required:true },
        verifed:{type:Boolean,default:false},

        isAdmin:{
          type:Boolean,required:false,default:false 
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);