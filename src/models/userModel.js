'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    hash: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    insertDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    isAdministrator: {
        type: Boolean
    },
    canCreate: {
        type: Boolean
    },
    isActive: {
        type: Boolean
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    companies: [{
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }],
    customize: {
        progressBar: [{
            begin: Number,
            end: Number,
            color: String
        }]
    },
    password_token: {
        expires: String,
        token: String
    },
    oauthClients: [{
        type: Schema.Types.ObjectId,
        ref: 'OAuthClient'
    }]
});

module.exports.UserSchema = UserSchema;
module.exports.User = mongoose.model('User', UserSchema);