const mongoose = require('mongoose');
const Joi = require('joi');

const contactFormSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

function validateContactForm(data) {
  const schema = Joi.object({
    message: Joi.string().min(1).required(),  
    token: Joi.string().required(), 
  });
  return schema.validate(data);
}

const Contact = mongoose.model('Contact', contactFormSchema);

module.exports = { Contact, validateContactForm };
