const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    }
});

function validateCreatecategory(obj) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        imageUrl: Joi.string()
    });
    return schema.validate(obj);
}

function validateUpdatecategory(obj) {
    const schema = Joi.object({
        title: Joi.string().min(3),
        imageUrl: Joi.string()
    });
    return schema.validate(obj);
}

const Category = mongoose.model('Category', categorySchema);

module.exports = {Category, validateCreatecategory, validateUpdatecategory };
