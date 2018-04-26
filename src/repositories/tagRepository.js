'use strict'

const
    _ = require('lodash'),
    Tag = require('../models/tagModel').Tag

class UserRepository {

    *
    find(company) {
        return yield Tag.find(company)
    }

    *
    findOne(id) {
        return yield Tag.findOne({
            '_id' : id
        })
    }

    *
    create(tag) {
        return yield Tag.create(tag)
    }

    *
    delete(tag) {
        return yield Tag.remove({
            '_id' : tag
        })
    }
}

module.exports = new UserRepository();