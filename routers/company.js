const router = require("express").Router();
const bcrypt = require("bcrypt");
const Company = require("../models/Company");




//update

router.put("/:id", async (req, res) => {

    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        try {
            const updatedcompany = await Company.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{new:true});
            res.status(200).json(updatedcompany);


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

                const company = await Company.findById(req.params.id);
                try{
                  
                    await Company.findByIdAndDelete(req.params.id);
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
            const company = await Company.findById(req.params.id);
            const {password , ...others} = company._doc;
            res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
});



// get all company

router.get( "/" ,async (req,res)=>{

    const qnew = req.query.new;
    const qcategory = req.query.category;
    const qeuity = req.query.equity;
    const qprofit = req.query.profit;
    const qevolution = req.query.evolution ;
    const qsales = req.query.sales ;


    try{
            let companys;

            if(qnew){

                companys = await Company.find().sort({createdAt:-1});

            }else if(qcategory){

                    companys = await Company.find({
                        category:{
                            $in:[qcategory],
                        }
                    })
            }else if(qeuity){
                companys = await Company.find({equity:{$gte:qeuity}});
            }else if(qprofit){
                companys = await Company.find({profit:{$gte:qprofit}});
            }else if(qevolution){
                companys = await Company.find({evolution:{$gte:qevolution}});
            }else if(qsales){
                companys = await Company.find({sales:{$gte:qsales}});
            }
            else{

                companys = await Company.find();
            }

             
            // const {password , ...others} = investors._doc;
            res.status(200).json(companys);
    }catch(err){
        res.status(500).json(err);
    }
});




module.exports = router