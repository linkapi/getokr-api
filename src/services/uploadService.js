'use strict'

const
    mongoose = require('mongoose'),
    fs = require('fs'),
    aws = require('aws-sdk'),
    UploadRepository = require('../repositories/uploadRepository'),
    bucket = 'getokr-storage'

aws.config = require('../config/constants').AWS_CONFIG;

class UploadService {

    *
        create(file_folder, body) {
        let
            date = new Date(),
            file_base_name = `${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`,
            name = file_base_name + body.filename
        let promises = [
            this.sendFileToS3(file_base_name, file_folder, name)
        ]
        let promises_return = yield Promise.all(promises)
        fs.unlink(file_folder)

        let new_upload = {
            archive_name: body.filename,
            created_by: body.user,
            link: 'https://s3.amazonaws.com/getokr-storage/' + promises_return[0]
        }
        return yield UploadRepository.create(new_upload)
    }

    *
        deleteFileFromS3(comment) {
        let s3 = new aws.S3(),
            key = comment.link.split("/")

        s3.deleteObjects({
            Bucket: bucket,
            Delete: {
                Objects: [{
                    Key: key[4]
                }]
            }
        }, (err, data) => {
            if (err)
                return console.log(err)
        })
        return yield UploadRepository.delete({
            _id: comment.upload
        })
    }


    sendFileToS3(body, file_folder, name, size) {
        return new Promise((resolve, reject) => {
            fs.readFile(file_folder, (err, res) => {

                let params = {
                    Bucket: bucket,
                    Key: name,
                    Body: res,
                    ACL: 'public-read'
                }

                let s3 = new aws.S3()
                s3.putObject(params, (err, pres) => {
                    if (err) {
                        console.log(err)
                        reject('Error in upload')

                    }

                    resolve(params.Key)
                })
            })
        })
    }
}


module.exports = new UploadService()