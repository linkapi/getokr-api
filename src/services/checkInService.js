'use strict'

const
    mongoose = require('mongoose'),
    CheckInRepository = require('../repositories/checkInRepository'),
    ObjectId = require('mongoose').Types.ObjectId,
    _ = require('lodash')

class CheckInService {

    *
    create(checkIn) {
        return yield CheckInRepository.create(checkIn);
    }

    *
    findByUsers(users, filter) {
        let query = {},
            date = new Date()

        if(filter.range == 'month'){
            filter.limit = 20
            date.setMonth(date.getMonth()-1)        
        }
        else if(filter.range == 'week'){
            filter.limit = 10
            date.setDate(date.getDate()-7)
        }
        else{
            filter.limit = 50
            date = 0
        }

        query.insertDate = {
            "$gte": date
        }

        query.createdBy = {
            $in: users
        };

        return yield CheckInRepository.findByUsers(query, filter);        
    }

}

module.exports = new CheckInService()