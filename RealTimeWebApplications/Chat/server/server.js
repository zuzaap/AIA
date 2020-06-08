const io = require("socket.io");
const server = io.listen(3000);
const users = {}
server.on('connection', (socket) => {

    socket.on('message', (message) => {
        server.emit('message', {user: users[socket.id], message:message});
    });
    
    socket.on('user', (user) => {
        server.emit('user', Object.values(user))
    })

    socket.on('disconnect', (user) =>{
        delete user[socket.id]
        server.emit('user', Object.values(users))
        server.broadcast.emit('message', user + 'disconnected')

    })

    socket.on('login', (message) => {
        users[socket.id] = message
        server.emit('user', message)
    })
});