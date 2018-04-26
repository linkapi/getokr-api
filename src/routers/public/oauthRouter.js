'use strict';

const
    mongoose = require('mongoose'),
    Router = require('koa-router'),
    oauthServer = require('../../oauth/oauthServer'),
    User = require('../../models/userModel').User,
    UserService = require('../../services/userService'),
    sg = require('../../services/emailService');

let oauthRouter = new Router()

oauthRouter.post('/oauth/token', oauthServer.grant())

oauthRouter.get('/oauth/hash/:hash', function* (next) {
    let user

    user = yield User.findOne({
        'hash': this.params.hash
    })

    if (user) {
        this.status = 200
        return;
    }

    this.status = 404
})

oauthRouter.patch('/oauth/enableUser/:hash', function* (next) {
    try {
        let params = this.request.body

        let newUser = yield UserService.activateUser(params)

        if (!newUser)
            this.throw(400, 'Error in User update!')

        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

oauthRouter.patch('/oauth/password/recovery', function* (next) {
    try {
        let params = this.request.body.email

        let newUserPassword = yield UserService.generateToken(params)

        if (!newUserPassword)
            this.throw(404, 'E-mail não encontrado!')

        sg.sendRecovery(newUserPassword)

        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

oauthRouter.patch('/oauth/password', function* (next) {
    try {
        let params = this.request.body

        let user = yield UserService.changePassword(params)

        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

module.exports = oauthRouter