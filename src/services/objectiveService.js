'use strict'

const
    mongoose = require('mongoose'),
    ObjectId = require('mongoose').SchemaTypes.ObjectId,
    ObjectiveRepository = require('../repositories/objectiveRepository'),
    TeamService = require('../services/teamService'),
    _ = require('lodash')

class ObjectiveService {

    *
    findByCompany(filter) {
        let query = {
            company: filter.company,
        }

        if (filter.tags && filter.tags.length > 0) {
            query.tags = {
                $all: filter.tags
            };
        }

        if (filter.active == 'true')
            query.deactivate = false

        if (filter.active == 'false')
            query.deactivate = true

        return yield ObjectiveRepository.findCompany(query);
    }

    *
    findAllByCompany(query) {
        let date = new Date()

        if (query.range == 'month')
            date.setMonth(date.getMonth() - 1)
        else if (query.range == 'week')
            date.setDate(date.getDate() - 7)
        else
            date = 0

        let filter = {
            company: query.company,
            deactivate: query.deactivate,
            updateDate: {
                "$gte": date
            }
        }


        return yield ObjectiveRepository.findCompany(filter);
    }

    *
    findObjectivesByPlanning(planningId, objectives) {
        let query = {
            planning: planningId,
            deactivate: objectives.deactivate,
        }

        if (objectives.tags)
            query.tags = {
                $all: objectives.tags
            };

        if (objectives.owners)
            query.owner = objectives.owners

        return yield ObjectiveRepository.findByPlanning(query);
    }

    *
    findObjectivesByMainObjective(objectiveId) {
        let query = {
            mainObjective: objectiveId,
            deactivate: false
        }

        return yield ObjectiveRepository.findByMainObjective(query);
    }

    *
    findOne(objective) {
        return yield ObjectiveRepository.findOne({
            '_id': objective
        });
    }

    *
    findObjectiveByChildId(childId) {
        return yield ObjectiveRepository.findOne({
            'childObjectives._id': childId
        });
    }

    *
    create(objective, user) {
        const _ = require('lodash')

        objective.company = user.company
        objective.createBy = user._id
        objective.insertDate = new Date()

        if (objective.keyResults) {
            if (!objective.keyResults.length)
                objective.keyResults = []

            if (objective.keyResults.length) {
                const obj = []

                yield _.forEach(objective.keyResults, function (item) {
                    obj.push({
                        _id: item
                    })
                })

                objective.keyResults = obj
            }
        } else
            objective.keyResults = []

        return yield ObjectiveRepository.create(objective);
    }

    *
    update(id, data) {

        data.updateDate = new Date()

        return yield ObjectiveRepository.update({
            _id: id
        }, data);
    }

    *
    includeKeyResult(id, keyResult) {
        return yield ObjectiveRepository.update({
            _id: id
        }, {
            $push: {
                keyResults: {
                    _id: keyResult
                }
            }
        });
    }

    *
    deactivate(id) {

        let objective = yield ObjectiveRepository.findOne({
            '_id': id
        });

        return yield ObjectiveRepository.update({
            _id: id
        }, {
            $set: {
                deactivate: !objective.deactivate
            }
        });
    }

    *
    archivateObjectivesByPlanning(planningId) {
        yield ObjectiveRepository.update({
            planning: planningId
        }, {
            $set: {
                deactivate: true
            }
        }, {
            multi: true
        })
    }

    *
    filterObjectivesByUser(objectives, query) {
        _.remove(objectives, function (objective) {
            if (objective.owner && query.user && objective.ownerType == 'user')
                return objective.owner._id != query.user
            else
                return objective
        })
    }

    *
    filterObjectivesByContributor(objectives, query) {
        let isNotContributor = true

        _.remove(objectives, function (objective) {
            isNotContributor = true
            if (objective.contributors.length)
                _.forEach(objective.contributors, function (contributor) {
                    if (contributor._id == query.user) {
                        isNotContributor = false
                    }
                })

            return isNotContributor
        })
    }

    *
    filterObjectivesByTeam(objectives, query) {

        let teams = yield TeamService.getUserTeams(query.user)

        _.remove(objectives, (objective) => {
            let findTeam = false
            _.forEach(teams, (team) => {
                if (objective.team) {
                    if (String(team._id) == String(objective.team._id))
                        findTeam = true
                }
            })
            if (!findTeam)
                return objective
        })
    }
}


module.exports = new ObjectiveService()