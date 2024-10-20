const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const path = require("path");
const { HeaderAndFooter, validateCreateHeaderAndFooter, validateUpdateHeaderAndFooter } = require("../models/HeaderAndFooter");
const upload = require("../utilites/uploadImg");

router.post("/headerAndFooter", upload.fields([{ name: 'headerImg' }, { name: 'image1' }, { name: 'image2' }, { name: 'image3' }]),
    asyncHandler(async (req, res) => {
        const { error } = validateCreateHeaderAndFooter(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const images = {};
        if (req.files) {
            if (req.files['headerImg']) images.headerImg = req.files['headerImg'][0].filename;
            if (req.files['image1']) images.image1 = req.files['image1'][0].filename;
            if (req.files['image2']) images.image2 = req.files['image2'][0].filename;
            if (req.files['image3']) images.image3 = req.files['image3'][0].filename;
        }

        const headerAndFooter = new HeaderAndFooter({
            logo: req.body.logo,
            address: req.body.address,
            phone: req.body.phone,
            gmail: req.body.gmail,
            ...images
        });

        const result = await headerAndFooter.save();

        const imageUrls = {};
        if (images.headerImg) imageUrls.headerImg = `http://localhost:5002/assets/${images.headerImg}`;
        if (images.image1) imageUrls.image1 = `http://localhost:5002/assets/${images.image1}`;
        if (images.image2) imageUrls.image2 = `http://localhost:5002/assets/${images.image2}`;
        if (images.image3) imageUrls.image3 = `http://localhost:5002/assets/${images.image3}`;

        res.status(200).json({
            ...result._doc,
            ...imageUrls
        });
    })
);

router.get("/headerAndFooter", asyncHandler(async (req, res) => {
    const entries = await HeaderAndFooter.find();

    const updatedEntries = entries.map(entry => {
        const imageUrls = {};
        if (entry.headerImg) imageUrls.headerImg = `http://localhost:5002/assets/${entry.headerImg}`;
        if (entry.image1) imageUrls.image1 = `http://localhost:5002/assets/${entry.image1}`;
        if (entry.image2) imageUrls.image2 = `http://localhost:5002/assets/${entry.image2}`;
        if (entry.image3) imageUrls.image3 = `http://localhost:5002/assets/${entry.image3}`;

        return {
            ...entry._doc,
            ...imageUrls
        };
    });

    res.status(200).json(updatedEntries);
}));

router.get("/headerAndFooter/:id", asyncHandler(async (req, res) => {
    const entry = await HeaderAndFooter.findById(req.params.id);
    if (entry) {
        const imageUrls = {
            headerImg: entry.headerImg ? `http://localhost:5002/assets/${entry.headerImg}` : null,
            image1: entry.image1 ? `http://localhost:5002/assets/${entry.image1}` : null,
            image2: entry.image2 ? `http://localhost:5002/assets/${entry.image2}` : null,
            image3: entry.image3 ? `http://localhost:5002/assets/${entry.image3}` : null,
        };
        res.status(200).json({ ...entry._doc, ...imageUrls });
    } else {
        res.status(404).json({ error: "Entry not found" });
    }
}));

router.put("/headerAndFooter/:id", upload.fields([{ name: 'headerImg' }, { name: 'image1' }, { name: 'image2' }, { name: 'image3' }]), asyncHandler(async (req, res) => {
    const { error } = validateUpdateHeaderAndFooter(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updateFields = { ...req.body }; 

    if (req.files) {
        if (req.files['headerImg']) updateFields.headerImg = req.files['headerImg'][0].filename;
        if (req.files['image1']) updateFields.image1 = req.files['image1'][0].filename;
        if (req.files['image2']) updateFields.image2 = req.files['image2'][0].filename;
        if (req.files['image3']) updateFields.image3 = req.files['image3'][0].filename;
    }

    const entry = await HeaderAndFooter.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    const imageUrls = {
        headerImg: entry.headerImg ? `http://localhost:5002/assets/${entry.headerImg}` : null,
        image1: entry.image1 ? `http://localhost:5002/assets/${entry.image1}` : null,
        image2: entry.image2 ? `http://localhost:5002/assets/${entry.image2}` : null,
        image3: entry.image3 ? `http://localhost:5002/assets/${entry.image3}` : null,
    };

    res.status(200).json({ ...entry._doc, ...imageUrls });
}));

router.delete("/headerAndFooter/:id", asyncHandler(async (req, res) => {
    const entry = await HeaderAndFooter.findById(req.params.id);
    if (entry) {
        await entry.deleteOne();
        res.status(200).json({ message: "Entry deleted" });
    } else {
        res.status(400).json({ error: "Entry not found" });
    }
}));

module.exports = router;
