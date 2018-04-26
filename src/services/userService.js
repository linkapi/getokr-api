'use strict';

const
    bcrypt = require('bcryptjs'),
    UserRepository = require('../repositories/userRepository'),
    moment = require('moment'),
    crypto = require('crypto')


class UserService {


    generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }

    cryptoToken() {
        return new Promise(function (res, rej) {
            crypto.randomBytes(20, function (err, buf) {
                if (err)
                    return rej(err)
                res(buf.toString('hex'))
            });
        })
    }

    validPassword(hash, password) {
        return bcrypt.compareSync(password, hash);
    }

    treateUserFirstName(displayName) {
        const name = displayName.split(" ");

        return name[0];
    }

    treateUserLastName(displayName, firstName) {
        const name = displayName.split(" ");

        if (name.length > 1)
            return displayName.replace(firstName + " ", "");
    }

    *
        findByCompany(company) {
        return yield UserRepository.find({
            company: company,
            isActive: true
        })
    }

    *
        findIdByCompany(company) {
        return yield UserRepository.findIds({
            company: company,
            isActive: true
        }, '_id')
    }

    *
        findOne(user) {
        return yield UserRepository.findOne({
            '_id': user
        })
    }

    *
        update(data) {
        return yield UserRepository.update({
            _id: data._id
        }, data);
    }

    *
        activateUser(data) {
        return yield UserRepository.update({
            hash: data.hash
        }, {
                $set: {
                    hash: null,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: this.generateHash(data.password)
                }
            });
    }

    *
        generateToken(data) {
        let user = yield UserRepository.findOne({
            'username': data
        })

        if (!user)
            return

        user.password_token = {};
        user.password_token.expires = moment().add(3, 'hour').format()

        let teste = moment().add(3, 'hour').format()

        user.password_token.token = yield this.cryptoToken()

        yield UserRepository.update({
            _id: user._id
        }, user);

        return user
    }

    *
        updatePassword(id, data) {

        let user = yield UserRepository.findOne({
            '_id': id
        })

        let verify = bcrypt.compareSync(data.currentPassword, user.password)

        if (verify) {
            user.password = bcrypt.hashSync(data.newPassword, bcrypt.genSaltSync(8), null);

            return yield user.save()
        }

        return verify

    }

    *
        changePassword(data) {
        let user = yield UserRepository.findOne({
            'password_token.token': data.token
        })

        user.password_token.token = null
        user.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(8), null);

        yield UserRepository.update({
            _id: user._id
        }, user);

        return user

    }

    *
        create(user) {
        return yield UserRepository.create(user);
    }

    *
        deactivate(id) {
        return yield UserRepository.update({
            _id: id
        }, {
                $set: {
                    isActive: false
                }
            });
    }

}

module.exports = new UserService();