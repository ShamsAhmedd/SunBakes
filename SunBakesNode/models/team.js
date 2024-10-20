const Joi = require("joi");
const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    teamImg: {
        type: String,
    },
    teamMemberName: {
        type: String,

    },
    teamMemberRole: {
        type: String,
    },
    

});

function validateCreateTeam(obj) {
    const schema = Joi.object({
        teamImg: Joi.string(),
        teamMemberName: Joi.string(),
        teamMemberRole: Joi.string()
    });
    return schema.validate(obj);
}

function validateUpdateTeam(obj) {
    const schema = Joi.object({
        teamImg: Joi.string(),
        teamMemberName: Joi.string(),
        teamMemberRole: Joi.string()
    });
    return schema.validate(obj);
}

const Team = mongoose.model('Team', TeamSchema);

module.exports = { Team, validateCreateTeam, validateUpdateTeam };
