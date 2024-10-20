const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const TokenModel = require("../models/Token");
const crypto = require("crypto");
const bcrypt = require("bcryptjs")
const { User } = require("../models/User");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();


router.post("/forget-password", async (req, res) => {
  const { email } = req.body;

  const token = crypto.randomBytes(20).toString("hex");

  try {
    await TokenModel.create({ email, token });

    await sendResetEmail(email, token);

    res.status(200).json({ message: "Reset link sent successfully." });
  } catch (error) {
    console.error("Error occurred while resetting password:", error);
    res.status(500).json({ message: "Failed to send reset link." });
  }
});

router.post("/reset-password", async (req, res) => {
  const { email,token, password  } = req.body;

  try {
    const tokenDocument = await TokenModel.findOne({ email, token });
    if (!tokenDocument) {
      return res.status(400).json({ message: "Invalid token or email." });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate({ email }, { password: hashedPassword, salt });

    await TokenModel.deleteOne({ email, token });

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error occurred while resetting password:", error);
    res.status(500).json({ message: "Failed to reset password." });
  }
});

async function sendResetEmail(email, token) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER || "sunbakesss@gmail.com", 
        pass: process.env.GMAIL_PASS || "efngsaizlaeopdrg",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
      const mailOptions = {
      from: "sunbakesss@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `<p>Click the following link to reset your password:</p>
      <p>Your Verify Code : ${token}</p>
      <a href="http://localhost:4200/reset-password">Reset Password</a>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
}
module.exports = router;