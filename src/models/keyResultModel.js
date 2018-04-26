'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KeyResultSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    objective: {
        type: Schema.Types.ObjectId,
        ref: 'Objective'
    },
    type: {
        type: String,
        enum: ['number', 'boolean'],
        required: true
    },
    criteria: {
        type: String,
        enum: ['atMost', 'atLeast']
    },
    inicialValue: {
        type: Number
    },
    targetValue: {
        type: Number
    },
    currentValue: {
        type: Number
    },
    progress: {
        type: Number
    },
    finished: {
        type: Boolean
    },
    format: {
        type: String,
        enum: ['percent', 'money', 'unitary']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    insertDate: {
        type: Date
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    checkIns: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'CheckIn'
        }
    }],
    trustLevel: {
        type: String,
        enum: ['high', 'normal', 'low']
    }
});

module.exports.KeyResultSchema = KeyResultSchema;
module.exports.KeyResult = mongoose.model('KeyResult', KeyResultSchema);