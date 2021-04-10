const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

const lengthUser = [];

app.use(express.static(path.join(__dirname, 'client')))

app.get('/', (req,res) => {
    res.sendFile('index.html');
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

io.on('connection', (socket) => {
    console.log('a user connected');
    lengthUser.push(socket);
    io.emit('lengthUsers', lengthUser.length);

    socket.on('disconnect', () => {
        console.log('user disconnected');
        lengthUser.splice(lengthUser.indexOf(socket), 1);
        io.emit('lengthUsers', lengthUser.length);

        
    });

    socket.on('send_message', (data) => {
        console.log('send');
        io.emit('add_message', data);
        
    })

    socket.on('enter_text', (name) => {
        socket.broadcast.emit('nameUser', name);
    })


    
      
      
  });

  
  



