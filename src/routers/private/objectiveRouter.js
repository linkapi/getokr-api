'use strict';

const
    mongoose = require('mongoose'),
    _ = require('lodash'),
    Router = require('koa-router'),
    ObjectiveService = require('../../services/objectiveService'),
    TrackService = require('../../services/trackService'),
    PlanningService = require('../../services/planningSessionService'),
    RecalculateProgress = require('../../services/recalculateProgress'),
    TeamService = require('../../services/teamService')

let objectiveRouter = new Router()

objectiveRouter.get('/me', function* (next) {
    try {
        let objectives
        if (this.request.query.option == 'all')
            objectives = yield ObjectiveService.findAllByCompany(this.request.query)

        if (!this.request.query.option)
            objectives = yield ObjectiveService.findByCompany(this.request.query)

        if (!objectives)
            this.throw(404, 'Objectives not found!')

        this.body = objectives
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

objectiveRouter.get('/:id', function* (next) {
    try {
        let objective = yield ObjectiveService.findOne(this.params.id)

        if (!objective)
            this.throw(404, 'Objective not found!')

        this.body = objective
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

objectiveRouter.get('/planning/:id', function* (next) {
    try {
        let query = this.request.query,
            objectives = yield ObjectiveService.findObjectivesByPlanning(this.params.id, query)

        if (!objectives)
            this.throw(404, 'Objectives not found!')

        switch (query.selectedTab) {
            case 'myOkr':
                yield ObjectiveService.filterObjectivesByUser(objectives, query)
                break
            case 'all':
                if (query.hierarchy.length > 1)
                    _.remove(objectives, function (objective) {
                        if (objective.hierarchy != 'child' && objective.hierarchy != 'none')
                            return objective
                    })
                else
                    _.remove(objectives, function (objective) {
                        return objective.hierarchy != query.hierarchy
                    })
                break
            case 'contributor':
                yield ObjectiveService.filterObjectivesByContributor(objectives, query)
                break
            case 'team':
                yield ObjectiveService.filterObjectivesByTeam(objectives, query)
                break
        }

        this.body = objectives
        this.status = 200

    } catch (err) {
        this.body = err.message
        this.status = 400
    }
})

objectiveRouter.get('/mainobjective/:id', function* (next) {
    try {
        let objectives = yield ObjectiveService.findObjectivesByMainObjective(this.params.id)

        if (!objectives)
            this.throw(404, 'Objectives not found!')

        this.body = objectives
        this.status = 200

    } catch (err) {
        this.body = err.message
        this.status = 400
    }
})

objectiveRouter.post('/', function* (next) {
    try {

        let objective = yield ObjectiveService.create(this.request.body, this.user)

        if (!objective)
            this.throw(400, 'Error in Objective creation!')

        yield TrackService.create(objective, 'objective', 'create', this.user)

        if (this.request.body.ownerType == 'team') {
            let team = yield TeamService.findOne(objective.team)

            if (team.objectives.indexOf(objective._id) == -1) {
                team.objectives.push(objective._id)

                let update = yield TeamService.update(team._id, team)

                if (!update)
                    this.throw(400, 'Error in Team update!')
            }
        }

        if (objective.mainObjective) {
            let mainObjective = yield ObjectiveService.findOne(objective.mainObjective)

            if (!mainObjective)
                this.throw(400, 'Error in find Main Objective!')

            if (!mainObjective.childObjectives)
                mainObjective.childObjectives = []

            mainObjective.childObjectives.push(objective._id)

            yield ObjectiveService.update(objective.mainObjective, mainObjective)
        }
        yield PlanningService.includeObjective(this.request.body.planning, objective.id)

        yield RecalculateProgress.newObjective(objective)

        this.body = objective
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

objectiveRouter.patch('/:id', function* (next) {
    try {
        delete this.request.body.progress

        let params = this.request.body,
            newMainObjective,
            mainObjective

        if (params.hierarchy == 'main') {

            let objective = yield ObjectiveService.findOne(this.params.id)

            delete objective.progress

            if (!objective)
                this.throw(400, 'Objective not found!')

            if (objective.childObjectives.length > this.request.body.childObjectives.length) {

                let childId = _.difference(objective.childObjectives, params.childObjectives.length)

                let obj = {
                    'mainObjective': null
                }
                let removeMainObjective = yield ObjectiveService.update(childId[0]._id, obj)

            }
        }

        let update = yield ObjectiveService.update(this.params.id, params)

        if (!update)
            this.throw(400, 'Error in Objective update!')

        yield TrackService.create(params, 'objective', 'update', this.user)

        if (params.ownerType == 'team') {
            let team = yield TeamService.findOne(params.team)

            if (team.objectives.indexOf(params._id) == -1) {
                team.objectives.push(params._id)

                let update = yield TeamService.update(team._id, team)

                if (!update)
                    this.throw(400, 'Error in Team update!')
            }
        }

        if (params.hierarchy == 'none') {
            this.body = update
            this.status = 200
            return
        }


        if (params.hierarchy != 'main' && (!params.mainObjective || params.mainObjective.length == 0)) {
            mainObjective = yield ObjectiveService.findObjectiveByChildId(this.params.id)

            _.remove(mainObjective.childObjectives, childObjective => {
                return childObjective._id == this.params.id
            })

            yield ObjectiveService.update(mainObjective._id, mainObjective)
        }


        if (params.mainObjective && params.mainObjective.length != 0) {
            mainObjective = yield ObjectiveService.findObjectiveByChildId(this.params.id)

            if (!mainObjective) {
                newMainObjective = yield ObjectiveService.findOne(params.mainObjective)

                delete newMainObjective.progress

                if (!newMainObjective.childObjectives)
                    newMainObjective.childObjectives = []

                newMainObjective.childObjectives.push(this.params.id)

                yield ObjectiveService.update(newMainObjective._id, newMainObjective)
            }

            if (mainObjective && mainObjective._id != params.mainObjective._id) {

                _.remove(mainObjective.childObjectives, childObjective => {
                    return childObjective._id == params._id
                })

                yield ObjectiveService.update(mainObjective._id, mainObjective)

                newMainObjective = yield ObjectiveService.findOne(params.mainObjective._id)

                delete newMainObjective.progress

                if (!newMainObjective.childObjectives)
                    newMainObjective.childObjectives = []

                newMainObjective.childObjectives.push(this.params.id)

                yield ObjectiveService.update(newMainObjective._id, newMainObjective)

            }

        }

        this.body = update
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

objectiveRouter.del('/:id', function* (next) {
    try {
        let update = yield ObjectiveService.deactivate(this.params.id)

        if (!update)
            this.throw(400, 'Error in Planning delete!')

        yield TrackService.create(this.params.id, 'objective', 'archivate', this.user)

        let objective = yield ObjectiveService.findOne(this.params.id)

        yield RecalculateProgress.archivateObjective(objective)

        this.body = update
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})



module.exports = objectiveRouter