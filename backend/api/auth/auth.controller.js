const authService = require('./auth.service')

async function login(req, res) {
    const { email, password } = req.body
    try {
        const user = await authService.login(email, password)
        req.session.user = user;
        res.send(user)
        
    } catch (err) {
        res.status(401).send({ error: err })
    }
}

async function signup(req, res) {
    const newUser = req.body    
    try {
        const user = await authService.signup(newUser)
        req.session.user = user
        res.status(200).send(user)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}

async function logout(req, res){
    try {
        req.session.destroy()
        res.send({})
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = {
    login,
    signup,
    logout
}
