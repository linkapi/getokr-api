'use strict'

const
    Notification = require('../models/notificationModel').Notification

class NotificationRepository {

    *
    find(name) {
        return yield Notification.find(name)
    }

    *
    create(notification) {
        return yield Notification.create(notification)
    }

    *
    update(id, data) {
        return yield Notification.update(id, data)
    }

}

module.exports = new NotificationRepository();