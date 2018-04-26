'use strict';

let counters = {};
let lastModelName;

function createDocument(document) {
    return new Promise(resolve => {
        document.save(err => {
            if (err) {
                console.error(err);
                throw err;
            }

            let modelName = document.constructor.modelName;

            if (!counters[modelName])
                counters[modelName] = 0;

            if (modelName !== lastModelName)
                process.stdout.write('\n');

            counters[modelName]++;
            lastModelName = modelName;

            process.stdout.write(`   - ${modelName} created successfully`);
            process.stdout.cursorTo(0);
            process.stdout.write(`${counters[modelName]} \r`);

            resolve(document);
        });
    });
}

module.exports = documents => {
    let promises = [];

    documents.forEach(document => {
        promises.push(createDocument(document));
    });

    return promises;
};