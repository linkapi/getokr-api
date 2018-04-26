'use strict';

module.exports = function*(next) {
    let query = this.request.query;

    this.request.pagination = {
        skip: Number(query.skip) || 0,
        limit: Number(query.limit) || 10
    };

    delete query.skip;
    delete query.limit;

    this.request.query = query;

    yield next;
};