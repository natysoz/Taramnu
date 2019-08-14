const axios = require('axios')

export default {
    login,
    signup,
    logout
}

const BASE_URL = ( process.env.NODE_ENV !== 'development' )?
 '/auth':'//localhost:3000/auth' ;

async function login(user) {
    const res= await axios.post(`${BASE_URL}/login`,user)
    return res.data;
}

async function logout(user){
    await axios.post(`${BASE_URL}/logout`,user)
}

async function signup(user){
    try{
        const res = await axios.post(`${BASE_URL}/signup`, user)
        return res.data
    }catch(err){
        throw err
    }
}







