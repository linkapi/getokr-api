const OAuthToken = require('../models/oAuthTokenModel').OAuthToken;
const OAuthClient = require('../models/oAuthClientModel').OAuthClient;
const UserService = require('../services/userService');
const UserAccess = require('../models/userAccessesModel').UserAccess;
const User = require('../models/userModel').User;
const request = require('request-promise');
const _ = require('lodash');

const model = module.exports;

model.getClient = function (clientId, clientSecret, next) {
    OAuthClient.findOne({
        clientId: clientId,
        clientSecret: clientSecret
    }).then(function (client) {
        return next(false, clientId);
    }).catch(function (err) {
        console.log('Invalid client');
    });
};

model.grantTypeAllowed = function (clientId, grantType, next) {
    if (['password'].indexOf(grantType) !== -1) {
        return next(false, true);
    }
};

model.getUser = function (username, password, next) {
    User.findOne({
        username: username,
        isActive: true
    })
        .then(function (user) {
            if (!user)
                return next();

            if (!UserService.validPassword(user.password, password))
                return next();

            return next(null, user._id);

        }).catch(function (err) {
            return next(err);
        });
};

model.saveAccessToken = function (token, clientId, expires, userId, next) {
    const accessToken = new OAuthToken({
        accessToken: token,
        clientId: clientId,
        user: userId,
        expires: expires
    });

    User.findOne({
        _id: userId
    })
        .populate('oauthClients')
        .then(function (user) {
            if (!_.some(user.oauthClients, ['clientId', clientId])) {
                throw ('InvalidClient for this user');
            }

            return UserAccess.create({
                user: userId
            });
        })
        .then(function (userLog) {
            return accessToken.save();
        })
        .then(function (accessTokenSuccess) {
            next(null, accessTokenSuccess);
        })
        .catch(function (err) {
            next(err);
        });

};

model.getAccessToken = function (bearerToken, next) {
    OAuthToken.findOne({
        accessToken: bearerToken
    }, next);
};