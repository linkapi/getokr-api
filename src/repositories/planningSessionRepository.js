'use strict';

const
    _ = require('lodash'),
    PlanningSession = require('../models/planningSessionModel').PlanningSession

class PlanningSessionRepository {

    *
    findOne(planning) {
        return yield PlanningSession.findOne(planning)
            .populate({
                path: 'objectives._id',
                populate: {
                    path: 'keyResults._id'
                }
            })
    }

    *
    findOneAndPopulateChildObjectvies(planning, populate) {
        return yield PlanningSession.findOne(planning)
            .populate({
                path: 'childPlannings'
            })
            .populate(populate).lean()
    }

    *
    find(planning) {
        return yield PlanningSession.find(planning)
            .populate({
                path: 'createdBy'
            })
            .populate({
                path: 'childPlannings'
            })
    }

    *
    findOnePlanning(id){
        return yield PlanningSession.findById(id).lean()
    }

    *
    create(planning) {
        return yield PlanningSession.create(planning)
    }

    *
    update(id, data) {
        return yield PlanningSession.update(id, data)
    }

    *
    findOneAndUpdate(id, data) {
        return yield PlanningSession.update(id, {$push:{childPlannings: data}})
    }

}

module.exports = new PlanningSessionRepository();