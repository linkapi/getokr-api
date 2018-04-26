'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckInSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    keyResult: {
        type: Schema.Types.ObjectId,
        ref: 'KeyResult'
    },
    oldValue: {
        type: String
    },
    value: {
        type: String
    },
    insertDate: {
        type: Date,
        default: Date.now
    }
});

module.exports.CheckInSchema = CheckInSchema;
module.exports.CheckIn = mongoose.model('CheckIn', CheckInSchema);