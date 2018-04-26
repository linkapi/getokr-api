'use strict';

const
    TagRepository = require('../repositories/tagRepository'),
    ObjectiveRepository = require('../repositories/objectiveRepository'),
    _ = require('lodash')



class TagService {

    *
    findCompanyTags(company) {
        return yield TagRepository.find({
            company: company
        })
    }

    *
    create(tag) {
        return yield TagRepository.create(tag)
    }

    *
    delete(id) {
        let objectives,
            tag,
            index

        tag = yield TagRepository.findOne(id)

        objectives = yield ObjectiveRepository.findNoPopulate({
            tags: [tag.name]
        })

        if (objectives.length){
            yield _.forEach(objectives, objective => {
                index = objective.tags.indexOf(tag.name)
                objective.tags.splice(index, 1)
                objective.save()
            })
        }

        return yield TagRepository.delete(id)
    }
}

module.exports = new TagService();