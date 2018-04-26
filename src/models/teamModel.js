'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    leader: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],   
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }, 
    insertDate: {
        type: Date
    },
    objectives: [{
        type: Schema.Types.ObjectId,
        ref: 'Objective'
    }],
    active: {
        type: Boolean,
        default: true
    }
});

module.exports.TeamSchema = TeamSchema;
module.exports.Team = mongoose.model('Team', TeamSchema);