const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Category,validateCreatecategory,validateUpdatecategory } = require("../models/category");
const path = require("path");
const upload = require("../utilites/uploadImg")

router.post("/", upload.single("imageUrl"), asyncHandler(async (req, res) => {
    const { error } = validateCreatecategory(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    if (!req.file) return res.status(400).json({ error: "Image is required" });
  
    const category = new Category({
      title: req.body.title,
      imageUrl: req.file.filename
    });
  
    const result = await category.save();
    res.status(200).json({ ...result._doc, imageUrl: `http://localhost:5002/assets/${result.imageUrl}` });
  }));
  
  router.get("/", asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.json(categories.map(category => ({ ...category._doc, imageUrl: `http://localhost:5002/assets/${category.imageUrl}` })));
  }));
  
router.get("/:id", asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
        res.status(200).json(category); 
    } else {
        res.status(404).json({ error: "category not found" });
    }
}));

router.put("/:id", upload.single("imageUrl"), asyncHandler(async (req, res) => {
    try {
        const { error } = validateUpdatecategory(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const updateFields = {};

        if (req.body.title) updateFields.title = req.body.title;
        if (req.file) updateFields.imageUrl = req.file.filename; 

        const category = await Category.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).json(category); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));

router.delete("/:id", asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
        await category.deleteOne();
        res.status(200).json({ message: "category deleted" });
    } else {
        res.status(400).json({ error: "Category not deleted, ID not found" });
    }
}));

module.exports = router;
