const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const fallback = require('express-history-api-fallback')
const app = express()
const http = require('http').createServer(app);

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const raffleRoutes = require('./api/raffle/raffle.routes')
const raffleService = require('./api/raffle/raffle.service')
const socketService = require('./services/socket.service')


app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))


if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: 'http://localhost:8080',
        credentials: true
    };
    app.use(cors(corsOptions));
}

// routes
app.use('/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/raffles', raffleRoutes)

app.put('/join',async (req,res)=>{
    try{
        const result = await raffleService.join(req.body)
        res.send(result)
    }catch(err){
        console.log(err)
    }
})

app.post('/filter',async (req,res)=>{
    try{
        const result= await raffleService.query(req.body);
        res.send(result)
    }catch(err){
        console.log(err)
    }
})


socketService.setup(http);

var root = __dirname + '/public'
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(root));
}
app.use(fallback('index.html', { root: root }))


const port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log (`App listening on port ${ port } !`)
});