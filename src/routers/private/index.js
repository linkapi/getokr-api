const mount = require('koa-mount');

module.exports = (server) => {

    const userRouter = require('./userRouter')
    server.use(mount('/api/user', userRouter.routes())) // OK

    const planningRouter = require('./planningSessionRouter')
    server.use(mount('/api/planning', planningRouter.routes())) // OK

    const objectiveRouter = require('./objectiveRouter')
    server.use(mount('/api/objective', objectiveRouter.routes())) // OK

    const companyRouter = require('./companyRouter')
    server.use(mount('/api/company', companyRouter.routes())) // OK

    const keyResultRouter = require('./keyResultRouter')
    server.use(mount('/api/keyresult', keyResultRouter.routes())) // OK

    const checkInRouter = require('./checkInRouter')
    server.use(mount('/api/checkin', checkInRouter.routes())) // OK

    const tagRouter = require('./tagRouter')
    server.use(mount('/api/tag', tagRouter.routes())) // OK

    const notificationRouter = require('./notificationRouter')
    server.use(mount('/api/notification', notificationRouter.routes())) // OK

    const teamRouter = require('./teamRouter')
    server.use(mount('/api/team', teamRouter.routes())) // OK

    const uploadRouter = require('./uploadRouter')
    server.use(mount('/api/upload', uploadRouter.routes())) // OK

    const commentRouter = require('./commentRouter')
    server.use(mount('/api/comment', commentRouter.routes())) // OK

    const trackRouter = require('./trackRouter')
    server.use(mount('/api/track', trackRouter.routes())) // OK

};