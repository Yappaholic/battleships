export { Ship, Board, Player };
class Ship {
  public length: number;
  public hits: number;
  public sunked: boolean;
  constructor(length: number) {
    this.length = length;
    this.hits = 0;
    this.sunked = false;
  }
  hit() {
    this.hits++;
    return this.hits;
  }
  isSunk() {
    if (this.hits >= this.length) {
      this.sunked = true;
      return this.sunked;
    } else {
      return false;
    }
  }
}
class Board {
  /** Array starts from y coordinate, and then x coordinate*/
  public array: any[][];
  public miss: number;
  constructor() {
    this.array = this.buildBoard();
    this.miss = 0;
  }

  outOfBounds() {
    throw new Error("Ship is out of bounds");
  }

  overlapsCheck(start: number[], shipLength: number, placement: string): boolean {
    let [startX, startY] = start;
    if (placement == "horizontal") {
      for (
        let i = startX - 1;
        i <= startX + shipLength - 1;
        i++
      ) {
        if (this.array[startY - 1][i].hits != undefined) {
          return true
        }
        continue;
      }
    } else if (placement === "vertical") {
      for (
        let i = startY - 1;
        i <= startY + shipLength - 1;
        i++
      ) {
        if (this.array[i][startX - 1].hits != undefined) {
          return true
        }
        continue;
      }
      }
      return false
  }

  createShipCollection(): Ship[] {
    let carrier = new Ship(5);
    let battleship = new Ship(4);
    let destroyer = new Ship(3);
    let submarine = new Ship(3);
    let patrol = new Ship(3);
    let collection = [carrier, battleship, destroyer, submarine, patrol];
    return collection;
  }

/*  sizeCheck(ship: Ship, start: number[], end: number[]) {
    let len = ship.length;
    let [startX, startY] = start;
    let [endX, endY] = end;
    if (startX == endX) {
      if (len != Math.abs(endY - startY) + 1) {
        throw new Error("Wrong coordinates or ship size");
      }
    }
    if (startY == endY) {
      if (len != Math.abs(endX - startX) + 1) {
        throw new Error("Wrong coordinates or ship size");
      }
    }
  }
*/
  /**Makes 2-dimensional array and fills it with zeroes*/
  buildBoard(): number[][] {
    let array = Array.from(Array(10), () => new Array(10).fill(0));
    return array;
  }

  /**First number in the coordinates array should be x axis,
   and the second is the y axis. Also coordinates are written in human way, to ease web integration.*/
  placeShip(ship: Ship, startCoordinates: number[], placement: string) {
    let len = ship.length;
    let [startX, startY] = startCoordinates;
    if(this.overlapsCheck(startCoordinates, len, placement) === true) {
      throw new Error("bad option")
    };
    if (startX + len > 10) {
      this.outOfBounds();
    }
    if (startY + len > 10) {
      this.outOfBounds();
    }
    if (placement === "horizontal") {
      for (let i = startX - 1; i < len + startX - 1; i++) {
        this.array[startY - 1][i] = ship;
      }
      return this.array;
    }
    if (placement === "vertical") {
      for (let i = startY - 1; i < len + startY - 1; i++) {
        this.array[i][startX - 1] = ship;
      }
      return this.array;
    }
  }

  receiveHit(x: number, y: number) {
    if (this.array[y - 1][x - 1].hits != undefined) {
      this.array[y - 1][x - 1].hit();
      return this.array;
    }
    this.miss++;
    return this.array;
  }

  getRandomInt(max: number): number {
    let result = Math.floor(Math.random() * max);
    return result;
  }
  arrangeShips(collection: Ship[]) {
    //Place first half horizontally
    for (let i = 0; i <= 2; i++) {
      let ship = collection[i];
      let len = ship.length;
      let errors = 0;
      while (true) {
        try {
          let startX = this.getRandomInt(10 - len);
          let startY = this.getRandomInt(10 - len);
          this.placeShip(
            ship,
            [startX, startY],
            "horizontal"
          );
          break
        } catch (Error) {
        }
      }

        }
    //Place second half vertically
    for (let i = 2; i < collection.length; i++) {
      let ship = collection[i];
      let len = ship.length;
      let errors = 0;
      while (true) {
        try {
          let startX = this.getRandomInt(10 - len);
          let startY = this.getRandomInt(10 - len);
          this.placeShip(
            ship,
            [startX, startY],
            "vertical"
          );
          break
        } catch (Error) {
        }
      }

        }
    }
  

  prettyPrint(array: any[][]) {
    let print = [...array]
    for (let i = 0; i < array.length; i++) {
      for(let j = 0; j < array[i].length; j++) {
        if (print[i][j] instanceof Ship) {
          print[i][j] = print[i][j].length
        }
      }
    }
    for (let i = 0; i < array.length; i++) {
      console.log(print[i])
    }
  }
}

class Player {
  public board: Board;
  constructor() {
    this.board = new Board();
  }
}
