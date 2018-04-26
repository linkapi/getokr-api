'use strict';

const
    _ = require('lodash'),
    CheckIn = require('../../src/models/checkInModel').CheckIn

module.exports = (users) => (

    [
        new CheckIn({
            createdBy: _.find(users, user => user.firstName === 'Daniel'),
            value: '2',
            insertDate: new Date()
        }),

        new CheckIn({
            createdBy: _.find(users, user => user.firstName === 'Daniel'),
            value: 'false',
            insertDate: new Date()
        }),

        new CheckIn({
            createdBy: _.find(users, user => user.firstName === 'Daniel'),
            value: '20',
            insertDate: new Date()
        }),

        new CheckIn({
            createdBy: _.find(users, user => user.firstName === 'Daniel'),
            value: 'true',
            insertDate: new Date()
        }),
    ]

)