'use strict';

const
    _ = require('lodash'),
    Objective = require('../models/objectiveModel').Objective

class ObjectiveRepository {

    *
    findOne(objective) {
        return yield Objective.findOne(objective).populate('owner').populate('keyResults._id')
            .populate({
                path: 'keyResults._id',
                populate: {
                    path: 'owner',
                }
            })
            .populate('contributors')
            .populate('mainObjective')
            .populate('team')
            .populate({
                path: 'keyResults._id',
                populate: {
                    path: 'checkIns._id'
                }
            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'keyResults._id',
                }
            })
            .populate({
                path: 'keyResults._id',
                populate: {
                    path: 'checkIns._id',
                    populate: {
                        path: 'createdBy'
                    }
                }
            })
    }

    *
    find(objective) {
        return yield Objective.find(objective).populate('owner').populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'keyResults._id',
                }
            })
            .populate({
                path: 'contributors'
            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'owner',
                }
            })
            .populate({
                path: 'keyResults._id',
                populate: {
                    path: 'owner',
                    select: {
                        'firstName': 1,
                        'lastName': 1
                    }
                }
            })
            .populate({
                path: 'keyResults._id',
                populate: {
                    path: 'checkIns._id'
                }
            })
            .populate({
                path: 'mainObjective'
            })

    }

    *
    findCompany(objective) {
        return yield Objective.find(objective)
            .populate('owner')
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'contributors',
                }
            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'owner',
                }
            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'keyResults._id',
                }
            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'keyResults._id',
                    populate: {
                        path: 'owner',
                    }
                }
            })
            .populate({
                path: 'keyResults._id',
                populate: {
                    path: 'owner',
                    select: {
                        'firstName': 1,
                        'lastName': 1
                    }
                }
            })
    }

    *
    findByPlanning(planning) {
        return yield Objective.find(planning)
            .populate('owner')
            .populate('team')
            .populate('contributors')
            .populate('mainObjective')
            .populate('keyResults')
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'contributors',
                }
            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'team',
                }
            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'owner',
                }
            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'planning',
                }
            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'keyResults._id',
                }
            })
            .populate({
                path: 'keyResults._id',
                populate: {
                    path: 'checkIns._id',
                }

            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'keyResults._id',
                    populate: {
                        path: 'owner',
                    }
                }
            })
            .populate({
                path: 'keyResults._id',
                populate: {
                    path: 'owner',
                    select: {
                        'firstName': 1,
                        'lastName': 1
                    }
                }
            })
    }

    *
    findByUser(user) {
        return yield Objective.find(user)
            .populate('owner')
            .populate('contributors')
            .populate('mainObjective')
            .populate('keyResults')
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'contributors',
                }
            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'owner',
                }
            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'keyResults._id',
                }
            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'keyResults._id',
                    populate: {
                        path: 'owner',
                    }
                }
            })
            .populate({
                path: 'keyResults._id',
                populate: {
                    path: 'owner',
                    select: {
                        'firstName': 1,
                        'lastName': 1
                    }
                }
            })
    }

    *
    findByMainObjective(objective) {
        return yield Objective.find(objective)
            .populate('owner')
            .populate('team')
            .populate('contributors')
            .populate('mainObjective')
            .populate('keyResults')
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'contributors',
                }
            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'childObjectives._id',
                    populate: {
                        path: 'keyResults._id',
                        populate: {
                            path: 'owner',
                            model: 'User'
                        }
                    }
                }
            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'childObjectives._id',
                    populate: {
                        path: 'owner',
                        select: {
                            'firstName': 1,
                            'lastName': 1
                        }
                    }
                }
            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'owner',
                }
            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'keyResults._id',
                }
            })
            .populate({
                path: 'childObjectives._id',
                populate: {
                    path: 'keyResults._id',
                    populate: {
                        path: 'owner',
                        model: 'User'
                    }
                }
            })
            .populate({
                path: 'keyResults._id',
                populate: {
                    path: 'owner',
                    select: {
                        'firstName': 1,
                        'lastName': 1
                    }
                }
            })
    }

    *
    findNoPopulate(objective) {
        return yield Objective.find(objective)
    }

    *
    create(objective) {
        return yield Objective.create(objective)
    }

    *
    update(id, data, options) {
        return yield Objective.update(id, data, options)
    }

}

module.exports = new ObjectiveRepository();