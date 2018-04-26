'use strict';

const
    _ = require('lodash'),
    Company = require('../models/companyModel').Company,
    User = require('../models/userModel').User

class ObjectiveRepository {

    *
    find(company){
        return yield User.find(company)
    }

    *
    findOne(company) {
        return yield Company.findOne(company)
    }

    *
    create(company) {
        return yield Company.create(company)
    }

    *
    update(id, data) {
        return yield Company.update(id, data)
    }

}

module.exports = new ObjectiveRepository();