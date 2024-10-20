const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Product, validateCreateProduct, validateUpdateProduct } = require("../models/product");
const upload = require("../utilites/uploadImg"); 

router.post("/", 
  upload.fields([{ name: "imageCover", maxCount: 1 }, { name: "headerImg", maxCount: 1 }]), 
  asyncHandler(async (req, res) => {
    const { error } = validateCreateProduct(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const imageCover = req.files.imageCover && req.files.imageCover[0] ? req.files.imageCover[0].filename : null;
    const headerImg = req.files.headerImg && req.files.headerImg[0] ? req.files.headerImg[0].filename : null;

    const product = new Product({
        ...req.body,
        imageCover: imageCover, 
        headerImg: headerImg 
    });

    const result = await product.save();
    res.status(201).json({ 
        ...result._doc, 
        imageCover: imageCover ? `http://localhost:5002/assets/${imageCover}` : null, 
        headerImg: headerImg ? `http://localhost:5002/assets/${headerImg}` : null 
    });
}));


router.get("/", asyncHandler(async (req, res) => {
    const products = await Product.find().populate("category");

    if (products.length) {
        const firstProductHeaderImg = products[0].headerImg ? `http://localhost:5002/assets/${products[0].headerImg}` : null;
        
        const formattedProducts = products.map(product => ({ 
            ...product._doc, 
            imageCover: `http://localhost:5002/assets/${product.imageCover}`, 
            headerImg: firstProductHeaderImg 
        }));

        res.status(200).json(formattedProducts);
    } else {
        res.status(404).json({ error: "No products found" });
    }
}));

router.get("/category/:categoryId", asyncHandler(async (req, res) => {
    const { categoryId } = req.params; 

    const products = await Product.find({ category: categoryId }).populate("category");

    if (products.length) {
        const firstProductHeaderImg = products[0].headerImg ? `http://localhost:5002/assets/${products[0].headerImg}` : null;
        res.status(200).json(products.map(product => ({ 
            ...product._doc, 
            imageCover: `http://localhost:5002/assets/${product.imageCover}`, 
            headerImg: firstProductHeaderImg 
        })));
    } else {
        res.status(404).json({ error: "No products found for this category" });
    }
}));

router.get("/:id", asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate("category");
    if (product) {
        res.status(200).json({ 
            ...product._doc, 
            imageCover: `http://localhost:5002/assets/${product.imageCover}`, 
            headerImg: product.headerImg ? `http://localhost:5002/assets/${product.headerImg}` : null 
        });
    } else {
        res.status(404).json({ error: "Product not found" });
    }
}));

router.put("/:id", upload.fields([{ name: "imageCover", maxCount: 1 }, { name: "headerImg", maxCount: 1 }]), asyncHandler(async (req, res) => {
    const { error } = validateUpdateProduct(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updateFields = {};
    if (req.body.title) updateFields.title = req.body.title;
    if (req.body.description) updateFields.description = req.body.description;
    if (req.body.quantity) updateFields.quantity = req.body.quantity;
    if (req.body.price) updateFields.price = req.body.price;
    if (req.files.imageCover && req.files.imageCover[0]) updateFields.imageCover = req.files.imageCover[0].filename; // Update image if provided
    if (req.files.headerImg && req.files.headerImg[0]) updateFields.headerImg = req.files.headerImg[0].filename; // Update headerImg if provided
    if (req.body.category) updateFields.category = req.body.category; 
    if (req.body.ratingAverage) updateFields.ratingAverage = req.body.ratingAverage;

    const product = await Product.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true }).populate("category");

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ 
        ...product._doc, 
        imageCover: `http://localhost:5002/assets/${product.imageCover}`, 
        headerImg: product.headerImg ? `http://localhost:5002/assets/${product.headerImg}` : null 
    });
}));

router.delete("/:id", asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.deleteOne();
        res.status(200).json({ message: "Product deleted" });
    } else {
        res.status(404).json({ error: "Product not found" });
    }
}));

module.exports = router;
