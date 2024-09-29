import { Ship } from "./ship.js";

class Node {
  constructor(coordinates, ship) {
    this.coordinates = coordinates;
    this.ship = ship;
  }
}

class Gameboard {
  constructor(field = 10*10) {
    this.field = field;
    this.table = this.createTable();
    this.ships = [];
    this.miss = [];
  }

  createTable() {
    const tables = document.querySelectorAll(".table");

    for(let i = 0; i < this.field; i++) {
      tables.forEach((table) => {
        const el = document.createElement("div");
        el.classList.add("cell");
        table.appendChild(el);
      })
    }
  }

  createShip(size, coordinates) {
    if (size > 6 || size < 2) {
      return console.log("ship length is incorrect!");
    }
    const ship = new Ship(size);
    const coordinate = [(coordinates[0] * 10) + coordinates[1], 
    ((coordinates[0] * 10) + coordinates[1]) + size]

    if ((coordinates[1] + size) >= Math.sqrt(this.field)) {
      return console.log("is big coordinates!");
    }
    
    const cells = document.querySelectorAll(".cell");
    const coordinatesShip = []
    for(let i = coordinate[0]; i <= coordinate[1]; i++) {
      cells[i].classList.add("field-ship");
      coordinatesShip.push(i);
    }
    return this.ships.push(new Node(coordinatesShip, ship))
  }

  receiveAttack(coordinate) {
    const cells = document.querySelectorAll(".cell");
    const coordinateAttack = (coordinate[0] * 10) + coordinate[1];
    if (cells[coordinateAttack].classList.contains("field-ship")) {
      for (let i of this.ships) {
        for (let cor of i.coordinates) {
          if (coordinateAttack === cor) {
            i.ship.hit();
            cells[coordinateAttack].classList.add("cell-destroyed")
            break;
          }
        }
      }
    } else {
      cells[coordinateAttack].classList.add("cell-miss");
      this.miss.push(coordinateAttack)
    }
    return this;
  }

  checkSunk() {
    for (let i of this.ships) {
      if (i.ship.sunk === false) {
        return false
      }
    }
    return true;
  }
}

export { Gameboard }

// const gameboard = new Gameboard();
// gameboard.createShip(4, [6, 2]);
// gameboard.createShip(3, [8, 4]);
// gameboard.createShip(2, [1, 2]);
// gameboard.createShip(2, [1, 8]);

// gameboard.receiveAttack([6, 2]);
// gameboard.receiveAttack([6, 4]);
// gameboard.receiveAttack([6, 5]);
// gameboard.receiveAttack([2, 4]);
// gameboard.receiveAttack([3, 9]);
// gameboard.receiveAttack([1, 2]);

// console.log(gameboard.checkSunk());
// console.log(gameboard.miss);
// console.log(gameboard.ships);