'use strict';

const
    _ = require('lodash'),
    Tag = require('../../src/models/tagModel').Tag

module.exports = (companies) => (

    [
        new Tag({
            name: 'Marketing',
            company: _.find(companies, company => company.fantasyName === 'FCamara'),
        }),

        new Tag({
            name: 'DP',
            company: _.find(companies, company => company.fantasyName === 'FCamara'),
        })
    ]

)