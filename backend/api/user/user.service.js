
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add,
    join,
    updateWinner
}

async function query(filterBy = {}) {

    const criteria = {};

    const collection = await dbService.getCollection('user')
    try {
        return await collection.find(criteria).toArray()
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

async function getById(userId) {
    const collection = await dbService.getCollection('user')
    try {
        return await collection.findOne({"_id":ObjectId(userId)})
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}
async function getByEmail(email) {
    const collection = await dbService.getCollection('user')
    try {
        return await collection.findOne({email})
    } catch (err) {
        console.log(`ERROR: while finding user ${email}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.remove({"_id":ObjectId(userId)})
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.replaceOne({"_id":ObjectId(user._id)}, {$set : user})
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function add(user) {
    user.raffles=[];
    const collection = await dbService.getCollection('user')
    try {
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

async function join(userId, raffleId){
    let user = await getById(userId);
    user.raffles.push({raffleId: raffleId, status: 'loss'});
    try {
        await update(user);
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user in 'join' user.service ${userId}`)
        throw err;
    }
}

async function updateWinner(userId, raffleId){
    const user = await getById(userId);

    const idx = user.raffles.findIndex((raffle) => {
        return raffle.raffleId == raffleId
    });

    user.raffles[idx] = {raffleId: raffleId, status: 'won'}

    try {
        await update(user);
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user in 'updateWinner' user.service${user._id}`)
        throw err;
    }
}

