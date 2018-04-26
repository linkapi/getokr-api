'use strict';
const co = require('co');
const OAuthClient = require('../models/oAuthClientModel').OAuthClient;

class ConstantService {

    constructor() {
        const that = this;

        co(function* () {
            that.oAuthClientSite = yield OAuthClient.findOne({
                clientId: 'site'
            }).lean();

        });
    }

}
module.exports = new ConstantService();