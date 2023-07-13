const mongo = require('mongodb').MongoClient;

mongo.connect(
    'mongodb://localhost:27017',
    (err, client) => {
        if (err) {
            console.log('Connection error: ', err);
            throw err;
        }

        console.log('Connected');

        client.close();
    }
);