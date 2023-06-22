export default class info_inicial extends Phaser.Scene {
  constructor() {
    super("info-inicial");
  }

  preload() {
    this.load.image("infoinicial2", "./assets/infoinicial2.png");
  }

  create() {
    this.imagem = this.add
      .image(400, 225, "infoinicial2")
      .setInteractive()
      .on("pointerdown", () => {
        this.imagem.destroy();
        this.game.scene.start("principal");
      });
  }
  upload() {}
}
