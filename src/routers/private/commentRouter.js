'use strict'

const
  mongoose = require('mongoose'),
  Router = require('koa-router'),
  CommentService = require('../../services/commentService'),
  TrackService = require('../../services/trackService'),
  UploadService = require('../../services/uploadService')

let commentRouter = new Router();

commentRouter.get('/:id', function* (next) {
  try {
    let params = this.request.body,
      response = yield CommentService.getCommentsByObjective(this.params.id)

    if (!response) {
      this.throw(400, 'Error in find Comments!')
    }

    this.body = response
    this.status = 200

  } catch (err) {

    this.body = err.message
    this.status = 400
  }
})

commentRouter.post('/', function* (next) {
  try {
    let params = this.request.body,
      response = yield CommentService.create(params)

    if (!response) {
      this.throw(400, 'Error in Comment creation!')
    }

    yield TrackService.create(response, 'comment', 'create', this.user)

    this.body = response
    this.status = 200

  } catch (err) {

    this.body = err.message
    this.status = 400
  }
})

commentRouter.patch('/:id', function* (next) {
  try {
    let params = this.request.body

    let response = yield CommentService.update(params)

    if (!response) {
      this.throw(400, 'Error in Comment update!')
    }

    yield TrackService.create(response, 'comment', 'update', this.user)

    this.body = response
    this.status = 200
  } catch (err) {
    this.body = err.message
    this.status = 400
  }
})

commentRouter.delete('/:id', function* (next) {
  try {
    let params = this.request.body,
      comment = yield CommentService.findOne(this.params.id),
      response

    if (comment.upload)
      yield UploadService.deleteFileFromS3(comment)

    response = yield CommentService.delete(this.params.id)

    if (!response) {
      this.throw(400, 'Error in remove Comment!')
    }

    yield TrackService.create(this.params.id, 'comment', 'archivate', this.user)

    this.body = response
    this.status = 200

  } catch (err) {
    this.body = err.message
    this.status = 400
  }
})

module.exports = commentRouter