const mount = require('koa-mount');

module.exports = (server) => {
    const userMiddleware = require('./userMiddleware');
    server.use(mount('/api', userMiddleware));
};