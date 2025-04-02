require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/contact/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ message: "Email and message are required!" });
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail
      pass: process.env.EMAIL_PASS, // Your App Password (Not Gmail Password)
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: "sheenachacko57@gmail.com", // Admin Email
    replyTo: email, // User's email
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
