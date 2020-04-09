'use strict';

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const global = require('./global');
global.setProperties({context_path: __dirname})

app.get('/', (req, res) => {
  const filePath = global.htmlFolderFile();
  console.log("filePath", filePath)
  res.sendFile(filePath);
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    emit(socket, msg);
    broadcastEmit('hi to everyone');
  });
});

const emit = (socket, msg) => {
  console.log("emit -> socket, msg", socket.id, msg)
  socket.emit('some event', msg);
}

const broadcastEmit = (msg) => {
  console.log("broadcastEmit -> msg", msg)
  // io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
  io.emit('some event', msg);
}

http.listen(global.port, () => {
  console.log(`Server running on http://localhost:${global.port}/`);
});