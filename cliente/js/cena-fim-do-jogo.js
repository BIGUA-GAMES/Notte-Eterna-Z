export default class encerramento extends Phaser.Scene {
  constructor() {
    super("encerramento");
  }

  preload() {
    this.load.image("infoinicial", "./assets/infoinicial.png");
  }

  create() {
    this.imagem = this.add
      .image(400, 225, "infoinicial")
      .setInteractive()
      .on("pointerdown", () => {
        this.imagem.destroy();
        this.game.scene.start("info-inicial");
      });
  }
  upload() {}
}