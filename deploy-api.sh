#!/bin/bash

docker rm -f getokr_api

docker rmi -f getokr/getokr_api

docker build -t getokr/getokr_api .

docker run --restart=always -d -p 3000:3000 \
        -e MONGO_HOST=DATABASEURL \
        -e SENDGRID_API_KEY=SENDGRIDKEY \
        -e CONTACT_EMAIL=CONTECTEMAIL \
        -e ACCESS_KEY_ID=AWSKEYID \
        -e SECRET_ACCESS_KEY=AWSKEYSECRET \
        --name getokr_api getokr/getokr_api
# Change the variable values according to your environment