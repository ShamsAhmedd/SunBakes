const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Team, validateCreateTeam, validateUpdateTeam } = require("../models/team");
const upload = require("../utilites/uploadImg");

router.post("/", upload.single('teamImg'), asyncHandler(async (req, res) => {
    const { error } = validateCreateTeam(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const images = {};
    if (req.file) {
        images.teamImg = req.file.filename; 
    }

    const teamEntry = new Team({
        teamImg: images.teamImg || null, 
        teamMemberName: req.body.teamMemberName,
        teamMemberRole: req.body.teamMemberRole
    });

    const result = await teamEntry.save();
    const imageUrls = {
        teamImg: result.teamImg ? `http://localhost:5002/assets/${result.teamImg}` : null
    };

    res.status(201).json({ ...result._doc, ...imageUrls });
}));

router.get("/", asyncHandler(async (req, res) => {
    const entries = await Team.find();
    const updatedEntries = entries.map(entry => {
        const imageUrls = {
            teamImg: entry.teamImg ? `http://localhost:5002/assets/${entry.teamImg}` : null
        };
        return { ...entry._doc, ...imageUrls };
    });
    res.status(200).json(updatedEntries);
}));

router.get("/:id", asyncHandler(async (req, res) => {
    const entry = await Team.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    const imageUrls = {
        teamImg: entry.teamImg ? `http://localhost:5002/assets/${entry.teamImg}` : null
    };
    res.status(200).json({ ...entry._doc, ...imageUrls });
}));

router.put("/:id", upload.single('teamImg'), asyncHandler(async (req, res) => {
    const { error } = validateUpdateTeam(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updateFields = {};
    if (req.file) {
        updateFields.teamImg = req.file.filename;
    }

    if (req.body.teamMemberName) updateFields.teamMemberName = req.body.teamMemberName;
    if (req.body.teamMemberRole) updateFields.teamMemberRole = req.body.teamMemberRole;

    const entry = await Team.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    const imageUrls = {
        teamImg: entry.teamImg ? `http://localhost:5002/assets/${entry.teamImg}` : null
    };

    res.status(200).json({ ...entry._doc, ...imageUrls });
}));

router.delete("/:id", asyncHandler(async (req, res) => {
    const entry = await Team.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    await entry.deleteOne();
    res.status(200).json({ message: "Entry deleted" });
}));

module.exports = router;
