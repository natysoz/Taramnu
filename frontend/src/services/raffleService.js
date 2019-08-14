const axios = require('axios')

export default {
    query,
    getRaffleById,
    add,
    del,
    join,
    filter
}

const BASE_URL = ( process.env.NODE_ENV !== 'development' )?
 '/api/raffles':'//localhost:3000/api/raffles' ;

const BASE_URL1 = ( process.env.NODE_ENV !== 'development' )?
 '':'//localhost:3000' ;

async function query() {
    const res = await axios.get(`${BASE_URL}`)
    return res.data;
}

async function del(id) {
    const res = await axios.delete(`${BASE_URL}/${id}`)
    return res.data;
}

async function getRaffleById(id){
    const res = await axios.get(`${BASE_URL}/${id}`)
    return res.data;
}

async function add(newRaffle) {
    if (!newRaffle._id){
        newRaffle.created = Date.now();
        newRaffle.winner = null;
        newRaffle.views = 0;
        newRaffle.members =[];
        newRaffle.busLogo = `https://res.cloudinary.com/dvvx6eoye/image/upload/v1563936703/logos/Groo_psulrx.png`;
        newRaffle.asocLogo = 'https://res.cloudinary.com/dvvx6eoye/image/upload/v1563937035/logos/tno_nuigg7.jpg';
        newRaffle.busLogo_big = 'https://res.cloudinary.com/dvvx6eoye/image/upload/v1563985479/logos/roo_big_ww3tdz.png';
        newRaffle.asocLogo_big = 'https://res.cloudinary.com/dvvx6eoye/image/upload/v1563985997/logos/tno_big_afaysr.png';
        newRaffle.maxMembers= Number(newRaffle.maxMembers);

        if(!newRaffle.imgPrev) {
            newRaffle.imgPrev = 'https://res.cloudinary.com/dvvx6eoye/image/upload/v1564239709/Preview_m90wgd.png';
        }

        const res = await axios.post(`${BASE_URL}`, newRaffle);
        return res.data;

    }else{
        const res = await axios.put(`${BASE_URL}/${newRaffle._id}`, newRaffle)
        return res.data;
    }
}

async function join(user, raffleId){
    const res = await axios.put(`${BASE_URL1}/join`, {user, raffleId})
    return res;
}

async function filter(filter){
    const res = await axios.post(`${BASE_URL1}/filter`, filter)
    return res.data
}
