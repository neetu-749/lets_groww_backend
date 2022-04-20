const Conversation = require("../models/Conversation");

const router = require("express").Router();



// new con


router.post("/", async (req,res)=>{
    const newconversation = new Conversation({
        members : [req.body.senderId,req.body.receiverId],

    });

    try{
        const savedConversation = await newconversation.save();
        res.status(200).json(savedConversation);
    }catch(err){
        res.status(500).json(err);
    }
    
});

// get con of user

router.get("/:userId",async (req,res)=>{
    try{
            const conversation = await Conversation.find({
                members:{ $in :[req.params.userId]}
            });
            res.status(200).json(conversation);

    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router