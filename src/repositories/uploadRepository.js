'use strict';

const
    Upload = require('../models/uploadModel').Upload
    
class UploadRepository {

    *
    create(checkIn) {
        return yield Upload.create(checkIn)
    }

    *
    delete(query) {
        return yield Upload.remove(query)
    }

}

module.exports = new UploadRepository();