const Joi = require("joi");
const mongoose = require("mongoose")
const JWT = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }

}, {
    timestamps: true
})

userSchema.methods.generateToken = function () {
    return JWT.sign({ id: this._id,email:this.email, isAdmin: this.isAdmin }, process.env.JWT_SECRET_KEY);
};

function validateRegisterUser(obj) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).max(20).required(),
    })
    return schema.validate(obj)
}

function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().min(2).max(100).required(),
        password: Joi.string().min(6).max(100).required(),
    })
    return schema.validate(obj)
}

const User = mongoose.model("user", userSchema)

module.exports = { User, validateRegisterUser, validateLoginUser}
