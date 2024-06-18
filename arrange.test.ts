import { expect, test } from "bun:test";
import { Board, Ship } from "./src/main";
test("ships arrange successfully", () => {
  let board = new Board();
  let collection = board.createShipCollection();
  expect(() => {
    board.arrangeShips(collection);
  }).not.toThrow();
  board.prettyPrint(board.array)
});
