'use strict'

const
  mongoose = require('mongoose'),
  Router = require('koa-router'),
  CheckInService = require('../../services/checkInService'),
  UserService = require('../../services/userService'),
  KeyResultService = require('../../services/keyResultService'),
  moment = require('moment'),
  _ = require('lodash')

let checkInRouter = new Router();

checkInRouter.get('/company/:id', function* (next) {
  try {
    let usersIds = []

    if (typeof (this.request.query.users) == 'object')
      _.forEach(this.request.query.users, (user) => {
        let obj = {}
        obj._id = mongoose.Types.ObjectId(user)
        usersIds.push(obj)
      })
    else {
      let obj = {}
      obj._id = mongoose.Types.ObjectId(this.request.query.users)
      usersIds.push(obj)
    }


    let users = usersIds,
      checkIns = yield CheckInService.findByUsers(users, this.request.query),
      index = 0,
      indexesToRemove = [],
      response = {
        keyResults: [],
        checkIns: []
      }

    if (!checkIns)
      this.throw(404, 'Check-ins not found!')

    response.checkIns = _.sortBy(checkIns, function (checkIn) {
      return new moment(checkIn.insertDate);
    }).reverse();

    _.remove(response.checkIns, (checkIn) => {
      if (checkIn.value == undefined || !checkIn.value)
        return checkIn
    })

    for (let checkIn of response.checkIns) {
      if ((yield KeyResultService.findKeyByCheckIn(checkIn._id))[0] != null)
        response.keyResults.push((yield KeyResultService.findKeyByCheckIn(checkIn._id))[0])
      else
        indexesToRemove.push(index)

      index++
    }

    _.remove(response.checkIns, (check, index) => {
      if (indexesToRemove.indexOf(index) != -1)
        return check
    })

    this.body = response
    this.status = 200

  } catch (err) {

    this.body = err.message
    this.status = 400
  }
});

module.exports = checkInRouter