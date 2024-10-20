const Joi = require("joi");
const mongoose = require("mongoose");

const HeaderAndFooterSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gmail: {
        type: String,
        required: true
    },
    headerImg: {
        type: String,
    },
    image1: {
        type: String,
    },
    
    image2: {
        type: String,
    },
    image3: {
        type: String,
    }

});

function validateCreateHeaderAndFooter(obj) {
    const schema = Joi.object({
        logo: Joi.string().required(),
        address: Joi.string().required(),
        phone: Joi.string().required(),
        gmail: Joi.string().required(),
        headerImg: Joi.string(),
        image1: Joi.string(),
        image2: Joi.string(),
        image3: Joi.string()
    });
    return schema.validate(obj);
}

function validateUpdateHeaderAndFooter(obj) {
    const schema = Joi.object({
        logo: Joi.string(), 
        address: Joi.string(),
        phone: Joi.string(),
        gmail: Joi.string(),
        headerImg: Joi.string(),
        image1: Joi.string(),
        image2: Joi.string(),
        image3: Joi.string()
    });
    return schema.validate(obj);
}

const HeaderAndFooter = mongoose.model('HeaderAndFooter', HeaderAndFooterSchema);

module.exports = { HeaderAndFooter, validateCreateHeaderAndFooter, validateUpdateHeaderAndFooter };
