import { Gameboard } from "./gameboard";

class Player {
  constructor() {
    this.player = new Gameboard(".player");
    this.aiPlayer = new Gameboard(".ai-player");
  }

  createAiShips() {
    this.aiPlayer.createShip(4, [this.getRandomNumber(0, 9), this.getRandomNumber(0, 5)])
    this.aiPlayer.createShip(3, [this.getRandomNumber(0, 9), this.getRandomNumber(0, 6)])
    this.aiPlayer.createShip(2, [this.getRandomNumber(0, 9), this.getRandomNumber(0, 7)])
    this.aiPlayer.createShip(2, [this.getRandomNumber(0, 9), this.getRandomNumber(0, 7)])
    this.aiPlayer.createShip(1, [this.getRandomNumber(0, 9), this.getRandomNumber(0, 8)])
  }

  createRandomPlayerShips() {
    this.player.randomShips = true;
    
    this.player.createShip(4, [this.getRandomNumber(0, 9), this.getRandomNumber(0, 5)])
    this.player.createShip(2, [this.getRandomNumber(0, 9), this.getRandomNumber(0, 7)])
    this.player.createShip(2, [this.getRandomNumber(0, 9), this.getRandomNumber(0, 7)])
    this.player.createShip(3, [this.getRandomNumber(0, 9), this.getRandomNumber(0, 6)])
    this.player.createShip(1, [this.getRandomNumber(0, 9), this.getRandomNumber(0, 8)])
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export { Player }

// const player = new Player();

// const gameboard = new Gameboard(".player");
// gameboard.createShip(4, [6, 2]);
// gameboard.createShip(3, [8, 4]);
// gameboard.createShip(2, [1, 2]);
// gameboard.createShip(1, [1, 8]);

// gameboard.receiveAttack([6, 2]);
// gameboard.receiveAttack([6, 4]);
// gameboard.receiveAttack([6, 5]);
// gameboard.receiveAttack([2, 4]);
// gameboard.receiveAttack([3, 9]);
// gameboard.receiveAttack([1, 2]);

// console.log(gameboard.checkSunk());
// console.log(gameboard.miss);
// console.log(gameboard.ships);