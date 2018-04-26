'use strict';

const
    _ = require('lodash'),
    Objective = require('../../src/models/objectiveModel').Objective

module.exports = (planningSessions, users, companies, keyResults) => (

    [
        new Objective({
            name: 'Aumentar Vendas',
            owner: _.find(users, user => user.firstName === 'Daniel'),
            description: 'Metas para aumentar vendas',
            company: _.find(companies, company => company.fantasyName === 'FCamara'),
            createdBy: _.find(users, user => user.firstName === 'Daniel'),
            insertDate: new Date(),
            updateDate: new Date(),
            planning: _.find(planningSessions, planning => planning.name === 'Segundo Trimestre'),
            keyResults: [
                _.find(keyResults, keyResult => keyResult.name === 'Meta 1'),
                _.find(keyResults, keyResult => keyResult.name === 'Meta 2')
            ]
        }),

        new Objective({
            name: 'Programa Formação',
            owner: _.find(users, user => user.firstName === 'Daniel'),
            description: 'Metas para padronizar programa de formação',
            company: _.find(companies, company => company.fantasyName === 'FCamara'),
            createdBy: _.find(users, user => user.firstName === 'Daniel'),
            insertDate: new Date(),
            updateDate: new Date(),
            planning: _.find(planningSessions, planning => planning.name === 'Segundo Trimestre'),
            keyResults: [
                _.find(keyResults, keyResult => keyResult.name === 'Meta 01'),
                _.find(keyResults, keyResult => keyResult.name === 'Meta 02')
            ]
        })
    ]

)