'use strict';

const
    NotificationRepository = require('../repositories/notificationRepository')



class NotificationService {

    *
    find(id) {
        return yield NotificationRepository.find({
            _id: id
        })
    }

    *
    create(notification) {
        return yield NotificationRepository.create(notification)
    }

    *
    update(id, data) {
        return yield NotificationRepository.update({
            _id: id
        }, data);
    }

    *
    deactivate(id) {
        return yield NotificationRepository.update({
            _id: id
        }, {
            $set: {
                active: false
            }
        });
    }

}

module.exports = new NotificationService();