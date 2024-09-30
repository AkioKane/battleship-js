import { Player } from "../factories/player";
import { Gameboard } from "./gameboard";

const player = new Player();
player.createAiShips();
player.createRandomPlayerShips();


const aiSide = document.querySelector(".ai-player");
const cells = aiSide.querySelectorAll(".cell");

cells.forEach((element, index) => {
  element.classList.add("enemy-cell");
  element.addEventListener("click", () => {
    player.attack(index);
  })
})
