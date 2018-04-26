const mount = require('koa-mount');

module.exports = (server) => {

    const signUpRouter = require('./signUpRouter');
    server.use(mount('/api', signUpRouter.routes()));

    const oauthRouter = require('./oauthRouter');
    server.use(oauthRouter.routes());

};