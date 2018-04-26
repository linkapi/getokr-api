'use strict'

const
    mongoose = require('mongoose'),
    TrackRepository = require('../repositories/trackRepository'),
    ObjectId = require('mongoose').Types.ObjectId,
    _ = require('lodash')

class TrackService {

    *
    find(company, filter) {
        let date = new Date(),
            query = {}

        if(filter.range == 'month'){
            filter.limit = 20
            date.setMonth(date.getMonth()-1)        
        }
        else {
            filter.limit = 10
            date.setDate(date.getDate()-7)
        }

        query.insertDate = {
            "$gte": date
        }

        query.company = company

        if(filter.owners)
            query.createdBy = filter.owners

        return yield TrackRepository.find(query, filter)
    }

    *
    create(object, target, type, user) {
        let track = {
            createdBy: user._id,
            company: user.company,
            type: type,
            target: target
        }

        switch (target){
            case 'keyResult':
                track.keyResult = object._id || object
                break
            case 'trustLevel':
                track.keyResult = object._id
                break
            case 'objective':
                track.objective = object._id || object
                break
            case 'planning':
                track.planning = object._id || object
                break
            case 'checkIn':
                track.checkIn = object._id
                break
            case 'comment':
                track.comment = object._id || object
                break
            case 'user':
                track.user = object._id
                break
            case 'team':
                track.team = object._id || object
                break
        }

        return yield TrackRepository.create(track);
    }

    *
    delete(id) {
        return yield TrackRepository.delete({
            _id: id
        });
    }

}

module.exports = new TrackService()