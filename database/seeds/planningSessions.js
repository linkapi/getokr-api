'use strict';

const
    _ = require('lodash'),
    PlanningSession = require('../../src/models/planningSessionModel').PlanningSession

module.exports = (companies, users) => (

    [
        new PlanningSession({
            name: 'Segundo Trimestre',
            startDate: new Date(),
            endDate: new Date(),
            description: 'Objetivos para Segundo Trimestre',
            type: 'personal',
            company: _.find(companies, company => company.fantasyName === 'FCamara'),
            createdBy: _.find(users, user => user.name === 'Daniel'),
            insertDate: new Date(),
            updateDate: new Date()
        })
    ]

)