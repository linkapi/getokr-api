'use strict';

const
    _ = require('lodash'),
    Company = require('../../src/models/companyModel').Company

module.exports = () => (

    [
        new Company({
            fantasyName: 'FCamara',
            plan: {
                name: 'Business'
            },
            phone: '(11) 3158-1049',
            isActive: true
        }),
        new Company({
            fantasyName: 'LinkApi',
            plan: {
                name: 'Business'
            },
            phone: '(11) 3158-1042',
            isActive: true
        })
    ]

)