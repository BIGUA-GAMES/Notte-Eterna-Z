export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

  preload() {
    /* Tilemap */
    this.load.tilemapTiledJSON(
      "mapa-principal-terreo",
      "./assets/principal-terreo.json"
    );

    /* Tilesets */
    this.load.image("terreno", "./assets/terreno.png");

    /* Personagem 1 */
    this.load.spritesheet("robo-1", "./assets/robo-1.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    /* Personagem 2 */
    this.load.spritesheet("robo-2", "./assets/robo-2.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    /* Botões */
    this.load.spritesheet("cima", "./assets/cima.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("baixo", "./assets/baixo.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("esquerda", "./assets/esquerda.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("direita", "./assets/direita.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("tela-cheia", "./assets/tela-cheia.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    /* Tilemap */
    this.mapa_principal_terreo = this.make.tilemap({
      key: "mapa-principal-terreo",
    });

    /* Tilesets */
    this.tileset_principal_terreo_terreno =
      this.mapa_principal_terreo.addTilesetImage("terreno", "terreno");

    /* Camadas */
    this.terreno = this.mapa_principal_terreo.createLayer(
      "terreno",
      this.tileset_principal_terreo_terreno,
      0,
      0
    );

    /* Personagem 1 */
    this.jogador_1 = this.physics.add.sprite(300, 225, "robo-1");

    this.anims.create({
      key: "jogador-1-parado",
      frames: this.anims.generateFrameNumbers("robo-1", {
        start: 0,
        end: 3,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "jogador-1-cima",
      frames: this.anims.generateFrameNumbers("robo-1", {
        start: 64,
        end: 79,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "jogador-1-baixo",
      frames: this.anims.generateFrameNumbers("robo-1", {
        start: 0,
        end: 15,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "jogador-1-esquerda",
      frames: this.anims.generateFrameNumbers("robo-1", {
        start: 12,
        end: 15,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "jogador-1-direita",
      frames: this.anims.generateFrameNumbers("robo-1", {
        start: 8,
        end: 11,
      }),
      frameRate: 30,
      repeat: -1,
    });

    /* Personagem 2 */
    this.jogador_2 = this.add.sprite(600, 225, "robo-2");
    this.anims.create({
      key: "jogador-2-parado",
      frames: this.anims.generateFrameNumbers("robo-2", {
        start: 0,
        end: 3,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "jogador-2-cima",
      frames: this.anims.generateFrameNumbers("robo-2", {
        start: 64,
        end: 79,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "jogador-2-baixo",
      frames: this.anims.generateFrameNumbers("robo-2", {
        start: 0,
        end: 15,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "jogador-2-esquerda",
      frames: this.anims.generateFrameNumbers("robo-2", {
        start: 12,
        end: 15,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "jogador-2-direita",
      frames: this.anims.generateFrameNumbers("robo-2", {
        start: 8,
        end: 11,
      }),
      frameRate: 30,
      repeat: -1,
    });

    /* Botões */
    this.cima = this.add
      .sprite(120, 330, "cima", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.cima.setFrame(1);
        this.jogador_1.setVelocityY(-100);
        this.jogador_1.anims.play("jogador-1-cima");
      })
      .on("pointerup", () => {
        this.cima.setFrame(0);
        this.jogador_1.setVelocityY(0);
        this.jogador_1.anims.play("jogador-1-parado");
      })
      .setScrollFactor(0);

    this.baixo = this.add
      .sprite(120, 400, "baixo", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.baixo.setFrame(1);
        this.jogador_1.setVelocityY(100);
        this.jogador_1.anims.play("jogador-1-baixo");
      })
      .on("pointerup", () => {
        this.baixo.setFrame(0);
        this.jogador_1.setVelocityY(0);
        this.jogador_1.anims.play("jogador-1-parado");
      })
      .setScrollFactor(0);

    this.esquerda = this.add
      .sprite(50, 400, "esquerda", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.esquerda.setFrame(1);
        this.jogador_1.setVelocityX(-100);
        this.jogador_1.anims.play("jogador-1-esquerda");
      })
      .on("pointerup", () => {
        this.esquerda.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("jogador-1-parado");
      })
      .setScrollFactor(0);

    this.direita = this.add
      .sprite(190, 400, "direita", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.direita.setFrame(1);
        this.jogador_1.setVelocityX(100);
        this.jogador_1.anims.play("jogador-1-direita");
      })
      .on("pointerup", () => {
        this.direita.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("jogador-1-parado");
      })
      .setScrollFactor(0);

    this.tela_cheia = this.add
      .sprite(750, 50, "tela-cheia", 0)
      .setInteractive()
      .on("pointerdown", () => {
        if (this.scale.isFullscreen) {
          this.tela_cheia.setFrame(0);
          this.scale.stopFullscreen();
        } else {
          this.tela_cheia.setFrame(1);
          this.scale.startFullscreen();
        }
      })
      .setScrollFactor(0);

    this.jogador_1.setCollideWorldBounds(true);
    this.cameras.main.setBounds(0, 0, 1280, 1920);
    this.physics.world.setBounds(0, 0, 1280, 1920);
    this.cameras.main.startFollow(this.jogador_1);

    /* Colisões por tile */
    this.terreno.setCollisionByProperty({ collides: true });

    /* Colisão entre personagem 1 e mapa (por layer) */
    this.physics.add.collider(
      this.jogador_1,
      this.terreno,
      this.collision,
      null,
      this
    );
  }

  update() {}

  collision() {
    /* Tremer a tela por 100 ms com baixa intensidade (0.01) */
    // this.cameras.main.shake(100, 0.01);

    /* Vibrar o celular pelos mesmos 100 ms */
    if (window.navigator.vibrate) {
      window.navigator.vibrate([100]);
    }
  }
}
