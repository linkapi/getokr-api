'use strict';

const
    _ = require('lodash'),
    KeyResult = require('../../src/models/keyResultModel').KeyResult

module.exports = (checkIns) => (

    [
        new KeyResult({
            name: 'Meta 1',
            type: 'number',
            description: 'Desc meta 1',
            criteria: 'atMost',
            inicialValue: 0,
            targetValue: 10,
            currentValue: 2,
            insertDate: new Date(),
            updateDate: new Date(),
            checkIns: _.find(checkIns, checkIn => checkIn.value === '2')
        }),

        new KeyResult({
            name: 'Meta 2',
            type: 'boolean',
            description: 'Desc meta 2',
            finished: false,
            insertDate: new Date(),
            updateDate: new Date(),
            checkIns: _.find(checkIns, checkIn => checkIn.value === 'false')
        }),

        new KeyResult({
            name: 'Meta 01',
            type: 'number',
            description: 'Desc meta 1',
            criteria: 'atMost',
            inicialValue: 0,
            targetValue: 100,
            currentValue: 20,
            insertDate: new Date(),
            updateDate: new Date(),
            checkIns: _.find(checkIns, checkIn => checkIn.value === '20')
        }),

        new KeyResult({
            name: 'Meta 02',
            type: 'boolean',
            description: 'Desc meta 2',
            finished: true,
            insertDate: new Date(),
            updateDate: new Date(),
            checkIns: _.find(checkIns, checkIn => checkIn.value === 'true')
        })
    ]

)