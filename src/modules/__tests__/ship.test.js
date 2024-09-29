import { Ship } from "../ship";

test("test hits, isSunk components", () => {
  const ship = new Ship(3);
  expect(ship.hit()).toBe(1);
  expect(ship.isSunk()).toBe(false);
  expect(ship.hit()).toBe(2);
  expect(ship.isSunk()).toBe(false);
  expect(ship.hit()).toBe(3);
  expect(ship.isSunk()).toBe(true);
})