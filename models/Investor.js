const mongoose = require("mongoose");


const InvestorSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImg: { type: String, default: "" },
        gender:{ type:String,default:"M"},
        
        category:{type:Array , required:true},
        amount:{type:Number, required:true },
        
        investedbefore:{type:Boolean, default:false },
        verifed:{type:Boolean,default:false},
      

        isAdmin:{
          type:Boolean,required:false,default:false 
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Investor", InvestorSchema);