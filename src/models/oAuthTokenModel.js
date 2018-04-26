'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OAuthTokenSchema = new Schema({
    accessToken: {
        type: String,
        required: true,
        unique: true
    },
    clientId: String,
    expires: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports.OAuthTokenSchema = OAuthTokenSchema;
module.exports.OAuthToken = mongoose.model('OAuthToken', OAuthTokenSchema);