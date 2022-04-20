const mongoose = require("mongoose");

const MessageScheam = new mongoose.Schema(
    {
        conversationId:{
            type:String,
        },
        sender:{
            type:String,
        },
        text:{
            type:String,
        },
        
    },{timestamps:true}
);

module.exports = mongoose.model("Message", MessageScheam);