const express = require('express')
const {getRaffles,delRaffle,addRaffle,getRaffleById,editRaffle} = require('./raffle.controller')
const router = express.Router()


router.get('/', getRaffles)
router.get('/:id', getRaffleById)
router.post('/', addRaffle)
router.put('/:id', editRaffle)
router.delete('/:id',delRaffle)


module.exports = router