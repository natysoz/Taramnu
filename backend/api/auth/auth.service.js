const bcrypt = require('bcryptjs')
const userService = require('../user/user.service')

const saltRounds = 10

async function login(email, password) {
    if (!email || !password) return Promise.reject('email and password are required!')
    const user = await userService.getByEmail(email)
    if (!user) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')
    delete user.password;
    return user;
}

async function signup(newUser) {

    // if (!newUser.email || !newUser.password || !newUser.name) return Promise.reject('email, username and password are required!')
    if (!newUser.name) return Promise.reject('username is required!')

    // const users = await userService.query();
    // const idx = users.findIndex(user => user.email === newUser.email);
    
    // if (idx !== -1) {
    //     return Promise.reject('email is already registred!')
    // }

    // const hash = await bcrypt.hash(newUser.password, saltRounds)
    // newUser.password = hash;

    const user = await userService.add(newUser)
    // delete user.password;
    return user;
}

module.exports = {
    signup,
    login,
}
