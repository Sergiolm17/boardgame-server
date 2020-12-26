const { Server } = require("boardgame.io/server");

const TicTacToe = require("./game");
const PORT = process.env.PORT || 3001;

const server = Server({ games: [TicTacToe.default] });

server.run(PORT, () => console.log(PORT));
