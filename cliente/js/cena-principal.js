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
      frameWidth: 42,
      frameHeight: 50,
    });

    /* Personagem 2 */
    this.load.spritesheet("robo-2", "./assets/robo-2.png", {
      frameWidth: 33,
      frameHeight: 33,
    });

    this.load.spritesheet("cristal", "./assets/cristal.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("cristal2", "./assets/cristal.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("chave", "./assets/chave.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("chave2", "./assets/chave.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("chave3", "./assets/chave.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("zumbi", "./assets/zumbi.png", {
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

    this.load.spritesheet("vazio", "./assets/vazio.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.audio("techno-trilha", "./assets/techno.mp3");
  }

  create() {
    this.trilha = this.sound.add("techno-trilha");
    this.trilha.loop = true;
    this.trilha.play();

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

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = "robo-1";
      this.jogador_1 = this.physics.add.sprite(80, 360, this.local);
      this.deslocamento_x = this.jogador_1.width / 2;
      this.deslocamento_y = this.jogador_1.height / 2;
      this.remoto = "robo-2";
      this.jogador_2 = this.add.sprite(80, 100, this.remoto);
    } else {
      this.remoto = "robo-1";
      this.jogador_2 = this.add.sprite(80, 360, this.remoto);
      this.local = "robo-2";
      this.jogador_1 = this.physics.add.sprite(80, 100, this.local);
      this.deslocamento_x = this.jogador_1.width / 2;
      this.deslocamento_y = this.jogador_1.height / 2;

      /* Captura de áudio */
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          console.log(stream);

          /* Consulta ao(s) servidor(es) ICE */
          this.game.localConnection = new RTCPeerConnection(
            this.game.ice_servers
          );

          /* Oferta de candidatos ICE */
          this.game.localConnection.onicecandidate = ({ candidate }) => {
            candidate &&
              this.game.socket.emit("candidate", this.game.sala, candidate);
          };

          /* Associação com o objeto HTML de áudio */
          this.game.localConnection.ontrack = ({ streams: [stream] }) => {
            this.game.audio.srcObject = stream;
          };

          /* Associação de mídia com conexão remota */
          stream
            .getTracks()
            .forEach((track) =>
              this.game.localConnection.addTrack(track, stream)
            );

          /* Oferta de mídia */
          this.game.localConnection
            .createOffer()
            .then((offer) =>
              this.game.localConnection.setLocalDescription(offer)
            )
            .then(() => {
              this.game.socket.emit(
                "offer",
                this.game.sala,
                this.game.localConnection.localDescription
              );
            });

          this.game.midias = stream;
        })
        .catch((error) => console.log(error));
    }

    /* Recebimento de oferta de mídia */
    this.game.socket.on("offer", (description) => {
      this.game.remoteConnection = new RTCPeerConnection(this.game.ice_servers);

      /* Contraoferta de candidatos ICE */
      this.game.remoteConnection.onicecandidate = ({ candidate }) => {
        candidate &&
          this.game.socket.emit("candidate", this.game.sala, candidate);
      };

      /* Associação com o objeto HTML de áudio */
      this.game.remoteConnection.ontrack = ({ streams: [stream] }) => {
        this.game.audio.srcObject = stream;
      };

      /* Associação de mídia com conexão remota */
      this.game.midias
        .getTracks()
        .forEach((track) =>
          this.game.remoteConnection.addTrack(track, this.game.midias)
        );

      /* Contraoferta de mídia */
      this.game.remoteConnection
        .setRemoteDescription(description)
        .then(() => this.game.remoteConnection.createAnswer())
        .then((answer) =>
          this.game.remoteConnection.setLocalDescription(answer)
        )
        .then(() => {
          this.game.socket.emit(
            "answer",
            this.game.sala,
            this.game.remoteConnection.localDescription
          );
        });
    });

    /* Recebimento de contraoferta de mídia */
    this.game.socket.on("answer", (description) => {
      this.game.localConnection.setRemoteDescription(description);
    });

    /* Recebimento de candidato ICE */
    this.game.socket.on("candidate", (candidate) => {
      let conn = this.game.localConnection || this.game.remoteConnection;
      conn.addIceCandidate(new RTCIceCandidate(candidate));
    });

    this.vazio = this.physics.add.sprite(1, 1921, "vazio").setImmovable(true);

    this.anims.create({
      key: "jogador-parado",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "jogador-esquerda",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 12,
        end: 15,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: "jogador-direita",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 8,
        end: 11,
      }),
      frameRate: 12,
      repeat: -1,
    });

    /* Cristal */
    this.anims.create({
      key: "cristal-brilhando",
      frames: this.anims.generateFrameNumbers("cristal", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.cristal = [
      {
        x: 1750,
        y: 100,
        objeto: undefined,
      },
    ];
    this.cristal.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "cristal");
      item.objeto.anims.play("cristal-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_cristal,
        null,
        this
      );
    });

    this.anims.create({
      key: "cristal2-brilhando",
      frames: this.anims.generateFrameNumbers("cristal2", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.cristal2 = [
      {
        x: 3820,
        y: 15,
        objeto: undefined,
      },
    ];
    this.cristal2.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "cristal2");
      item.objeto.anims.play("cristal2-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_cristal2,
        null,
        this
      );
    });

    /* Chave */
    this.anims.create({
      key: "chave-brilhando",
      frames: this.anims.generateFrameNumbers("chave", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.chave = [
      {
        x: 1860,
        y: 100,
        objeto: undefined,
      },
    ];
    this.chave.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "chave");
      item.objeto.anims.play("chave-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_chave,
        null,
        this
      );
    });

    this.anims.create({
      key: "chave2-brilhando",
      frames: this.anims.generateFrameNumbers("chave2", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.chave2 = [
      {
        x: 3820,
        y: 100,
        objeto: undefined,
      },
    ];
    this.chave2.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "chave2");
      item.objeto.anims.play("chave2-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_chave2,
        null,
        this
      );
    });

    this.anims.create({
      key: "chave3-brilhando",
      frames: this.anims.generateFrameNumbers("chave3", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.chave3 = [
      {
        x: 4552,
        y: 296,
        objeto: undefined,
      },
    ];
    this.chave3.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "chave3");
      item.objeto.anims.play("chave3-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_chave3,
        null,
        this
      );
    });

    this.limbos = [
      {
        x: 560,
        y: 624,
      },
      {
        x: 592,
        y: 624,
      },
      {
        x: 624,
        y: 624,
      },
      {
        x: 656,
        y: 624,
      },
    ];

    this.limbos.forEach((limbo) => {
      limbo.objeto = this.physics.add
        .sprite(limbo.x, limbo.y, "limbo")
        .setImmovable(true);
      limbo.objeto.body.setAllowGravity(false);
      this.physics.add.overlap(
        this.jogador_1,
        limbo.objeto,
        this.reiniciar_fase,
        null,
        this
      );
    });

    this.zumbi = this.physics.add.sprite(
      this.jogador_1.x + 50,
      this.jogador_1.y,
      "zumbi"
    );

    this.anims.create({
      key: "zumbi-direita",
      frames: this.anims.generateFrameNumbers("zumbi", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "zumbi-esquerda",
      frames: this.anims.generateFrameNumbers("zumbi", {
        start: 5,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.zumbi.anims.play("zumbi-direita");
    this.zumbi.setVelocityX(50);

    this.physics.add.collider(
      this.zumbi,
      this.terreno,
      this.zumbi_terreno,
      null,
      this
    );

    this.physics.add.overlap(
      this.zumbi,
      this.jogador_1,
      this.zumbi_jogador,
      null,
      this
    );

    /* Colisão entre personagem 1  E vazio */
    this.physics.add.collider(
      this.jogador_1,
      this.vazio,
      this.recomecar_fase,
      null,
      this
    );

    /* Botões */
    this.cima = this.add
      .sprite(740, 400, "cima", 0)
      .setInteractive()
      .on("pointerdown", () => {
        if (this.jogador_1.body.blocked.down) {
          this.cima.setFrame(0);
          this.jogador_1.setVelocityY(-225);
        }
      })
      .on("pointerup", () => {
        this.cima.setFrame(0);
      })
      .setScrollFactor(0);

    this.esquerda = this.add
      .sprite(50, 400, "esquerda", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.esquerda.setFrame(0);
        this.jogador_1.setVelocityX(-100);
        this.jogador_1.anims.play("jogador-esquerda");
      })
      .on("pointerup", () => {
        this.esquerda.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("jogador-parado");
      })
      .setScrollFactor(0);

    this.direita = this.add
      .sprite(190, 400, "direita", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.direita.setFrame(0);
        this.jogador_1.setVelocityX(100);
        this.jogador_1.anims.play("jogador-direita");
      })
      .on("pointerup", () => {
        this.direita.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("jogador-parado");
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

    /* Colisões por tile */
    this.terreno.setCollisionByProperty({ collides: true });

    /* Colisão entre personagem 1 e mapa (por layer) */
    this.physics.add.collider(
      this.jogador_1,
      this.terreno,
      this.null,
      null,
      this
    );

    this.jogador_1.setCollideWorldBounds(true);

    this.cameras.main.setBounds(0, 0, 12000, 1920);
    this.physics.world.setBounds(0, 0, 12000, 1924);
    this.cameras.main.startFollow(this.jogador_1);

    this.game.socket.on("estado-notificar", ({ frame, x, y }) => {
      this.jogador_2.setFrame(frame);
      this.jogador_2.x = x;
      this.jogador_2.y = y;
    });

    this.game.socket.on("artefatos-notificar", (artefatos) => {
      for (let i = 0; i < artefatos.length; i++) {
        if (!artefatos[i]) {
          this.cristal[i].objeto.disableBody(true, true);
        }
      }
    });
  }

  update() {
    try {
      this.game.socket.emit("estado-publicar", this.game.sala, {
        frame: this.jogador_1.anims.getFrameName(),
        x: this.jogador_1.body.x + this.deslocamento_x,
        y: this.jogador_1.body.y + this.deslocamento_y,
      });
    } catch (e) {
      console.log(e);
    }
  }

  coletar_cristal(jogador, cristal) {
    cristal.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.cristal.map((cristal) => cristal.objeto.visible)
      );
      this.jogador_1.x = 2580;
      this.jogador_1.y = 150;
    });
  }

  coletar_cristal2(jogador, cristal2) {
    cristal2.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.cristal2.map((cristal2) => cristal2.objeto.visible)
      );
      this.jogador_1.x = 4520;
      this.jogador_1.y = 64;
    });
  }

  coletar_chave(jogador, chave) {
    chave.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.chave.map((chave) => chave.objeto.visible)
      );
      this.jogador_1.x = 2580;
      this.jogador_1.y = 420;
    });
  }

  coletar_chave2(jogador, chave2) {
    chave2.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.chave2.map((chave2) => chave2.objeto.visible)
      );
      this.jogador_1.x = 4520;
      this.jogador_1.y = 296;
    });
  }

  coletar_chave3(jogador, chave3) {
    chave3.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.chave3.map((chave3) => chave3.objeto.visible)
      );
      this.jogador_1.x = 5736;
      this.jogador_1.y = 224;
    });
  }

  zumbi_terreno(zumbi, terreno) {
    if (zumbi.body.blocked.left) {
      this.zumbi.anims.play("zumbi-direita");
      this.zumbi.setVelocityX(50);
    } else if (zumbi.body.blocked.right) {
      this.zumbi.anims.play("zumbi-esquerda");
      this.zumbi.setVelocityX(-50);
    }
  }

  /* Colisão entre zumbi e jogador */
  zumbi_jogador() {
    // this.game.scene.stop("principal")
  }

  /* Função para saltar no mapa */
  reiniciar_fase() {
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.jogador_1.x = 80;
      this.jogador_1.y = 360;
    });
  }
}
