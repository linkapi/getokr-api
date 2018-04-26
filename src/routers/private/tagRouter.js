'use strict'

const
    mongoose = require('mongoose'),
    Router = require('koa-router'),
    TagService = require('../../services/tagService')

let tagRouter = new Router();

tagRouter.get('/:id', function* (next) {
    try {
        let tags = yield TagService.findCompanyTags(this.params.id)

        if (!tags)
            this.throw(404, 'Tags not found!')

        this.body = tags
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

tagRouter.post('/', function* (next) {
    try {

        let tag = yield TagService.create(this.request.body)

        if (!tag)
            this.throw(400, 'Error in Tag creation!')

        this.body = tag
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

tagRouter.del('/:id', function* (next) {
    try {
        let tag = yield TagService.delete(this.params.id)

        if (!tag)
            this.throw(404, 'Error in Tag deletion!')

        this.status = 200
    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

module.exports = tagRouter