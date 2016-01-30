const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const TMP = 'lilybin-source-files';

exports.handler = function(event, context) {
    var t = process.hrtime();
    var id = new Date().valueOf() + '-' + Math.random().toString(36).substr(2);
    s3.putObject({
        Bucket: TMP,
        Key: id + '.ly',
        Body: event.code,
        ContentType: 'text/plain',
        StorageClass: 'REDUCED_REDUNDANCY'
    }, function (err) {
        if (err) {
            console.error(id, 'Errored')
            console.error(id, err)
            console.error(id, err.message)
            console.error(id, err.stack)
            return context.fail('Failed to upload score: ' + err.message)
        }
        context.succeed({id: id})
        console.log(id, 'Done')
    });
};
