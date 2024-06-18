import {expect, test} from "bun:test";
import {Player} from "./src/main"


test("make a new player", () => {
  let player = new Player();
  expect(player.board).toBeObject()
})
