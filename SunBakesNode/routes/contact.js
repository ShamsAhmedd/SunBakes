const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { Contact, validateContactForm } = require('../models/contact');

router.post('/', async (req, res) => {
  const { error } = validateContactForm(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { token, message } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userEmail = decoded.email;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,  
    pass: process.env.GMAIL_PASS, 
  },
  tls: {
    rejectUnauthorized: false,  
  },
});

    const mailOptions = {
      from: userEmail,  
      to: 'sunbakesss@gmail.com',  
      subject: 'New Contact Form Submission',
      html: `<p>You have a new contact form submission:</p>
             <p><strong>From:</strong> ${userEmail}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);

    const contactForm = new Contact({ email: userEmail, message });
    await contactForm.save();

    res.status(200).json({ message: 'Contact form submitted successfully.' });

  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired, please log in again.' });
    }
    console.error('Error processing contact form:', err);
    res.status(500).json({ message: 'Failed to process contact form.' });
  }
});

module.exports = router;
