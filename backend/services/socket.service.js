const socketIO = require('socket.io');

let io;
let clients = [];

function setup(http) {

    io = socketIO(http);

    io.on('connection', function (socket) {

        socket.on('updateMe', (user) => {

            const idx = clients.findIndex(object => object.userId == user._id);
            if (idx !== -1) clients.splice(idx, 1);

            clients.push({socketId: socket.id, userId: user._id, userName: user.name})
        });

    });

}

function pushWinner(winner){

    //find the winner socket in "clients"
    const idx = clients.findIndex((client)=>{
        return client.userId == winner._id
    })

    //emit the winner
    io.to(`${clients[idx].socketId}`).emit('alertResult', {res:'won', name: winner.name});
    
    //create new clients array without the winner
    let clientsCopy = clients.slice();
    clientsCopy.splice(idx, 1);

    //emit everyone exept the winner
    clientsCopy.forEach(client=>{
        io.to(`${client.socketId}`).emit('alertResult', {res:'lost', name: client.userName})
    })
}


module.exports = {
    setup,
    pushWinner
}
