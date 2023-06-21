export default class encerramento2 extends Phaser.Scene {
  constructor() {
    super("encerramento2");
  }

  preload() {
    this.load.image(
      "telafinal",
      "./assets/telafinal.png"
    );
  }

  create() {
    this.imagem = this.add.image(400, 225, "telafinal");
    this.timer = 2;
    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.countdown,
      callbackScope: this,
      loop: true,
    });
  }
  
  update() {}
}