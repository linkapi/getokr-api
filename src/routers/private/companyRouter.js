'use strict';

const
    mongoose = require('mongoose'),
    Router = require('koa-router'),
    CompanyService = require('../../services/companyService'),
    _ = require('lodash')

let companyRouter = new Router()

companyRouter.get('/me', function* (next) {
    try {
        let company = yield CompanyService.findOne(this.user.company)

        if (!company)
            this.throw(404, 'Company not found!')

        this.body = company
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

companyRouter.get('/users', function* (next) {
    try {
        let query = this.request.query,
            users = yield CompanyService.findCompanyUsers(this.user.company)

        if (!users)
            this.throw(404, 'Company not found!')

        if (query.filter)
            _.remove(users, function (user) {
                if (query.filter.indexOf(String(user._id)) == -1)
                    return user
            })

        _.forEach(users, function (user) {
            user.customName = user.firstName + ' ' + user.lastName
        })

        this.body = users
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

companyRouter.get('/:id', function* (next) {
    try {
        let company = yield CompanyService.findOne(this.params.id)

        if (!company)
            this.throw(404, 'Company not found!')

        this.body = company
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

companyRouter.post('/', function* (next) {
    try {
        let company = yield CompanyService.create(this.request.body)

        if (!company)
            this.throw(400, 'Error in Company creation!')

        this.body = company
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

companyRouter.patch('/:id', function* (next) {
    try {
        let params = this.request.body,
            update

        update = yield CompanyService.update(params)

        if (!update)
            this.throw(400, 'Error in Company update!')

        this.body = update
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

companyRouter.del('/:id', function* (next) {
    try {
        let params = this.request.body

        let update = yield CompanyService.deactivate(this.params.id)

        if (!update)
            this.throw(400, 'Error in Company delete!')

        this.body = update
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

module.exports = companyRouter