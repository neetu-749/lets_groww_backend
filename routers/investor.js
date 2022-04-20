const router = require("express").Router();
const bcrypt = require("bcrypt");
const Investor = require("../models/Investor");



//update

router.put("/:id", async (req, res) => {

    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        try {
            const updatedInvsertor = await Investor.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{new:true});
            res.status(200).json(updatedInvsertor);


        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("you can update only your account!")
    }
});



//delete

router.delete("/:id", async (req,res) => {

    if( req.body.userId === req.params.id){

        try{

                const investor = await Investor.findById(req.params.id);
                try{
                  
                    await Investor.findByIdAndDelete(req.params.id);
                    res.status(200).json("User has been deleted....");
                }catch(err){
                    res.status(501).json(err);
                }

                // User.deleteOne(username= req.body.username);


        }catch(err){
            res.status(400).json("user not found!!");
        }

    }else{
        res.status(401).json("you can only delete your account!!")
    }


});


// get user

router.get("/:id",async (req,res)=>{
    try{
            const investor = await Investor.findById(req.params.id);
            const {password , ...others} = investor._doc;
            res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
});



router.get( "/" ,async (req,res)=>{

    const qnew = req.query.new;
    const qcategory = req.query.qcategory;
    const qinvseted = req.query.qinvseted;
    const qamonut = req.query.qamonut;

    try{
            let investors;

            if(qnew){

                investors = await Investor.find().sort({createdAt:-1});

            }else if(qcategory){

                    investors = await Investor.find({
                        category:{
                            $in:[qcategory],
                        }
                    })
            }else if(qinvseted){
                if(qinvseted == 1){
                        investors = await Investor.find({investedbefore:true});
                }else{
                        investors = await Investor.find({investedbefore:false});
                }
            }else if(qamonut){
                investors = await Investor.find({amount:{$gte:qamonut}});
            }
            else{

                investors = await Investor.find();
            }

             
            // const {password , ...others} = investors._doc;
            res.status(200).json(investors);
    }catch(err){
        res.status(500).json(err);
    }
});



module.exports = router