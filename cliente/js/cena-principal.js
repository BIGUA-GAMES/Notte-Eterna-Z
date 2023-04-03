export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

  preload() {
    this.load.spritesheet("mulher1", "./assets/mulher1.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    //
    this.load.spritesheet("?", "./assets/?.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {}

  update() {}
}