const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/contact",async (req, res) => {
    try {
        
    
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASS,
    },
  });
  var mailOptions = {
    from: process.env.EMAIL_NAME,
    // to: "uttamkumar24m@gmail.com",
    to: "kishor.evdt@gmail.com",
    subject: `Someone Contact U`,
    text: `
        Hii I am ${req.body.name},

                Email   : ${req.body.email}
                Subject : ${req.body.subject}
                Message : ${req.body.message}
        Thanks,
        My Portofolio
`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.status(200).json({status:true,message : "Thank You For Connecting !!"})
} catch (error) {
        res.status(500).json({status:false,message : error})
}
});

app.listen(4000);
