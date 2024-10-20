const Joi = require("joi");
const mongoose = require("mongoose");

const authStyleSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        videoUrl: {
            type: String,
        }
    })
    

function validateCreateAuthStyle(obj) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        videoUrl: Joi.string() 
    });
    return schema.validate(obj);
}

function validateUpdateAuthStyle(obj) {
    const schema = Joi.object({
        title: Joi.string().min(3), 
        videoUrl: Joi.string() 
    });
    return schema.validate(obj);
}

const AuthStyle = mongoose.model('AuthStyle', authStyleSchema);

module.exports = { AuthStyle, validateCreateAuthStyle, validateUpdateAuthStyle };
