const mongo = require("../connect");
// const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");
const {ObjectId} = require("mongodb");
const nodemailer= require('nodemailer');




exports.reset = async(req,res,next)=>{
try{
    const existUser = await mongo.selectedDb.
  collection("users").findOne({email: req.body.email});
  let email = req.body.email

  if(!existUser){
    res.status(400).send({msg: "User Not Exists"})
  }
  const token = jwt.sign(existUser,process.env.SECRET_KEY, {expiresIn: "15m"});
    const link = `http://localhost:3000/Resetpassword/${
      existUser._id}/${token}`;
      console.log(link);

      var transporter = nodemailer.createTransport({
        service: 'gamil',
        auth:{
          user:process.env.FROM,
          pass:process.env.PASSWORD
        }
      })

      var mailOptions = {
        form: process.env.FROM,
        to: email,
        subject: "Password Reset",
        text:"Click this Link to Reset Your Password",
        html:`<Link to=${link} target="_blank">${link}</Link>`
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent:' + info.response);
        }
    });
    res.send(link);


}catch(err){
  res.status(500).json({ Message: 'Something Went Wrong' });
  console.log(error);
}
}