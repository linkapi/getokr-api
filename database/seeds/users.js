'use strict';

const
  _ = require('lodash'),
  bcrypt = require('bcryptjs'),
  User = require('../../src/models/userModel').User

module.exports = (companies, oauthClients) => (
  [
    new User({
      username: 'thiago.lima@linkapi.com.br',
      password: bcrypt.hashSync('123', bcrypt.genSaltSync(8), null),
      firstName: 'Thiago',
      lastName: 'Lima',
      isAdministrator: true,
      insertDate: new Date(),
      updateDate: new Date(),
      isActive: true,
      companies: companies,
      company: _.find(companies, company => company.fantasyName === 'FCamara')._id,
      oauthClients: [_.find(oauthClients, oauthClient => oauthClient.clientId === 'site')]
    }),
    new User({
      username: 'icaro.sousa@linkapi.com.br',
      password: bcrypt.hashSync('123', bcrypt.genSaltSync(8), null),
      firstName: 'Icaro',
      lastName: 'Sousa',
      isAdministrator: true,
      insertDate: new Date(),
      updateDate: new Date(),
      isActive: true,
      companies: companies,
      company: _.find(companies, company => company.fantasyName === 'FCamara')._id,
      oauthClients: [_.find(oauthClients, oauthClient => oauthClient.clientId === 'site')]
    }),
    new User({
      username: 'daniel.loscheck@linkapi.com.br',
      password: bcrypt.hashSync('123', bcrypt.genSaltSync(8), null),
      firstName: 'Daniel',
      lastName: 'Loscheck',
      insertDate: new Date(),
      updateDate: new Date(),
      isActive: true,
      companies: [_.find(companies, company => company.fantasyName === 'LinkApi')._id],
      company: [_.find(companies, company => company.fantasyName === 'LinkApi')._id],
      oauthClients: [_.find(oauthClients, oauthClient => oauthClient.clientId === 'site')]
    }),
    new User({
      username: 'douglas.ramaldes@fcamara.com.br',
      password: bcrypt.hashSync('1234', bcrypt.genSaltSync(8), null),
      firstName: 'Douglas',
      lastName: 'Ramaldes',
      insertDate: new Date(),
      updateDate: new Date(),
      isActive: true,
      companies: [_.find(companies, company => company.fantasyName === 'FCamara')._id],
      company: _.find(companies, company => company.fantasyName === 'FCamara')._id,
      oauthClients: [_.find(oauthClients, oauthClient => oauthClient.clientId === 'site')]
    }),
    new User({
      username: 'michael.martins@fcamara.com.br',
      password: bcrypt.hashSync('1234', bcrypt.genSaltSync(8), null),
      firstName: 'Michael',
      lastName: 'Keese',
      insertDate: new Date(),
      updateDate: new Date(),
      isActive: true,
      companies: [_.find(companies, company => company.fantasyName === 'FCamara')._id],
      company: _.find(companies, company => company.fantasyName === 'FCamara')._id,
      oauthClients: [_.find(oauthClients, oauthClient => oauthClient.clientId === 'site')]
    }),
    new User({
      username: 'thiago.ferreira@fcamara.com.br',
      password: bcrypt.hashSync('1234', bcrypt.genSaltSync(8), null),
      firstName: 'Thiago',
      lastName: 'Ferreira',
      insertDate: new Date(),
      updateDate: new Date(),
      isActive: true,
      companies: [_.find(companies, company => company.fantasyName === 'FCamara')._id],
      company: _.find(companies, company => company.fantasyName === 'FCamara')._id,
      oauthClients: [_.find(oauthClients, oauthClient => oauthClient.clientId === 'site')]
    })
  ]
)