
const Message = require("../models/Message");


const router = require("express").Router();




// add 

router.post("/", async (req,res)=>{
    const newMessage = new Message(req.body);
    try{
        const savedmessage = await newMessage.save();
        res.status(200).json(savedmessage);
    }catch(err){
        res.status(500).json(err);
    }
});

// get

router.get("/:conversationId", async(req,res)=>{
    try{
            const message = await Message.find({
                conversationId : req.params.conversationId,
            });
            res.status(200).json(message);
    }catch(err){
        res.status(500).json(err);
    }
})



module.exports = router