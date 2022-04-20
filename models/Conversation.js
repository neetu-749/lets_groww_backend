const mongoose = require("mongoose");

const ConversationScheam = new mongoose.Schema(
    {
        members:{
            type:Array,
        },
    },{timestamps:true}
);

module.exports = mongoose.model("Convarsation", ConversationScheam);