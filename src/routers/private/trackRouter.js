'use strict';

const
    mongoose = require('mongoose'),
    Router = require('koa-router'),
    TrackService = require('../../services/trackService'),
    _ = require('lodash')

let trackRouter = new Router()

trackRouter.get('/:id', function* (next) {
    try {
        let tracks = yield TrackService.find(this.user.company, this.request.query)

        if (!tracks)
            this.throw(404, 'Tracks not found!')

        this.body = tracks
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

trackRouter.post('/', function* (next) {
    try {
        let params = this.request.body

        let team = yield TrackService.create(params)

        if (!team)
            this.throw(400, 'Error in Track creation!')

        this.body = team
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

trackRouter.patch('/:id', function* (next) {
    try {
        let params = this.request.body,
            update = yield TrackService.findOneAndUpdate(this.params.id, params)

        if (!update)
            this.throw(400, 'Error in Track update!')

        this.body = update
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

trackRouter.del('/:id', function* (next) {
    try {
        let params = this.request.body

        let update = yield TrackService.deactivate(this.params.id, params)

        if (!update)
            this.throw(400, 'Error in Track delete!')

        this.body = update
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

module.exports = trackRouter