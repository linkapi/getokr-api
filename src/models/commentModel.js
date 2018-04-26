'use strict'

const 
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    CommentSchema = new Schema ({
        objective: {
            type: Schema.Types.ObjectId,
            ref: 'Objective'
        },
        newValues: [{
            type: Number
        }],
        keysModified: [{
            type: Schema.Types.ObjectId,
            ref: 'KeyResult'
        }],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        insertDate: {
            type: Date,
            default: new Date()
        },
        content: {
            type: String
        },
        link: {
            type: String
        },
        active: {
            type: Boolean,
            default: true
        },
        archive_name: {
            type: String
        },
        upload: {
            type: Schema.Types.ObjectId,
            ref: 'Upload'
        }
    })

module.exports.CommentSchema = CommentSchema
module.exports.Comment = mongoose.model('Comment', CommentSchema)


