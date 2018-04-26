'use strict';

const
    mongoose = require('mongoose'),
    Router = require('koa-router'),
    UserService = require('../../services/userService'),
    TrackService = require('../../services/trackService'),
    sg = require('../../services/emailService')

let userRouter = new Router();

userRouter.get('/me', function* (next) {
    try {
        this.body = this.user

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

userRouter.get('/:id', function* (next) {
    try {
        let params = this.request.body
        let user = yield UserService.findOne(this.params.id)

        if (!user)
            this.throw(404, 'User not found!')

        this.body = user
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

userRouter.get('/company/:id', function* (next) {
    try {
        let users = yield UserService.findByCompany(this.user.company)

        if (!users)
            this.throw(404, 'Users not found!')

        this.body = users
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

userRouter.post('/', function* (next) {
    try {
        let user = yield UserService.create(this.request.body)

        if (!user)
            this.throw(400, 'Error in User creation!')

        yield TrackService.create(user, 'user', 'create', this.user)

        sg.send(user, this.user)

        this.body = user
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

userRouter.patch('/:id', function* (next) {
    try {
        let params = this.request.body

        let update = yield UserService.update(params)

        if (!update)
            this.throw(400, 'Error in User update!')

        yield TrackService.create(params, 'user', 'update', this.user)

        this.body = update
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

userRouter.patch('/:id/password', function* (next) {
    try {
        let params = this.request.body

        let update = yield UserService.updatePassword(this.params.id, params)

        if (!update)
            this.throw(400, 'Error in User update!')

        this.body = update
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

userRouter.del('/:id', function* (next) {
    try {
        let params = this.request.body

        let update = yield UserService.deactivate(this.params.id)

        if (!update)
            this.throw(400, 'Error in User delete!')

        this.body = update
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

module.exports = userRouter;