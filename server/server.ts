import express from "express";
import http from 'http';
import socketio from 'socket.io';
import path from 'path';

const isDevelopment = (process.env.NODE_ENV || "development").trim() === 'development';
const port = 3000;

console.log("server.ts | (ignoring)isDevelopment=", isDevelopment);

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const io: socketio.Server = new socketio.Server();


//socket
io.attach(server, {
    path: '/socket',
    cors: { origin: '*' }
});

io.on('connection', function (socket) {
    console.log("[Server] New socket connection")
});

//app
app.use(express.static(path.join(__dirname, "..", "public")));

app.use('/static', express.static(path.join(__dirname, "..", "static")));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server! " + new Date().getTime() });
});

app.get("/game", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "static", "phaser", "index.html"))
});

app.get("/notapi", (req, res) => {
    res.json({ message: "Hello from server! " + new Date().getTime() });
});

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "..", "static", "client", "index.html")));

server.listen(port, () => console.log(`Express web server started: http://localhost:${port}`));

/*
import mouseGame from './mouseGame'
import Chat from "./chat";

const mouse_game = mouseGame(io.of('/api/mousegame'));
const chat = new Chat(io.of('/api/chat'));
*/


console.log("Starting game...")

import '@geckos.io/phaser-on-nodejs'
global['phaserOnNodeFPS'] = 60

import { GameServer } from '@phaserGame/game/gameServer'

var game_server = new GameServer(
    io.of('/api/phaserGame')
)


