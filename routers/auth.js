

const nodemailer = require("nodemailer");

const router = require("express").Router();
const bcrpyt = require("bcrypt");
const Company = require("../models/Company")
const Otp = require("../models/Otp");
const Investor = require("../models/Investor");
const { sendMailer } = require("./sendmail");
const { json } = require("express");
const { findById } = require("../models/Investor");



// nodemailer

let transporter = nodemailer.createTransport({
    service:"gmail",
   
    auth: {
        user: "letsgroww2001@gmail.com",
        pass: "anilkumar18"
    },
});






router.post("/otp", async (req, res) => {


   
    try{

        const account = await Otp.findOne({userid:req.body.userid,type:req.body.type});
    
        if(account.otp == req.body.otp){
          
            if(account.type === "in"){
                
                const updateinverstor = await Investor.findByIdAndUpdate(req.body.userid,{
                    $set:{"verifed":true}
                });

                await Otp.findByIdAndDelete(account._id);

                res.status(200).json("account verified...");

            }else{
                const updatecompany = await Company.findByIdAndUpdate(req.body.userid,{
                    $set:{"verifed":true}
                });
                await Otp.findByIdAndDelete(account._id);

                res.status(200).json("account verified...");
            }

        }else{
            return res.status(400).json("wrong otp...");
        }

        
    }catch(err){
        res.status(500).json(err);
    }

    


});








//register

router.post("/companyregister", async (req, res) => {

  


    try {


        const otp = `${Math.floor(1000 + Math.random() * 999)}`;
        // console.log(otpp);

        const salt = await bcrpyt.genSalt(10);
        const hashedPassword = await bcrpyt.hash(req.body.password, salt);
        const newCompany = new Company({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            profileImg:req.body.profileImg,
            year: req.body.year,
            category: req.body.category,
            sales: req.body.sales,
            profit: req.body.profit,
            equity: req.body.equity,
            evolution: req.body.evolution,
        });

        const company = await newCompany.save();

        let info = await transporter.sendMail({
            form: 'letsgroww2001@outlook.com',
            to: req.body.email,
            subject: "verify email ....",
            text:"your otp for email verfication is :"+ otp,
            
        });

        // console.log(company._id);

        const newOtp = new Otp({
            userid:company._id,
            otp:otp,
            type:"co"
        });
        
        const savedotp = await newOtp.save();

        res.status(200).json(company);

    } catch (err) {
        res.status(500).json(err);
    };


   
    

   

});


//login

router.post("/companylogin", async (req, res) => {
    try {

        const company = await Company.findOne({ username: req.body.username });
        if (!company) { return res.status(400).json("wrong user name"); }

        const validated = await bcrpyt.compare(req.body.password, company.password);
        if (!validated) {
            return res.status(400).json("wrong password");
        }

        const { password, ...others } = company._doc;
        res.status(200).json(others);


    } catch (err) {
        res.status(500).json(err);
    }
});



router.post("/investorregister", async (req, res) => {



    try {

        
        const otp = `${Math.floor(1000 + Math.random() * 999)}`;
    

        const salt = await bcrpyt.genSalt(10);
        const hashedPassword = await bcrpyt.hash(req.body.password, salt);
        const newInvestor = new Investor({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            profileImg:req.body.profileImg,
            category: req.body.category,
            amount: req.body.amount,
            gender:req.body.gender,
            investedbefore:req.body.investedbefore,
        });

        
        const investor = await newInvestor.save();
      

        let info = await transporter.sendMail({
            form: 'letsgroww2001@outlook.com',
            to: req.body.email,
            subject: "verify email ....",
            text:"your otp for email verfication is :"+ otp,
            
        });

     

        const newOtp = new Otp({
            userid:investor._id,
            otp:otp,
            type:"in"
        });


        const savedotp = await newOtp.save();
      

        res.status(200).json(investor);

    } catch (err) {
        res.status(500).json(err);
    }



});


//login

router.post("/investorlogin", async (req, res) => {
    try {

        const investor = await Investor.findOne({ username: req.body.username });
        if (!investor) { return res.status(400).json("wrong user name"); }

        const validated = await bcrpyt.compare(req.body.password, investor.password);
        if (!validated) {
            return res.status(400).json("wrong password");
        }

        const { password, ...others } = investor._doc;
        res.status(200).json(others);




    } catch (err) {
        res.status(500).json(err);
    };

    
    



});



module.exports = router