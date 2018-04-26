'use strict';

const
    _ = require('lodash'),
    Team = require('../models/teamModel').Team,
    mongoose = require('mongoose')

class TeamRepository {

    *
    find(team) {    
        return yield Team.find(team)
        .populate('leader')
        .populate('members')
    }

    *
    findWithoutPopulate(team) {
        return yield Team.find(team)
    }

    *
    findOne(team) {
        return yield Team.findOne(team)
    }

    *
    create(team) {
        let newTeam = yield Team.create(team)

        return Team.populate(newTeam, {
            path: 'leader members objectives'
        })
    }

    *
    update(id, data) {
        return yield Team.update(id, data)
    }

    *
    findOneAndUpdate (id, data, options) {
        let update = yield Team.findOneAndUpdate(id, data, options)        

        return Team.populate(update, {
            path: 'leader members objectives'
        })
    }

}

module.exports = new TeamRepository();