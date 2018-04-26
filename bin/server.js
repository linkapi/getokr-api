'use strict';

const http = require('http');
const koa = require('koa');
const bodyParser = require('koa-body');
const cors = require('koa-cors');
const corsError = require('koa-cors-error');
const morgan = require('koa-morgan');
const gzip = require('koa-gzip');
const mount = require('koa-mount');
const api = require('./../src/config/api');
const oauthServer = require('./../src/oauth/oauthServer');
const koaStatic = require('koa-static');
const mongoose = require('./../src/config/mongoose');
const mongodb = require('./../src/config/mongodb')();
const server = module.exports = koa();

server.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    headers: ['Content-Type', 'Authorization', 'x-xsrf-token', 'Access-Control-Allow-Origin', 'ignoreToken'],
    credentials: true
}));
server.use(bodyParser({
    formidable: { uploadDir: './uploads' },
    multipart: true,
    urlencoded: true
}));

server.use(morgan.middleware('dev'))
server.use(corsError);
server.use(gzip());
server.use(koaStatic(__dirname + '/src/staticFiles'));
require('./../src/routers/public/index')(server);
server.use(mount('/api', oauthServer.authorise()));
require('./../src/middlewares/index')(server);
require('./../src/routers/private/index')(server);

const db = mongoose.connect(mongodb.connection, mongodb.options, err => {
    if (err) throw err;
})

db.connection.on('connected', () => {
    http.createServer(server.callback()).listen(api.port, () => {
        console.log('Server listening at http://localhost:' + api.port);
    });
});