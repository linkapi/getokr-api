'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    fantasyName: {
        type: String,
        required: true
    },
    companyName: {
        type: String
    },
    cnpj: {
        type: String
    },
    phone: {
        type: String
    },
    iugu: {
        subscription_id: {
            type: String
        },
        customer_id: {
            type: String
        },
        purchase_date: {
            type: Date
        }
    },
    plan: {
        name: {
            type: String,
            enum: ['Business', 'Enterprise']
        },
        max_users: {
            type: Number
        },
        start_trial: {
            type: Date
        },
        isTrial: {
            type: Boolean
        }
    },
    customize: {
        progressBar: [
            {
                begin: Number,
                end: Number,
                color: String
            }
        ]
    },
    isActive: {
        type: Boolean
    }
});

module.exports.CompanySchema = CompanySchema;
module.exports.Company = mongoose.model('Company', CompanySchema);