const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const employeeRouter = require("./router/employeeRouter");
const productRouter = require("./router/productRouter");
const leadsRouter = require("./router/leadsRouter");
const userRouter = require("./router/userRouter")
const serviceRouter = require("./router/servicesRouter");
const registerRouter = require("./router/registerRouter");
const auth = require("./modules/authModule");
const mongo = require("./connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const nodemailer = require('nodemailer');



dotenv.config();
mongo.connect();



const app = express();
app.use(cors());

app.use(express.json());//to parse request of body 
app.post("/forgotpassword", cors(), async (req, res, next) => {
  try {
    const existUser = await
      mongo.selectedDb.
        collection("users").findOne({ email: req.body.email });
    let email = req.body.email;

    if (!existUser) {
      res.status(400).send({ msg: "User Not Exists" })
    }
    const token = jwt.sign(existUser, process.env.SECRET_KEY, { expiresIn: "2m" });
    const link = `https://crm22.netlify.app/resetpassword/${existUser._id}/${token}`;
    console.log(link);

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "sampledemomailer@gmail.com",
        pass: process.env.PASSWORD
      }
    })

    var mailOptions = {
      form: "sampledemomailer@gmail.com",
      to: email,
      subject: "Password Reset",
      text: "Click this Link to Reset Your Password",
      html: `<a href=${link} target="_blank"><button style="color:white;background-color:teal;
      padding:15px; border:none; border-radius:10px;font-size:30px;text-shadow: 2px 2px 4px black">
      Click Here to Reset your Password</button></a>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent:' + info.response);
      }
    });
    res.send(link);


  } catch (err) {
    res.status(500);
    console.log(err);
  }
});

app.post("/resetpass/:id/:token", async (req, res, next) => {
  const id = req.params.id;
  const token = req.params.token;

  if (req.body.password != req.body.confirmPassword)
    return res.status(400).send({ msg: "Password doesn't match" });
  else
    delete req.body.confirmPassword;
  try {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(req.body.password, salt);
    let compare = jwt.verify(token, process.env.SECRET_KEY);
    console.log(compare);
    if (compare) {
      const updatedData = await mongo.selectedDb.collection("users").findOneAndUpdate({ _id: ObjectId(id) },
        { $set: { password: hash } },
        { returnDocument: "after" });
      console.log(updatedData);
      res.send({ msg: "Password Updated" });

    }
    else {
      res.json({ Message: "URL TimeOut" })
    }

  } catch (err) {
    res.status(500).json({ Message: 'Link Expired' });
    console.log(err);
  }


})

app.use("/register", registerRouter);





app.use("/", auth.authenticateUser);
app.use("/users", userRouter);
app.use("/leads", leadsRouter);
app.use("/services", serviceRouter);
app.use("/employees", employeeRouter);
app.use("/products", productRouter);

app.listen(process.env.PORT);
