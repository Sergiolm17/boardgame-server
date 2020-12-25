const { data } = require("./data");
function IsVictory(cells, numPlayers) {
  if (cells.filter((a) => Boolean(a)).length === numPlayers - 1) {
    return true;
  }
  return false;
}

exports.TicTacToe = {
  name: "tic-tac-toe",

  setup: () => ({
    cells: Array(data.length).fill(null),
    deck: data,
    boss: "0",
  }),

  moves: {
    clickCell(G, ctx, id) {
      //console.log(ctx.numPlayers);
      if (G.cells[id] === null) {
        G.cells[id] = ctx.currentPlayer;
      }
    },
  },

  turn: { moveLimit: 1 },

  endIf: (G, ctx) => {
    if (IsVictory(G.cells, ctx.numPlayers)) {
      return { winner: ctx.currentPlayer };
    }
    if (IsVictory(G.cells)) {
      return { draw: true };
    }
  },

  ai: {
    enumerate: (G) => {
      let moves = [];
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          moves.push({ move: "clickCell", args: [i] });
        }
      }
      return moves;
    },
  },
};
