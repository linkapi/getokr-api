'use strict';

const
    _ = require('lodash'),
    User = require('../models/userModel').User,
    mongoose = require('mongoose')

class UserRepository {

    *
    findOne(user) {
        return yield User.findOne(user)
            .populate('companies')
    }

    *
    find(user) {
        return yield User.find(user)
    }

    *
    findIds(user, field) {
        return yield User.find(user, field)
    }

    *
    create(user) {
        user.hash = mongoose.Types.ObjectId()

        return yield User.create(user)
    }

    *
    update(id, data) {
        return yield User.update(id, data)
    }

}

module.exports = new UserRepository();