const raffleService = require('./raffle.service')

async function getRaffleById(req, res) {
    try {
        const raffle = await raffleService.getById(req.params.id)
        res.send(raffle)
    } catch (err) {
        console.log('error in getRaffleById in controller: ', err);
    }
}

async function getRaffles(req, res) {
    try {
        const raffles = await raffleService.query()
        res.send(raffles)
    } catch (err) {
        console.log('error in getRaffles in controller: ', err);
    }
}

async function delRaffle(req, res) {
    try {
        await raffleService.remove(req.params.id)
        res.send(`deleted: ${req.params.id}`)
    } catch (err) {
        console.log('error in delRaffle in controller: ', err);
    }
}

async function addRaffle(req, res) {
    try {
        await raffleService.add(req.body)
        res.send(req.body)
    } catch (err) {
        console.log('error in addRaffle in controller: ', err);
    }
}

async function editRaffle(req, res) {
    try {
        await raffleService.edit(req.body)
        res.send(req.body)
    } catch (err) {
        console.log('error in editRaffle in controller: ', err);
    }
}



module.exports = {
    getRaffles,
    delRaffle,
    addRaffle,
    getRaffleById,
    editRaffle,
}