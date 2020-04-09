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
});

http.listen(global.port, () => {
  console.log(`Server running on http://localhost:${global.port}/`);
});