'use strict';

const
    mongoose = require('mongoose'),
    Router = require('koa-router'),
    TeamService = require('../../services/teamService'),
    TrackService = require('../../services/trackService'),
    ObjectiveService = require('../../services/objectiveService'),        
    _ = require('lodash')

let teamRouter = new Router()

teamRouter.get('/:id', function* (next) {
    try {
        let teams = yield TeamService.find(this.params.id)

        if (!teams)
            this.throw(404, 'Teams not found!')

        this.body = teams
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

teamRouter.post('/', function* (next) {
    try {
        let params = this.request.body

        let team = yield TeamService.create(params)

        if (!team)
            this.throw(400, 'Error in Team creation!')

        yield TrackService.create(team, 'team', 'create', this.user)

        this.body = team
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

teamRouter.patch('/:id', function* (next) {
    try {
        let params = this.request.body,
            update = yield TeamService.findOneAndUpdate(this.params.id, params)

        if (!update)
            this.throw(400, 'Error in Key Result update!')

        yield TrackService.create(params, 'team', 'update', this.user)
        
        this.body = update
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

teamRouter.del('/:id', function* (next) {
    try {
        let params = this.request.body

        let update = yield TeamService.deactivate(this.params.id, params)

        if (!update)
            this.throw(400, 'Error in Key Result delete!')

        yield TrackService.create(this.params.id, 'team', 'archivate', this.user)

        this.body = update
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

module.exports = teamRouter