const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')


module.exports = {
    query,
    getById,
    remove,
    edit,
    add,
    join
}

async function query(filterBy = {}) {

    const criteria = {};
    if (filterBy.txt) {
        criteria.title = {$regex: filterBy.txt}
    }
    if (filterBy.price) {
        criteria.ticket = {$lt: Number(filterBy.price)}
    }
    if (filterBy.category) {
        if (filterBy.category === 'all') criteria.category = {$exists: true};
        else criteria.category = filterBy.category
    }

    const collection = await dbService.getCollection('raffles')
    try {
        const raffles = await collection.find(criteria).toArray();
        return raffles
    } catch (err) {
        console.log('ERROR: cannot find raffle')
        throw err;
    }
}

async function remove(id) {
    const collection = await dbService.getCollection('raffles')
    try {
        await collection.remove({"_id": ObjectId(id)})
    } catch (err) {
        console.log(`ERROR: cannot remove user ${id}`)
        throw err;
    }
}

async function add(raffle) {
    const collection = await dbService.getCollection('raffles')
    try {
        await collection.insertOne(raffle);
        return raffle;
    } catch (err) {
        console.log(`ERROR: cannot insert raffle`)
        throw err;
    }
}

async function getById(raffleId) {
    const collection = await dbService.getCollection('raffles')
    try {
        const raffle = await collection.findOne({"_id": ObjectId(raffleId)})
        return raffle
    } catch (err) {
        console.log(`ERROR: while finding raffle ${raffleId}`)
        throw err;
    }
}

async function edit(raffle) {
    const collection = await dbService.getCollection('raffles')
    try {
        raffle._id = ObjectId(raffle._id);
        await collection.replaceOne({"_id": raffle._id}, {$set: raffle})
        return raffle
    } catch (err) {
        console.log(`ERROR: cannot update raffle ${raffle._id}`)
        throw err;
    }
}

async function join(payload) {

    //update raffle
    const collection = await dbService.getCollection('raffles')
    try {
        await collection.updateOne(
            {"_id": ObjectId(payload.raffleId)},
            {
                $push: {
                    members: {
                        "_id": ObjectId(payload.user._id),
                        "name": payload.user.name
                    }
                }
            })
    } catch (err) {
        console.log(`ERROR: cannot join raffle ${payload.raffleId}`)
        throw err;
    }

    //update user
    try {
        await userService.join(payload.user._id, payload.raffleId)
    } catch (err) {
        console.log('update user failed', err);
        throw err
    }

    //last member check
    const raffle = await getById(payload.raffleId);

    if (raffle.members.length === raffle.maxMembers) 
        _doRaffle(raffle)
    
    return 'ok';
}

async function _doRaffle(raffle) {

    //random between 0 to array length
    const ranNum = Math.floor((Math.random() * raffle.members.length));
    const winner = raffle.members[ranNum];

    //update raffle
    const collection = await dbService.getCollection('raffles')
    try {
        await collection.updateOne(
            {"_id": raffle._id},
            {
                $set: {
                        "winner": winner._id,
                        "winnerName": winner.name
                        }
            })
    } catch (err) {
        console.log(`ERROR: cannot join raffle ${raffle._id}`)
        throw err;
    }

    //update user
    await userService.updateWinner(winner._id, raffle._id)

    //notify users
    socketService.pushWinner(winner)
}

