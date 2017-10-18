net = require('net');

const PORT = process.env.PORT || 4444

let clients = [];

net.createServer( socket => {

    socket.identifier = socket.remoteAddress + ":" + socket.remotePort
    clients.push(socket)
    console.log('Client')

    socket.on('end', () => {
        clients.splice(clients.indexOf(socket), 1)
    })

    socket.on('data', data => {
        clients.forEach(s => {
            if (s.identifier !== socket.identifier)
                s.write(data)
        })
    })
}).listen(PORT)

console.log(`Started on port: ${PORT}`)
