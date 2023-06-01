export default class abertura extends Phaser.Scene {
  constructor() {
    super("abertura");
  }

  preload() {
    this.load.image("ifsc-sj-2014-entrada", "./assets/ifsc-sj-2014-entrada.png");
  }

  create() {
    this.imagem = this.add.image(400, 225, "ifsc-sj-2014-entrada");
    this.timer = 2;
    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.countdown,
      callbackScope: this,
      loop: true,
    });
  }

  upload() {}

  countdown() {
    this.timer -= 1;
    if (this.timer <= 0) {
      this.imagem.destroy();
      this.timedEvent.destroy();
      this.game.scene.start("sala");
    }
  }
}