import config from "./config.js";
import CenaDeAbertura from "./cena.js";
import principal from "./principal.js"
import encerramento from "./encerramento.js"

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("abertura", CenaDeAbertura);
    this.scene.add("principal", principal);
    this.scene.add("encerramento", encerramento);
    this.scene.start("abertura");
  
  }
}

window.onload = () => {
  window.game = new Game();
};