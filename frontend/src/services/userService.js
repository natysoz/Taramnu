const axios = require('axios')

var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))

export default {
    query,
    getUserById,
    loadUserSession,
    del
}

function loadUserSession() {
    return loggedInUser;
}

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/user' : '//localhost:3000/api/user';

async function query() {
    const res = await axios.get(`${BASE_URL}`)
    return res.data;
}

async function del(id) {
    const res = await axios.delete(`${BASE_URL}/${id}`)
    return res.data;
}

async function getUserById(id) {
    const res = await axios.get(`${BASE_URL}/${id}`)
    return res.data;
}


