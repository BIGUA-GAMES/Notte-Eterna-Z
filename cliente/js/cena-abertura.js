export default class abertura extends Phaser.Scene {
  constructor() {
    super("abertura");
  }

  preload() {
    this.load.image("menu", "./assets/menu.png");
  }

  create() {
    this.imagem = this.add
      .image(400, 225, "menu")
      .setInteractive()
      .on("pointerdown", () => {
        this.imagem.destroy();
        this.texto.destroy();
        this.game.scene.start("principal");
      });

    this.texto = this.add.text(490, 50, "Clique no prédio para entrar...", {
      fill: "#000000",
    });
  }

  upload() {}
}