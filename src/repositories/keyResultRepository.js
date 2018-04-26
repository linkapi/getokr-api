'use strict';

const
    _ = require('lodash'),
    KeyResult = require('../models/keyResultModel').KeyResult

class KeyResultRepository {

    *
    findOne(keyResult) {
        return yield KeyResult.findOne(keyResult)
    }

    *
    find(keyResult) {
        return yield KeyResult.find(keyResult).populate({
            path: 'objective',
            populate:{
                path: 'mainObjective'
            }
        })
    }

    *
    create(keyResult) {
        return yield KeyResult.create(keyResult)
    }

    *
    update(id, data, unset) {
        return yield KeyResult.update(id, data, unset)
    }

}

module.exports = new KeyResultRepository();