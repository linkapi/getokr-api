'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectiveSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ownerType: {
        type: String,
        enum: ['user', 'team']
    },
    contributors: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    checkIns: [{
            type: Schema.Types.Object
    }],
    description: {
        type: String
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    planning: {
        type: Schema.Types.ObjectId,
        ref: 'PlanningSession'
    },
    tags: [String],
    insertDate: {
        type: Date
    },
    progress: {
        type: Number
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    deactivate: {
        type: Boolean,
        default: false
    },
    hierarchy: {
        type: String,
        enum: ['main', 'child', 'none'],
        default: 'none'
    },
    childObjectives: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Objective'
        }
    }],
    mainObjective: {
        type: Schema.Types.ObjectId,
        ref: 'Objective'
    },
    keyResults: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'KeyResult'
        }
    }],
    trustLevel: {
        type: String,
        enum: ['high', 'normal', 'low', 'tie']
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    public: {
        type: Boolean,
        default: false
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports.ObjectiveSchema = ObjectiveSchema;
module.exports.Objective = mongoose.model('Objective', ObjectiveSchema);