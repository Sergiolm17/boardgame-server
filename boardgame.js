const { Server } = require("boardgame.io/server");
const TicTacToe = require("../../board-getting-started/src/mecanic/game");
const PORT = process.env.PORT || 3000;

const server = Server({ games: [TicTacToe] });

server.run(PORT);
