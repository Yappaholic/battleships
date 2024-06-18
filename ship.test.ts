import { expect, test } from "bun:test";
import { Ship } from "./src/main";

test("Add amount of hits", () => {
  let ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("Check if ship is sunk", () => {
  let ship = new Ship(1);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("Check if ship is sunk #2", () => {
  let ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
