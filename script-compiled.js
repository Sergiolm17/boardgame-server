const { Server } = require("boardgame.io/server");
const TicTacToe = require("./game");
const PORT = process.env.PORT || 3000;

const server = Server({ games: [TicTacToe] });

server.run(PORT);
