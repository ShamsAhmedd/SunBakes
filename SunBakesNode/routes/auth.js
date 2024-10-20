const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const { User, validateRegisterUser, validateLoginUser } = require("../models/User");

router.post("/Register", asyncHandler(async (req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message }); 
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "This user is already registered" }); 
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        const Result = await user.save();

        const token = user.generateToken();

        const { password, ...other } = Result._doc;
        return res.status(200).json({ message: "success", ...other, token });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" }); 
    }
}));


router.post("/Login", asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json("this user not found ")
    }
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordMatch) {
        return res.status(400).json("invaild password ")
    }

    const token = user.generateToken();
    const { password, ...other } = user._doc;
    return res.status(200).json({ message: "success", ...other, token });
}))


router.post("/loginAdmin", asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json("User not found");
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json("Invalid password");
    }

    if (!user.isAdmin) {
        return res.status(403).json("Access denied. Admins only.");
    }

    const token = user.generateToken();
    const { password, ...other } = user._doc;
    return res.status(200).json({ message: "success", ...other, token });
}));

module.exports = router;