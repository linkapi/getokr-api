'use strict';

const
    mongoose = require('mongoose'),
    Router = require('koa-router'),
    PlanningService = require('../../services/planningSessionService'),
    ObjectiveService = require('../../services/objectiveService'),
    TrackService = require('../../services/trackService'),
    RecalculateProgress = require('../../services/recalculateProgress'),
    _ = require('lodash')

let planningSessionRouter = new Router()

planningSessionRouter
    .get('/me', function* (next) {
        try {
            let planningSessions = yield PlanningService.findByCompany(this.user.company, this.request.query)

            if (!planningSessions)
                this.throw(404, 'Plannings not found!')

            yield _.forEach(planningSessions, function (planning) {
                _.remove(planning.childPlannings, function (child) {
                    return child.deactivate
                })
            })

            this.body = planningSessions
            this.status = 200

        } catch (err) {
            this.body = err.message
            this.status = 400
        }
    })

    .get('/:id', function* (next) {
        try {
            let planningSession = yield PlanningService.findOne(this.params.id, this.request.query)

            if (!planningSession)
                this.throw(404, 'Planning not found!')

            yield _.remove(planningSession.childPlannings, function (child) {
                return child.deactivate
            })

            this.body = planningSession
            this.status = 200

        } catch (err) {
            this.body = err.message
            this.status = 400
        }
    })

    .post('/', function* (next) {
        try {
            this.request.body.createdBy = this.user._id

            let planningSession = yield PlanningService.create(this.request.body, this.user.company)

            if (!planningSession)
                this.throw(400, 'Error in Planning creation!')

            yield TrackService.create(planningSession, 'planning', 'create', this.user)

            this.body = planningSession
            this.status = 200

        } catch (err) {

            this.body = err.message
            this.status = 400
        }
    })

    .patch('/:id', function* (next) {
        try {
            let params = this.request.body,
                update

            update = yield PlanningService.update(params)

            if (!update)
                this.throw(400, 'Error in Planning update!')

            yield TrackService.create(params, 'planning', 'update', this.user)

            this.body = update
            this.status = 200

        } catch (err) {

            this.body = err.message
            this.status = 400
        }
    })

    .delete('/:id', function* (next) {
        try {
            let params = this.request.body

            let update = yield PlanningService.deactivate(this.params.id)

            if (!update)
                this.throw(400, 'Error in Planning delete!')

            yield TrackService.create(this.params.id, 'planning', 'archivate', this.user)

            yield ObjectiveService.archivateObjectivesByPlanning(this.params.id)

            yield RecalculateProgress.archivateChildPlanning(this.user.company)

            this.body = update
            this.status = 200

        } catch (err) {

            this.body = err.message
            this.status = 400
        }
    })


module.exports = planningSessionRouter