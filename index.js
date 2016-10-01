'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const TMP = 'lilybin-source-files';

exports.handler = function(event, context, callback) {
    let id = `${Date.now()}-${Math.random().toString(36).substr(2)}`;

    s3.putObject({
        Bucket: TMP,
        Key: `${id}.ly`,
        Body: event.code,
        ContentType: 'text/plain',
        StorageClass: 'REDUCED_REDUNDANCY'
    }, function (err) {
        if (err) {
            console.error(id, 'Errored');
            console.error(id, err);
            console.error(id, err.message);
            console.error(id, err.stack);
            err.message = `Failed to upload score: ${err.message}`;
            return callback(err);
        }
        console.log(id, 'Done');
        callback(null, {id});
    });
};
