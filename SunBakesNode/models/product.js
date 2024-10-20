const mongoose = require('mongoose');
const Joi = require("joi");

const ProductSchema = new mongoose.Schema({
  headerImg:{
    type: String, 
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0, 
  },
  price: {
    type: Number,
    required: true,
    min: 0, 
  },
  imageCover: {
    type: String, 
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  ratingAverage: {
    type: Number,
    default: 0,
    min: 0, 
    max: 5, 
  },
}, {
  timestamps: true, 
});

const validateCreateProduct = (Product) => {
    const schema = Joi.object({
      headerImg: Joi.string().uri(),
      title: Joi.string().required(),
        description: Joi.string().required(),
        quantity: Joi.number().min(0).required(),
        price: Joi.number().min(0).required(),
        imageCover: Joi.string().uri(),
        category: Joi.string().required(), 
        ratingAverage: Joi.number().min(0).max(5).default(0),
    });

    return schema.validate(Product);
};

const validateUpdateProduct = (Product) => {
    const schema = Joi.object({
      headerImg: Joi.string().uri(),
        title: Joi.string(),
        description: Joi.string(),
        quantity: Joi.number().min(0),
        price: Joi.number().min(0),
        imageCover: Joi.string().uri(),
        category: Joi.string(),
        ratingAverage: Joi.number().min(0).max(5),
    });

    return schema.validate(Product);
};

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product, validateCreateProduct, validateUpdateProduct };
