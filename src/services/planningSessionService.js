'use strict'

const
    mongoose = require('mongoose'),
    _ = require('lodash'),
    PlanningRepository = require('../repositories/planningSessionRepository'),
    ObjectiveRepository = require('../repositories/objectiveRepository')

class PlanningService {

    *
        findByCompany(company, query) {
        if (query.type) {
            return yield PlanningRepository.find({
                'company': company,
                'deactivate': false,
                'type': query.type
            })
        }
        return yield PlanningRepository.find({
            'company': company,
            'deactivate': false
        })
    }

    *
        findOne(planningId, filter) {
        let query = {},
            planning = {},
            objectives = []

        planning = yield PlanningRepository.findOneAndPopulateChildObjectvies({
            '_id': planningId
        }, {
                path: 'objectives._id',
                populate: {
                    path: 'childObjectives._id',
                    populate: {
                        path: 'keyResults._id',
                    }
                }
            })

        this.setFilters(filter, query)

        const data = yield ObjectiveRepository.find(query)

        yield _.forEach(data, obj => {
            objectives.push({
                '_id': obj
            })
        })

        return planning

    }

    *
        create(planning, company) {
        planning.company = company
        return yield PlanningRepository.create(planning);
    }

    *
        update(data) {
        data.updateDate = new Date()
        return yield PlanningRepository.update({
            _id: data._id
        }, data);
    }

    *
        findOneAndUpdate(planning, childId) {
        planning.updateDate = new Date()
        return yield PlanningRepository.findOneAndUpdate({
            _id: planning._id
        }, planning);
    }

    *
        includeObjective(id, objective) {
        return yield PlanningRepository.update({
            _id: id
        }, {
                $push: {
                    objectives: {
                        _id: objective
                    }
                }
            });
    }

    *
        deactivate(id) {
        return yield PlanningRepository.update({
            _id: id
        }, {
                $set: {
                    deactivate: true
                }
            });
    }


    setFilters(filter, query) {

        if (filter.company)
            query.company = filter.company

        if (filter.planning)
            query.planning = filter.planning

        if (filter.owner && filter.owner.length > 0)
            query.owner = {
                $in: filter.owner
            };

        if (filter.tags && filter.tags.length > 0)
            query.tags = {
                $all: filter.tags
            };

    }
}

module.exports = new PlanningService()