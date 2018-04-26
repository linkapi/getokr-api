'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    company: {
        type:Schema.Types.ObjectId,
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
    objective: {
        type: Schema.Types.ObjectId,
        ref: 'Objective'
    },
    keyResult: {
        type: Schema.Types.ObjectId,
        ref: 'KeyResult'
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    checkIn: {
        type:Schema.Types.ObjectId,
        ref:'CheckIn'
    },
    type: {
        type: String,
        enum: ['create', 'update', 'archivate']
    },
    target: {
        type: String,
        enum: ['planning', 'mainObjective', 'objective', 'keyResult', 'comment', 'trustLevel', 'user', 'team', 'checkIn']
    },
    insertDate: {
        type: Date,
        default: Date.now
    }
});

module.exports.TrackSchema = TrackSchema;
module.exports.Track = mongoose.model('Track', TrackSchema);