'use strict';
const
    mongoose = require('mongoose'),
    Router = require('koa-router'),
    KeyResultService = require('../../services/keyResultService'),
    ObjectiveService = require('../../services/objectiveService'),
    TrackService = require('../../services/trackService'),
    CheckInService = require('../../services/checkInService'),
    RecalculateProgress = require('../../services/recalculateProgress'),
    _ = require('lodash')

let keyResultRouter = new Router()
keyResultRouter.get('/', function* (next) {
    try {
        let keyResults = yield KeyResultService.findByCompany(this.request.user.company)
        if (!keyResults)
            this.throw(404, 'Key Results not found!')
        this.body = keyResults
        this.status = 200
    } catch (err) {
        this.body = err.message
        this.status = 400
    }
})
keyResultRouter.get('/:id', function* (next) {
    try {
        let keyResult = yield KeyResultService.findOne(this.params.id)
        if (!keyResult)
            this.throw(404, 'Key Result not found!')
        this.body = keyResult
        this.status = 200
    } catch (err) {
        this.body = err.message
        this.status = 400
    }
})

keyResultRouter.post('/', function* (next) {
    try {
        let params = this.request.body

        let keyResult = yield KeyResultService.create(params)

        if (!keyResult)
            this.throw(400, 'Error in Key result creation!')

        yield TrackService.create(keyResult, 'keyResult', 'create', this.user)

        yield ObjectiveService.includeKeyResult(params.objective, keyResult._id)
        yield RecalculateProgress.newKeyOrNewCheckIn(keyResult)

        this.body = keyResult
        this.status = 200
    } catch (err) {
        this.body = err.message
        this.status = 400
    }
})
keyResultRouter.patch('/:id', function* (next) {
    try {
        let params = this.request.body,
            recalculate = false

        if (params.recalculate) {
            delete params.recalculate
            recalculate = true
        }

        if (params.type == 'number') {
            let checkInParams = {
                keyResult: params._id,
                createdBy: this.user._id,
                oldValue: params.oldValue,
                value: params.currentValue
            }

            if (checkInParams.oldValue) {
                let checkIn = yield CheckInService.create(checkInParams)

                if (!checkIn)
                    this.throw(400, 'Error in CheckIn creation!')

                yield TrackService.create(checkIn, 'checkIn', 'create', this.user)

                params.checkIns.push({
                    '_id': checkIn._id
                })
            }
        }

        let update = yield KeyResultService.update(this.params.id, params)

        if (!update)
            this.throw(400, 'Error in Key Result update!')

        if (params.edit)
            yield TrackService.create(params, 'keyResult', 'update', this.user)

        let keyResult = yield KeyResultService.findOne(params._id)

        yield RecalculateProgress.newKeyOrNewCheckIn(keyResult)

        if (params.changesToTrustLevel) {
            yield TrackService.create(params, 'trustLevel', 'update', this.user)
            let high = 0,
                normal = 0,
                low = 0,
                objective = yield ObjectiveService.findOne(params.objective)

            _.forEach(objective.keyResults, (key) => {
                if (key._id.isActive && key._id.trustLevel) {
                    if (key._id.trustLevel == 'high')
                        high++
                    else if (key._id.trustLevel == 'normal')
                        normal++
                    else
                        low++
                }
            })

            if (high > normal && high > low)
                objective.trustLevel = 'high'
            else if (normal > high && normal > low)
                objective.trustLevel = 'normal'
            else if (low > high && low > normal)
                objective.trustLevel = 'low'
            else
                objective.trustLevel = 'tie'

            yield ObjectiveService.update(objective._id, objective)
        }


        this.body = update
        this.status = 200
    } catch (err) {
        this.body = err.message
        this.status = 400
    }
})

keyResultRouter.del('/:id', function* (next) {
    try {
        let params = this.request.body
        let update = yield KeyResultService.deactivate(this.params.id)

        if (!update)
            this.throw(400, 'Error in Key Result delete!')

        yield TrackService.create(this.params.id, 'keyResult', 'archivate', this.user)

        let keyResult = yield KeyResultService.findOne(this.params.id)
        yield RecalculateProgress.archivateKey(keyResult)

        this.body = update
        this.status = 200
    } catch (err) {
        this.body = err.message
        this.status = 400
    }
})
module.exports = keyResultRouter