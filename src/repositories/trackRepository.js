'use strict';

const
    _ = require('lodash'),
    Track = require('../models/trackModel').Track,
    mongoose = require('mongoose')
    
class TrackRepository {

    *
    find(query, filter) {
        return yield Track.find(query)
        .populate('user planning objective keyResult comment team checkIn createdBy')
        .populate({
            path: 'comment',
            populate:{
                path: 'objective',
            }
        })
        .populate({
            path: 'keyResult',
            populate:{
                path: 'objective',
            }
        })
        .populate({
            path: 'checkIn',
            populate:{
                path: 'keyResult',
                populate: {
                    path: 'objective'
                }
            }
        })
        .skip(Number(filter.skip)).limit(filter.limit).sort({'insertDate':-1})
    }

    *
    create(track) {
        return yield Track.create(track)
    }

    *
    delete (query) {
        return yield Track.remove(query)
    }
}

module.exports = new TrackRepository();