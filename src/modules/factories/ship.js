class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    if (this.isSunk()) {
      return this.isSunk();
    }
    this.hits += 1;
    return this.hits;
  }

  isSunk() {
    if (this.hits === this.length) {
      return this.sunk = true;
    }
    return this.sunk;
  }
}

export { Ship }