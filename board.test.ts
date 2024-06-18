import { expect, test } from "bun:test";
import { Board, Ship } from "./src/main";

test("create a board", () => {
  let board = new Board();
  //9,9 because of 0-indexing
  expect(board.array[9][9]).toBe(0);
});

test("placing ship out of bounds", () => {
  let ship = new Ship(2);
  let board = new Board();
  expect(() => {
    board.placeShip(ship, [10, 4], "horizontal");
  }).toThrow();
});

test("throw error when ships overlap each other", () => {
  let ship1 = new Ship(2);
  let ship2 = new Ship(2);
  let board = new Board();
  board.placeShip(ship1, [2, 4], "horizontal");
  expect(() => {
    board.placeShip(ship2, [1, 4], "horizontal");
  }).toThrow();
});

/*test("check if ship size or coordinates are right", () => {
  let ship = new Ship(2);
  let board = new Board();
  expect(() => {
    board.placeShip(ship, [2, 4], [4, 4]);
  }).toThrow();
  expect(() => {
    board.placeShip(ship, [2, 4], [2, 4]);
  }).toThrow();
});
*/
test("placing ship horizontally on the board", () => {
  let ship = new Ship(2);
  let board = new Board();
  board.placeShip(ship, [2, 4], "horizontal");
  expect(board.array[4 - 1][3 - 1]).toBe(ship);
  board.prettyPrint(board.array)
});

test("placing ship vertically on the board", () => {
  let ship = new Ship(2);
  let board = new Board();
  board.placeShip(ship, [3, 5], "vertical");
  expect(board.array[6 - 1][3 - 1]).toBe(ship);
});

test("receiving a hit", () => {
  let ship = new Ship(2);
  let board = new Board();
  board.placeShip(ship, [2, 4], "horizontal");
  board.receiveHit(2, 4);
  expect(board.array[4 - 1][2 - 1].hits).toEqual(1);
});

test("receiving a miss", () => {
  let ship = new Ship(2);
  let board = new Board();
  board.placeShip(ship, [2, 4], "horizontal");
  board.receiveHit(2, 6);
  expect(board.miss).toEqual(1);
});

test("check for the same values", () => {
  let ship = new Ship(2);
  let board = new Board();
  board.placeShip(ship, [2, 4], "horizontal");
  board.receiveHit(2, 4);
  expect(board.array[4 - 1][2 - 1].hits).toEqual(1);
  expect(board.array[4 - 1][2].hits).toEqual(1);
});

test("check if sunk", () => {
  let ship = new Ship(2);
  let board = new Board();
  board.placeShip(ship, [2, 4], "horizontal");
  board.receiveHit(2, 4);
  board.receiveHit(3, 4);
  expect(board.array[4 - 1][2 - 1].isSunk()).toBe(true);
  expect(board.array[4 - 1][2].isSunk()).toBe(true);
});
