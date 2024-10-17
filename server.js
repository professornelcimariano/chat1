const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir os arquivos estáticos (HTML, CSS, JS)
app.use(express.static(__dirname + '/public'));

// Quando o cliente se conecta
io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  // Ouvir mensagem do cliente
  socket.on('chat message', (msg) => {
    console.log('Mensagem recebida: ' + msg);
    // Enviar mensagem para todos os clientes conectados
    io.emit('chat message', msg);
  });

  // Quando o cliente se desconecta
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

// Servir na porta 3000
server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
