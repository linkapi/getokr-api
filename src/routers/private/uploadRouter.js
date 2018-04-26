'use strict'

const
    mongoose = require('mongoose'),
    Router = require('koa-router'),
    UploadService = require('../../services/uploadService'),
    moment = require('moment'),
    _ = require('lodash')

let uploadRouter = new Router();

uploadRouter.post('/', function* (next) {
    try {
       let
            file_received_path = this.request.body.files.file.path,
            request = this.request.body.fields

        this.body = yield UploadService.create(file_received_path, request)
        
        this.status = 200

   } catch (err) {
       this.body = {
            message: err.message
        }
        this.status = 500
    }
})

module.exports = uploadRouter