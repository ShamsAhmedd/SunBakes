const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { AuthStyle, validateCreateAuthStyle, validateUpdateAuthStyle } = require("../models/authStyle");
const upload = require("../utilites/uploadImg"); 

router.post("/style", upload.single("videoUrl"), asyncHandler(async (req, res) => {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { error } = validateCreateAuthStyle(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    if (!req.file) return res.status(400).json({ error: "Video is required" });

    const authStyle = new AuthStyle({
        title: req.body.title,
        videoUrl: req.file.filename 
    });

    const result = await authStyle.save();

    res.status(201).json({
        ...result._doc,
        videoUrl: `http://localhost:5002/assets/${result.videoUrl}` 
    });
}));


router.get("/style", asyncHandler(async (req, res) => {
    const styles = await AuthStyle.find();
    res.json(styles.map(style => ({
        ...style._doc,
        videoUrl: `http://localhost:5002/assets/${style.videoUrl}`
    })));
}));

router.get("/style/:id", asyncHandler(async (req, res) => {
    const style = await AuthStyle.findById(req.params.id);
    if (style) {
        res.status(200).json({
            ...style._doc,
            videoUrl: `http://localhost:5002/assets/${style.videoUrl}`
        }); 
    } else {
        res.status(404).json({ error: "Style not found" });
    }
}));

router.put("/style/:id", upload.single("videoUrl"), asyncHandler(async (req, res) => {
    const { error } = validateUpdateAuthStyle(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updateFields = {};
    if (req.body.title) updateFields.title = req.body.title; 
    if (req.file) updateFields.videoUrl = req.file.filename; 

    const style = await AuthStyle.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });

    if (!style) {
        return res.status(404).json({ error: "Style not found" });
    }

    res.status(200).json({
        ...style._doc,
        videoUrl: `http://localhost:5002/assets/${style.videoUrl}` 
    });
}));

router.delete("/style/:id", asyncHandler(async (req, res) => {
    const style = await AuthStyle.findById(req.params.id);
    if (style) {
        await style.deleteOne();
        res.status(200).json({ message: "Style deleted" });
    } else {
        res.status(404).json({ error: "Style not found" });
    }
}));

module.exports = router;
