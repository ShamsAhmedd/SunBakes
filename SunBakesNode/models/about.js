const Joi = require("joi");
const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
    headerImg: {
        type: String,
    },
    flipImage: {
        type: String,
    },
    description: {
        type: String,
    },    

});

function validateCreateAbout(obj) {
    const schema = Joi.object({
        headerImg: Joi.string(),
        flipImage: Joi.string(),
        description: Joi.string(),
    });
    return schema.validate(obj);
}

function validateUpdateAbout(obj) {
    const schema = Joi.object({
        headerImg: Joi.string(),
        flipImage: Joi.string(),
        description: Joi.string(),
    });
    return schema.validate(obj);
}

const About = mongoose.model('About', AboutSchema);

module.exports = { About, validateCreateAbout, validateUpdateAbout };
