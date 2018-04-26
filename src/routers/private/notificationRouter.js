'use strict'

const
    mongoose = require('mongoose'),
    Router = require('koa-router'),
    NotificationService = require('../../services/notificationService')

let notificationRouter = new Router();

notificationRouter.get('/:id', function* (next) {
    try {
        let notification = yield NotificationService.find(this.params.id)

        if (!notification)
            this.throw(404, 'Notification not found!')

        this.body = notification
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

notificationRouter.post('/', function* (next) {
    try {

        let notification = yield NotificationService.create(this.request.body)

        if (!notification)
            this.throw(400, 'Error in Notification creation!')

        this.body = notification
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

notificationRouter.patch('/:id', function* (next) {
    try {
        let params = this.request.body,
            update = yield NotificationService.update(this.params.id, params)

        if (!update)
            this.throw(400, 'Error in Notification update!')

        this.body = update
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

notificationRouter.del('/:id', function* (next) {
    try {
        let update = yield NotificationService.deactivate(this.params.id)

        if (!update)
            this.throw(400, 'Error in Notification delete!')

        this.body = update
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

module.exports = notificationRouter