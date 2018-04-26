'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadSchema = new Schema({
    archive_name: {
        type: String,
        required: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    insertDate: {
        type: Date,
        default: new Date()
    },
    link: {
        type: String,
        required: true
    }
});

module.exports.UploadSchema = UploadSchema;
module.exports.Upload = mongoose.model('Upload', UploadSchema);