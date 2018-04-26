'use strict';

const
    _ = require('lodash'),
    CheckIn = require('../models/checkInModel').CheckIn,
    mongoose = require('mongoose')
    
class CheckInRepository {

    *
    create(checkIn) {
        return yield CheckIn.create(checkIn)
    }

    *
    findByUsers(users, filter) {        
        if(filter.skip == -1)
            return yield CheckIn.find(users)
            .populate({
                path: 'createdBy'
            })

        return yield CheckIn.find(users)
            .populate({
                path: 'createdBy'
            }).skip(Number(filter.skip)).limit(filter.limit).sort({'insertDate':-1})
    }

}

module.exports = new CheckInRepository();