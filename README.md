# GetOkr-API

GetOkr-API is the Back-end part of GetOkr, an OKR software used by LinkApi, FCamara, HashTrack, etc...

* Language - JavaScript (NodeJS)
* Web Framework - Koa1
* Database - Mongodb
* Database ODM - Mongoose
* Authentication - OAuth 2.0

## Requirements
* node __6.11.5__
* npm __3.10.10__

## Installation
```bash
npm install
npm run seed
npm run dev
```

## Structure
```
├── bin
│   └── server.js            # Bootstrapping and entry point
├── database                 # Database config and seed
├── src                      # Source code
│   ├── config               # Server configuration settings
│   ├── middlewares          # Custom middlewares
│   ├── models               # Mongoose models
│   ├── oauth                # Oauth 2.0 configuration
│   ├── repositories         # Data persistence abstraction layer
│   ├── routers              # Router definitions
│   └── services             # Layer for shared functions
└── uploads                  # Folder to upload file plugin
```

## Usage
* `npm start`    Start server on dev mode with node
* `npm run dev`  Start server on dev mode with nodemon
* `npm run prod` Start server on live mode with supervisor
* `npm run seed` Create database and collections

## License
MIT