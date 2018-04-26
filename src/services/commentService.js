'use strict'

const
    mongoose = require('mongoose'),
    CommentRepository = require('../repositories/commentRepository'),
    ObjectId = require('mongoose').Types.ObjectId,
    _ = require('lodash')

class CommentService {

    *
    findOne(commentId) {
        return yield CommentRepository.findOne({
            _id: commentId
        })
    }

    *
    create(comment) {
        return yield CommentRepository.create(comment);
    }

    *
    delete(id) {
        return yield CommentRepository.findOneAndUpdate({
            _id: id
        }, {
                $set: {
                    active: false
                }
            });
    }

    *
    getCommentsByObjective(objectiveId) {
        return yield CommentRepository.findByObjective({
            objective: objectiveId,
            active: true
        })
    }

    *
    update(comment) {
        return yield CommentRepository.findOneAndUpdate({
                _id: comment._id
            }, {
                $set: comment
            }, {
                new: true
            });
    }

}

module.exports = new CommentService()