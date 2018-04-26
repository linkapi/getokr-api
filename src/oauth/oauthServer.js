const oauthserver = require('koa-oauth-server');

const oauthServer = oauthserver({
    model: require('./oauthModel'),
    grants: ['password'],
    debug: false,
    accessTokenLifetime: 604800, //7 days
    refreshTokenLifetime: 604800, //7 days
});

module.exports = oauthServer;