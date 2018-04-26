'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanningSessionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    type: {
        type: String,
        enum: ['objective', 'company']
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    insertDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    deactivate: {
        type: Boolean,
        default: false
    },
    isFinished: {
        type: Boolean,
        default: false
    },
    childPlannings: [{
        type: Schema.Types.ObjectId,
        ref: 'PlanningSession'
    }]
});

module.exports.PlanningSessionSchema = PlanningSessionSchema;
module.exports.PlanningSession = mongoose.model('PlanningSession', PlanningSessionSchema);