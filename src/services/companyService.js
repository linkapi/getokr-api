'use strict'

const
  mongoose = require('mongoose'),
  CompanyRepository = require('../repositories/companyRepository')

class CompanyService {

  *
    findCompanyUsers(company) {
    let query = {}

    query.companies = {
      "$in": [company]
    }

    return yield CompanyRepository.find(query);
  }

  *
    findOne(company) {
    return yield CompanyRepository.findOne({
      '_id': company
    });
  }

  *
    create(company) {
    return yield CompanyRepository.create(company);
  }

  *
    update(company) {
    return yield CompanyRepository.update({
      _id: company._id
    }, company);
  }

  *
    deactivate(id) {
    return yield CompanyRepository.update({
      _id: id
    }, {
        $set: {
          isActive: false
        }
      });
  }

}

module.exports = new CompanyService()