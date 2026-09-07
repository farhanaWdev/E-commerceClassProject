const nodemailer = require("nodemailer");
const { getMaxListeners } = require("../models/userSchema");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  services: "gmail",

  secure: false, 
  auth: {
    user:' process.env.NODEMAILER_EMAIL',
    pass:' process.env.NODEMAILER_PASSWORD',
  },
});

async function verificationEmail(email,token){
    try {
      const info = await transporter.sendMail({
          from: 'farha268na@gmail.com', 
          to: email, 
          subject: "Please Verify Your Email", 
          html: '<b>Please verify your email to unlock full access . Kindly Click Here to Procced <a href="http://localhost:5173/verify/${token}">There you go</a> </b>',
    });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}

// wltm uyvf gxov wwyd

module.exports = {verificationEmail}