'use strict';

const
    _ = require('lodash'),
    Comment = require('../models/commentModel').Comment,
    mongoose = require('mongoose')
    
class CommentRepository {

    *
    findOne(query) {
        return Comment.findOne(query)
        .populate('createdBy keysModified')
    }

    *
    create(comment) {
        let newComment = yield Comment.create(comment)

        return Comment.populate(newComment, {
            path: 'createdBy keysModified'
        })
    }

    *
    findByObjective(query) {
        return yield Comment.find(query)
        .populate('createdBy keysModified')
    }

    *
    findOneAndUpdate (id, data, options) {
        let update = yield Comment.findOneAndUpdate(id, data, options)        

        return Comment.populate(update, {
            path: 'createdBy KeysModified'
        })
    }

    *
    delete (query) {
        return yield Comment.remove(query)
    }
}

module.exports = new CommentRepository();