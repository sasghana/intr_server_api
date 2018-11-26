'use strict'

import app from './app'

import http from 'http';
import SocketIO from 'socket.io';

const server = http.Server(app);
const io = new SocketIO(server);

io.on('connection', socket => {
    socket.on('ALL_NOTIFICATIONS', res => {    
        io.emit('ALL_NOTIFICATIONS', res)               
    })
})

export default server

