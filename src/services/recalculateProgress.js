'use strict'

const
    mongoose = require('mongoose'),
    KeyResult = require('../models/keyResultModel'),
    KeyResultRepository = require('../repositories/keyResultRepository'),
    ObjectiveRepository = require('../repositories/objectiveRepository'),
    _ = require('lodash'),
    ObjectId = mongoose.Types.ObjectId

class RecalculateProgress {

    *
        newKeyOrNewCheckIn(key) {
        yield this.calculateKeyResultProgress(key)

        let objective = yield ObjectiveRepository.findOne({
            '_id': key.objective
        })

        yield this.calculateObjectiveProgress(objective);

        if (objective.mainObjective) {
            let mainObjective = yield ObjectiveRepository.findOne({
                '_id': objective.mainObjective._id
            })

            yield this.calculateObjectiveProgress(mainObjective);
        }
    }

    *
        archivateKey(key) {
        let objective = yield ObjectiveRepository.findOne({
            '_id': key.objective
        })

        yield this.calculateObjectiveProgress(objective)

        if (objective.mainObjective._id) {
            let mainObjective = yield ObjectiveRepository.findOne({
                '_id': objective.mainObjective._id
            })

            yield this.calculateObjectiveProgress(mainObjective)
        }
    }

    *
        archivateObjective(objective) {
        if (objective.mainObjective) {
            let mainObjective = yield ObjectiveRepository.findOne({
                '_id': objective.mainObjective._id
            })

            yield this.calculateObjectiveProgress(mainObjective)
        }
    }

    *
        newObjective(objective) {
        yield this.calculateObjectiveProgress(objective)

        if (objective.mainObjective != null && objective.mainObjective != undefined) {
            let mainObjective = yield ObjectiveRepository.findOne({
                '_id': objective.mainObjective
            })

            yield this.calculateObjectiveProgress(mainObjective)
        }
    }

    *
        archivateChildPlanning(company) {
        let objectives = yield ObjectiveRepository.findCompany({
            'company': company,
            'hierarchy': 'main'
        })

        for (let objective of objectives) {
            if (objective.hierarchy == 'main') {
                let childs = 0,
                    progress = 0

                for (let childObjective of objective.childObjectives) {
                    if (!childObjective._id.deactivate) {
                        childs++
                        progress += childObjective._id.progress
                    }
                }

                if (childs == 0) {
                    objective.progress = 0
                    yield objective.save(err => {
                        console.log(err)
                    });
                    continue
                }

                objective.progress = (progress / childs).toFixed(0)
                yield objective.save(err => {
                    console.log(err)
                });
                continue
            }
        }
    }

    *
        calculateKeyResultProgress(keyResult) {
        let total = 0

        if (keyResult.type == 'number') {
            if (keyResult.inicialValue == undefined) {
                keyResult.progress = 0
                yield keyResult.save();
                return
            }

            if (keyResult.criteria == 'atLeast') {
                total = (((keyResult.currentValue - keyResult.inicialValue) / (keyResult.targetValue - keyResult.inicialValue)) * 100).toFixed(0) || 0
                if (total < 0) {
                    keyResult.progress = 0
                    yield keyResult.save();
                    return
                }
                if (total > 100) {
                    keyResult.progress = 100
                    yield keyResult.save();
                    return
                }
                keyResult.progress = total
                yield keyResult.save();
                return
            }

            total = (((keyResult.inicialValue - keyResult.currentValue) / (keyResult.inicialValue - keyResult.targetValue)) * 100).toFixed(0) || 0
            if (total > 100) {
                keyResult.progress = 100
                yield keyResult.save();
                return
            }
            if (total < 0) {
                keyResult.progress = 0
                yield keyResult.save();
                return
            }
            keyResult.progress = total
            yield keyResult.save();
            return
        }
        keyResult.progress = keyResult.finished ? 100 : 0
        yield keyResult.save();
        return
    }

    *
        calculateObjectiveProgress(objective) {
        if (objective.hierarchy != 'main' && objective.childObjectives.length == 0) {
            let that = this,
                objectiveProgress = 0,
                keyProgress = 0,
                result,
                keys = 0

            if (!objective || !objective._id) {
                objective.progress = 0
                yield objective.save();
                return
            }

            if (!objective.keyResults.length) {
                objective.progress = 0
                yield objective.save();
                return
            }

            for (let keyResult of objective.keyResults) {
                if (keyResult._id.isActive) {
                    keys++
                    if (keyResult._id.progress)
                        keyProgress = keyResult._id.progress
                    else
                        keyProgress = 0

                    objectiveProgress = keyProgress + objectiveProgress;
                }
            }

            if (!keys) {
                objective.progress = 0
                yield objective.save();
                return
            }

            result = (objectiveProgress / keys).toFixed(0)

            objective.progress = result

            let results = yield ObjectiveRepository.update({
                _id: objective._id
            }, {
                    $set: {
                        progress: objective.progress
                    }
                });

            return
        }

        if (objective.hierarchy != 'main' && objective.childObjectives.length) {
            let childs = 0,
                keys = 0,
                progress = 0

            for (let childObjective of objective.childObjectives) {
                if (!childObjective._id.deactivate) {
                    childs++
                    progress += childObjective._id.progress
                }
            }

            for (let keyResult of objective.keyResults) {
                if (keyResult._id.isActive) {
                    keys++
                    progress += keyResult._id.progress
                }
            }

            if (childs + keys == 0) {
                objective.progress = 0
                yield objective.save();
                return
            }

            objective.progress = (progress / (childs + keys)).toFixed(0)
            yield objective.save();
            return
        }

        if (objective.hierarchy == 'main') {
            let childs = 0,
                progress = 0

            for (let childObjective of objective.childObjectives) {
                if (!childObjective._id.deactivate) {
                    childs++
                    progress += childObjective._id.progress
                }
            }

            if (childs == 0) {
                objective.progress = 0
                yield objective.save();
                return
            }

            objective.progress = (progress / childs).toFixed(0)
            yield objective.save();
            return
        }
    }

}

module.exports = new RecalculateProgress()