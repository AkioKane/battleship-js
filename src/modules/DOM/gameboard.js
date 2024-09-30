import { Ship } from "../factories/ship.js";

class Node {
  constructor(coordinates, ship) {
    this.coordinates = coordinates;
    this.ship = ship;
  }
}

class Gameboard {
  constructor(side, field = 10 * 10) {
    this.side = side;
    if (this.side === ".ai-player") {
      this.sideOpponent = ".player";
    } else {
      this.sideOpponent = ".ai-player";
    }
    this.field = field;
    this.table = this.createTable();
    this.ships = [];
    this.miss = [];
    this.randomShips = false;
  }

  createTable() {
    const tables = document.querySelectorAll(".table");

    if (
      tables[0].querySelector("div") !== null ||
      tables[1].querySelector("div") !== null
    )
      return;

    for (let i = 0; i < this.field; i++) {
      tables.forEach((table) => {
        const el = document.createElement("div");
        el.classList.add("cell");
        table.appendChild(el);
      });
    }
  }

  createShip(size, coordinates) {
    if (size > 4 || size < 1) {
      return console.log("ship length is incorrect!");
    }
    const ship = new Ship(size);
    const coordinate = [
      coordinates[0] * 10 + coordinates[1],
      coordinates[0] * 10 + coordinates[1] + size,
    ];

    if (this.checkForAvaliable(coordinate) === false) {
      if (this.side === ".ai-player") {
        return this.createShip(size, [
          this.getRandomNumber(0, 9),
          this.getRandomNumber(0, 9 - size),
        ]);
      } else if (this.randomShips) {
        return this.createShip(size, [
          this.getRandomNumber(0, 9),
          this.getRandomNumber(0, 9 - size),
        ]);
      } else {
        console.log("Incorrect position!");
      }
    }

    if (coordinates[1] + size >= Math.sqrt(this.field)) {
      return console.log("is big coordinates!");
    }

    const sidePlayers = document.querySelector(this.side);
    const cells = sidePlayers.querySelectorAll(".cell");
    const coordinatesShip = [];
    for (let i = coordinate[0]; i <= coordinate[1]; i++) {
      cells[i].classList.add("field-ship");

      // cells[i].classList.add("field-ship-side") // comment

      if (this.side === ".player") {
        cells[i].classList.add("field-ship-side");
      }
      coordinatesShip.push(i);
    }
    return this.ships.push(new Node(coordinatesShip, ship));
  }

  receiveAttack(coordinate) {
    const sidePlayers = document.querySelector(this.sideOpponent);
    const cells = sidePlayers.querySelectorAll(".cell");
    const coordinateAttack = coordinate;
    if (cells[coordinateAttack].classList.contains("field-ship")) {
      for (let i of this.ships) {
        for (let cor of i.coordinates) {
          if (coordinateAttack === cor) {
            i.ship.hit();
            cells[coordinateAttack].classList.add("cell-destroyed-ship");
            break;
          }
          cells[coordinateAttack].classList.add("cell-destroyed");
        }
      }
    } else {
      if (coordinateAttack in this.miss) {
        if (this.side === ".ai-player") {
          let coord = this.getRandomNumber(1, 99)
          console.log(coord)
          return this.receiveAttack(coord)
        }
      }
      cells[coordinateAttack].classList.add("cell-miss");
      this.miss.push(coordinateAttack);
    }

    return this;
  }

  checkSunk() {
    for (let i of this.ships) {
      if (i.ship.sunk === false) {
        return false;
      }
    }
    return true;
  }
  checkForAvaliable(coordinate) {
    const coordinates = [];
    for (let i = coordinate[0]; i <= coordinate[1]; i++) {
      coordinates.push(i);
    }
    for (let i of this.ships) {
      for (let cor of i.coordinates) {
        for (let y of coordinates) {
          if (cor === y || cor === y - 1 || cor === y + 1) {
            return false;
          } else if (cor === y - 10 || cor === y + 10) {
            return false;
          } else if (
            cor === y - 11 ||
            cor === y + 11 ||
            cor === y - 9 ||
            cor === y + 9
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export { Gameboard };