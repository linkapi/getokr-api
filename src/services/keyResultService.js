'use strict'

const
    mongoose = require('mongoose'),
    KeyResultRepository = require('../repositories/keyResultRepository'),
    _ = require('lodash')

class KeyResultService {

    *
        findByCompany(company) {
        return yield KeyResultRepository.find({
            'company': company,
            'isActive': true
        });
    }

    *
        findOne(keyResult) {
        return yield KeyResultRepository.findOne({
            '_id': keyResult
        });
    }

    *
        findKeyByCheckIn(checkIn) {
        let query = {}

        return yield KeyResultRepository.find({
            checkIns: {
                "$elemMatch": {
                    "_id": checkIn
                }
            }
        })
    }

    *
        create(keyResult) {
        keyResult.isActive = true
        keyResult.insertDate = new Date()
        return yield KeyResultRepository.create(keyResult);
    }

    *
        update(id, data) {
        data.updateDate = new Date()

        if (data.inicialValue != undefined) {
            return yield KeyResultRepository.update({
                _id: id
            }, data);
        }

        if (data.inicialValue)
            return yield KeyResultRepository.update({
                _id: id
            }, {
                    $set: data,
                    $unset: {
                        inicialValue: 1,
                        currentValue: 1,
                        targetValue: 1
                    }
                });

        return yield KeyResultRepository.update({
            _id: id
        }, {
                $set: data
            });
    }

    *
        deactivate(id) {
        return yield KeyResultRepository.update({
            _id: id
        }, {
                $set: {
                    isActive: false
                }
            });
    }

}

module.exports = new KeyResultService()