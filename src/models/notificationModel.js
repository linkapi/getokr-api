'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String
    },
    insertDate: {
        type: Date,
        default: Date.now
    },
    daysToTrigger: {
        type: Number
    },
    active: {
        type: Boolean,
        default: true
    },
    objectives: [{
        type: Schema.Types.ObjectId,
        ref: 'Objective'

    }]
});

module.exports.NotificationSchema = NotificationSchema;
module.exports.Notification = mongoose.model('Notification', NotificationSchema);