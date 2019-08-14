
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://admin:admin@cluster0-af8ed.mongodb.net/test?retryWrites=true&w=majority'

// Database Name
const dbName = 'taramti';

var dbConn = null;

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(url, {useNewUrlParser: true});
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch(err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}


async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName);
}

module.exports = {
    connect,
    getCollection
}