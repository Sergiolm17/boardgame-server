import { deck } from "./data.js";
import { INVALID_MOVE } from "boardgame.io/core";

function IsVictory(cells, numPlayers) {
  if (cells.filter((a) => Boolean(a)).length === numPlayers - 1) {
    return false;
  }
  return false;
}
const numberdeck = 10;

const TicTacToe = {
  name: "tic-tac-toe",

  setup: (ctx) => ({
    //cells: Array(deck.length).fill(null),
    deck,
    playerdeck: ShuffleNumber(ctx),
    select: [],
    boss: ctx.random.Die(ctx.numPlayers - 1).toString(),
    max: numberdeck,
  }),

  moves: {
    clickCell(G, ctx, id) {
      var newArray = G.select.filter((card) => {
        return card.player === ctx.currentPlayer;
      });

      //if (newArray.length === 1) return INVALID_MOVE;
      console.log("listo");
      G.select.push({
        player: ctx.currentPlayer,
        card: id,
      });
    },
    shuffle(G, ctx) {
      G.playerdeck = ShuffleNumber(ctx, G);
    },
    nextBoss(G, ctx) {
      if (G.boss === Number(ctx.numPlayers)) {
        G.boss = "0";
      }
      G.boss = ctx.random.Die(ctx.numPlayers - 1).toString();
    },
  },

  turn: { moveLimit: 1 },

  endIf: (G, ctx) => {
    /*
    if (IsVictory(G.cells, ctx.numPlayers)) {
      return { winner: ctx.currentPlayer };
    }
    if (IsVictory(G.cells, ctx.numPlayers)) {
      return { draw: true };
    }
    */
  },

  ai: {
    enumerate: (G) => {
      let moves = [];
      for (let i = 0; i < deck.length; i++) {
        if (G.deck[i] === null) {
          moves.push({ move: "clickCell", args: [i] });
        }
      }
      return moves;
    },
  },
};
function ShuffleNumber(ctx) {
  let temp_deck_all = [];
  let shuffle_deck = ctx.random.Shuffle(Array.from(Array(deck.length).keys()));
  Array.from(Array(ctx.numPlayers).keys()).forEach((player) => {
    let temp_deck = [];
    Array.from(Array(numberdeck).keys()).forEach((deck) => {
      temp_deck.push(shuffle_deck[player * numberdeck + deck]);
    });
    temp_deck_all.push(temp_deck);
  });
  return temp_deck_all;
}
export default TicTacToe;
