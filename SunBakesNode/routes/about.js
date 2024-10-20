const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { About, validateCreateAbout, validateUpdateAbout } = require("../models/about");
const upload = require("../utilites/uploadImg");

router.post("/", upload.fields([{ name: 'headerImg' }, { name: 'flipImage' }]), 
asyncHandler(async (req, res) => {
    const { error } = validateCreateAbout(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const images = {};
    if (req.files) {
        if (req.files['headerImg']) images.headerImg = req.files['headerImg'][0].filename;
        if (req.files['flipImage']) images.flipImage = req.files['flipImage'][0].filename;
    }

    const aboutEntry = new About({
        headerImg: images.headerImg || null,
        flipImage: images.flipImage || null,
        description: req.body.description || null,
    });

    const result = await aboutEntry.save();
    const imageUrls = {
        headerImg: result.headerImg ? `http://localhost:5002/assets/${result.headerImg}` : null,
        flipImage: result.flipImage ? `http://localhost:5002/assets/${result.flipImage}` : null,
    };

    res.status(201).json({ ...result._doc, ...imageUrls });
}));

router.get("/", asyncHandler(async (req, res) => {
    const entries = await About.find();
    const updatedEntries = entries.map(entry => {
        const imageUrls = {
            headerImg: entry.headerImg ? `http://localhost:5002/assets/${entry.headerImg}` : null,
            flipImage: entry.flipImage ? `http://localhost:5002/assets/${entry.flipImage}` : null,
        };
        return { ...entry._doc, ...imageUrls };
    });
    res.status(200).json(updatedEntries);
}));

router.get("/:id", asyncHandler(async (req, res) => {
    const entry = await About.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    const imageUrls = {
        headerImg: entry.headerImg ? `http://localhost:5002/assets/${entry.headerImg}` : null,
        flipImage: entry.flipImage ? `http://localhost:5002/assets/${entry.flipImage}` : null,
    };
    res.status(200).json({ ...entry._doc, ...imageUrls });
}));

router.put("/:id", upload.fields([{ name: 'headerImg' }, { name: 'flipImage' }]), asyncHandler(async (req, res) => {
    const { error } = validateUpdateAbout(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updateFields = {};
    if (req.files) {
        if (req.files['headerImg']) updateFields.headerImg = req.files['headerImg'][0].filename;
        if (req.files['flipImage']) updateFields.flipImage = req.files['flipImage'][0].filename;
    }
    
    if (req.body.description) updateFields.description = req.body.description;

    const entry = await About.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    const imageUrls = {
        headerImg: entry.headerImg ? `http://localhost:5002/assets/${entry.headerImg}` : null,
        flipImage: entry.flipImage ? `http://localhost:5002/assets/${entry.flipImage}` : null,
    };

    res.status(200).json({ ...entry._doc, ...imageUrls });
}));

router.delete("/:id", asyncHandler(async (req, res) => {
    const entry = await About.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    await entry.deleteOne();
    res.status(200).json({ message: "Entry deleted" });
}));

module.exports = router;
