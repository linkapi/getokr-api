'use strict';

const
    TeamRepository = require('../repositories/teamRepository'),
    UserService = require('../services/userService'),
    _ = require('lodash')

class TeamService {    

    *
        find(company) {
            let query = {}

            query.company = company
            query.active = true

        return yield TeamRepository.find(query)
    }

    *
        findWithoutPopulate(company) {
            let query = {}

            query.company = company
            query.active = true

        return yield TeamRepository.findWithoutPopulate(query)
    }

    *
        findOne(id) {
            let query = {
                _id: id
            }
            return yield TeamRepository.findOne(query)
        }

    *
        findOneAndUpdate(id, data) {
        return yield TeamRepository.findOneAndUpdate({
                _id: id
            }, {
                $set: data
            }, {
                new: true
            });
        }

    *
        update(id, data) {
        return yield TeamRepository.update({
                _id: id
            }, {
                $set: data
            });
        }

    *
        create(team) {
        return yield TeamRepository.create(team);
    }

    *
        deactivate(id, data) {
        return yield TeamRepository.update({
                _id: id
            }, {
                $set:{active: false} 
            });
    }

    *
        getUserTeams(userId) {
            let user = yield UserService.findOne(userId),            
                teams = yield this.findWithoutPopulate(user.company)            

            _.remove(teams, (team) => {    
                if(team.members.indexOf(userId) == -1 && team.leader != userId)
                    return team
            })

            return teams
        }

}

module.exports = new TeamService();