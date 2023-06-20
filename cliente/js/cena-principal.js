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

    this.load.spritesheet("cristal3", "./assets/cristal.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("cristal4", "./assets/cristal.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("cristal5", "./assets/cristal.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("cristal6", "./assets/cristal.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("cristal7", "./assets/cristal.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("cristal8", "./assets/cristal.png", {
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

    this.load.spritesheet("chave4", "./assets/chave.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("chave5", "./assets/chave.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("chave6", "./assets/chave.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("chave7", "./assets/chave.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("chave8", "./assets/chave.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("zumbi", "./assets/zumbi.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("zumbi2", "./assets/zumbi.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("zumbi3", "./assets/zumbi.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("zumbi4", "./assets/zumbi.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("zumbi5", "./assets/zumbi.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("zumbi6", "./assets/zumbi.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("zumbi7", "./assets/zumbi.png", {
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

    this.load.spritesheet("limbo", "./assets/limbo.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("limbo2", "./assets/limbo.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("tp", "./assets/tp.png", {
      frameWidth: 32,
      frameHeight: 32,
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
    this.tileset_principal_terreo_terreno2 =
      this.mapa_principal_terreo.addTilesetImage("terreno2", "terreno");

    /* Camadas */
    this.terreno = this.mapa_principal_terreo.createLayer(
      "terreno",
      [
        this.tileset_principal_terreo_terreno,
        this.tileset_principal_terreo_terreno2,
      ],
      0,
      0
    );

    this.fases = [
      {
        fase: 1,
        x: 80,
        y: 360,
      },
      {
        fase: 2,
        x: 80,
        y: 360,
      },
    ];
    this.fase = 1;

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = "robo-1";
      this.jogador_1 = this.physics.add.sprite(
        this.fases[this.fase].x,
        this.fases[this.fase].y,
        this.local
      );
      this.deslocamento_x = this.jogador_1.width / 2;
      this.deslocamento_y = this.jogador_1.height / 2;
      this.remoto = "robo-2";
      this.jogador_2 = this.add.sprite(80, 100, this.remoto);
    } else {
      this.remoto = "robo-1";
      this.jogador_2 = this.add.sprite(
        this.fases[this.fase].x,
        this.fases[this.fase].y,
        this.remoto
      );
      this.local = "robo-2";
      this.jogador_1 = this.physics.add.sprite(80, 100, this.local);
      this.deslocamento_x = this.jogador_1.width / 2;
      this.deslocamento_y = this.jogador_1.height / 2;

      /* Captura de áudio */
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
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

    /* TP */
    this.anims.create({
      key: "tp-brilhando",
      frames: this.anims.generateFrameNumbers("tp", {
        start: 0,
        end: 0,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.tp = [
      {
        x: 166,
        y: 100,
        objeto: undefined,
      },
    ];
    this.tp.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "tp");
      item.objeto.anims.play("tp-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_tp,
        null,
        this
      );
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

    this.anims.create({
      key: "cristal3-brilhando",
      frames: this.anims.generateFrameNumbers("cristal3", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.cristal3 = [
      {
        x: 5504,
        y: 32,
        objeto: undefined,
      },
    ];
    this.cristal3.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "cristal3");
      item.objeto.anims.play("cristal3-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_cristal3,
        null,
        this
      );
    });

    this.anims.create({
      key: "cristal4-brilhando",
      frames: this.anims.generateFrameNumbers("cristal4", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.cristal4 = [
      {
        x: 7968,
        y: 144,
        objeto: undefined,
      },
    ];
    this.cristal4.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "cristal4");
      item.objeto.anims.play("cristal4-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_cristal4,
        null,
        this
      );
    });

    this.anims.create({
      key: "cristal5-brilhando",
      frames: this.anims.generateFrameNumbers("cristal5", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.cristal5 = [
      {
        x: 10432,
        y: 224,
        objeto: undefined,
      },
    ];
    this.cristal5.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "cristal5");
      item.objeto.anims.play("cristal5-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_cristal5,
        null,
        this
      );
    });

    this.anims.create({
      key: "cristal6-brilhando",
      frames: this.anims.generateFrameNumbers("cristal6", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.cristal6 = [
      {
        x: 12992,
        y: 192,
        objeto: undefined,
      },
    ];
    this.cristal6.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "cristal6");
      item.objeto.anims.play("cristal6-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_cristal6,
        null,
        this
      );
    });

    this.anims.create({
      key: "cristal7-brilhando",
      frames: this.anims.generateFrameNumbers("cristal7", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.cristal7 = [
      {
        x: 15648,
        y: 192,
        objeto: undefined,
      },
    ];
    this.cristal7.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "cristal7");
      item.objeto.anims.play("cristal7-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_cristal7,
        null,
        this
      );
    });

    this.anims.create({
      key: "cristal8-brilhando",
      frames: this.anims.generateFrameNumbers("cristal8", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.cristal8 = [
      {
        x: 18400,
        y: 192,
        objeto: undefined,
      },
    ];
    this.cristal8.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "cristal8");
      item.objeto.anims.play("cristal8-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_cristal8,
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
        x: 5736,
        y: 160,
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

    this.anims.create({
      key: "chave4-brilhando",
      frames: this.anims.generateFrameNumbers("chave4", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.chave4 = [
      {
        x: 8256,
        y: 320,
        objeto: undefined,
      },
    ];
    this.chave4.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "chave4");
      item.objeto.anims.play("chave4-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_chave4,
        null,
        this
      );
    });

    this.anims.create({
      key: "chave5-brilhando",
      frames: this.anims.generateFrameNumbers("chave5", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.chave5 = [
      {
        x: 10848,
        y: 320,
        objeto: undefined,
      },
    ];
    this.chave5.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "chave5");
      item.objeto.anims.play("chave5-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_chave5,
        null,
        this
      );
    });

    this.anims.create({
      key: "chave6-brilhando",
      frames: this.anims.generateFrameNumbers("chave6", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.chave6 = [
      {
        x: 13408,
        y: 320,
        objeto: undefined,
      },
    ];
    this.chave6.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "chave6");
      item.objeto.anims.play("chave6-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_chave6,
        null,
        this
      );
    });

    this.anims.create({
      key: "chave7-brilhando",
      frames: this.anims.generateFrameNumbers("chave7", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.chave7 = [
      {
        x: 15968,
        y: 320,
        objeto: undefined,
      },
    ];
    this.chave7.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "chave7");
      item.objeto.anims.play("chave7-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_chave7,
        null,
        this
      );
    });

    this.anims.create({
      key: "chave8-brilhando",
      frames: this.anims.generateFrameNumbers("chave8", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.chave8 = [
      {
        x: 18528,
        y: 384,
        objeto: undefined,
      },
    ];
    this.chave8.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "chave8");
      item.objeto.anims.play("chave8-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_chave8,
        null,
        this
      );
    });

    /* ZUMBI */
    this.anims.create({
      key: "zumbi-brilhando",
      frames: this.anims.generateFrameNumbers("zumbi", {
        start: 25,
        end: 29,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.zumbi = [
      {
        x: 960,
        y: 352,
        objeto: undefined,
      },
    ];
    this.zumbi.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "zumbi");
      item.objeto.anims.play("zumbi-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_zumbi,
        null,
        this
      );
    });

    this.anims.create({
      key: "zumbi2-brilhando",
      frames: this.anims.generateFrameNumbers("zumbi2", {
        start: 25,
        end: 29,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.zumbi2 = [
      {
        x: 3360,
        y: 544,
        objeto: undefined,
      },
    ];
    this.zumbi2.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "zumbi2");
      item.objeto.anims.play("zumbi2-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_zumbi2,
        null,
        this
      );
    });

    this.anims.create({
      key: "zumbi3-brilhando",
      frames: this.anims.generateFrameNumbers("zumbi3", {
        start: 25,
        end: 29,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.zumbi3 = [
      {
        x: 4768,
        y: 352,
        objeto: undefined,
      },
    ];
    this.zumbi3.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "zumbi3");
      item.objeto.anims.play("zumbi3-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_zumbi3,
        null,
        this
      );
    });

    this.anims.create({
      key: "zumbi4-brilhando",
      frames: this.anims.generateFrameNumbers("zumbi4", {
        start: 25,
        end: 29,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.zumbi4 = [
      {
        x: 7776,
        y: 352,
        objeto: undefined,
      },
    ];
    this.zumbi4.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "zumbi4");
      item.objeto.anims.play("zumbi4-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_zumbi4,
        null,
        this
      );
    });

    this.anims.create({
      key: "zumbi5-brilhando",
      frames: this.anims.generateFrameNumbers("zumbi5", {
        start: 25,
        end: 29,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.zumbi5 = [
      {
        x: 9376,
        y: 512,
        objeto: undefined,
      },
    ];
    this.zumbi5.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "zumbi5");
      item.objeto.anims.play("zumbi5-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_zumbi5,
        null,
        this
      );
    });

    this.anims.create({
      key: "zumbi6-brilhando",
      frames: this.anims.generateFrameNumbers("zumbi6", {
        start: 25,
        end: 29,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.zumbi6 = [
      {
        x: 11872,
        y: 480,
        objeto: undefined,
      },
    ];
    this.zumbi6.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "zumbi6");
      item.objeto.anims.play("zumbi6-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_zumbi6,
        null,
        this
      );
    });

    this.anims.create({
      key: "zumbi7-brilhando",
      frames: this.anims.generateFrameNumbers("zumbi7", {
        start: 25,
        end: 29,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.zumbi7 = [
      {
        x: 14944,
        y: 512,
        objeto: undefined,
      },
    ];
    this.zumbi7.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "zumbi7");
      item.objeto.anims.play("zumbi7-brilhando");
      this.physics.add.collider(item.objeto, this.terreno, null, null, this);
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_zumbi7,
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
      {
        x: 1072,
        y: 624,
      },
      {
        x: 1104,
        y: 624,
      },
      {
        x: 1136,
        y: 624,
      },
      {
        x: 1296,
        y: 624,
      },
      {
        x: 1296,
        y: 624,
      },
      {
        x: 1328,
        y: 624,
      },
      {
        x: 1360,
        y: 624,
      },
      {
        x: 1392,
        y: 624,
      },
      {
        x: 1424,
        y: 624,
      },
      {
        x: 1456,
        y: 624,
      },
      {
        x: 1488,
        y: 624,
      },
      {
        x: 1520,
        y: 624,
      },
      {
        x: 1552,
        y: 624,
      },
      {
        x: 1584,
        y: 624,
      },
      {
        x: 1616,
        y: 624,
      },
      {
        x: 1648,
        y: 624,
      },
      {
        x: 1680,
        y: 624,
      },
      {
        x: 1712,
        y: 624,
      },
      {
        x: 1744,
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

    this.limbos2 = [
      {
        x: 2256,
        y: 624,
      },
      {
        x: 2288,
        y: 624,
      },
      {
        x: 2320,
        y: 624,
      },
      {
        x: 2352,
        y: 624,
      },
      {
        x: 2384,
        y: 624,
      },
      {
        x: 2416,
        y: 624,
      },
      {
        x: 2448,
        y: 624,
      },
      {
        x: 2480,
        y: 624,
      },
      {
        x: 2516,
        y: 624,
      },
      {
        x: 2548,
        y: 624,
      },
      {
        x: 2576,
        y: 624,
      },
      {
        x: 3088,
        y: 624,
      },
      {
        x: 3120,
        y: 624,
      },
      {
        x: 3152,
        y: 624,
      },
      {
        x: 3184,
        y: 624,
      },
      {
        x: 3216,
        y: 624,
      },
      {
        x: 3248,
        y: 624,
      },
      {
        x: 3280,
        y: 624,
      },
      {
        x: 3312,
        y: 624,
      },
      {
        x: 3344,
        y: 624,
      },
      {
        x: 3376,
        y: 624,
      },
      {
        x: 3408,
        y: 624,
      },
      {
        x: 3440,
        y: 624,
      },
      {
        x: 3472,
        y: 624,
      },
      {
        x: 3504,
        y: 624,
      },
      {
        x: 3536,
        y: 624,
      },
      {
        x: 3568,
        y: 624,
      },
      {
        x: 3600,
        y: 624,
      },
      {
        x: 3632,
        y: 624,
      },
      {
        x: 3664,
        y: 624,
      },
    ];

    this.limbos2.forEach((limbo2) => {
      limbo2.objeto = this.physics.add
        .sprite(limbo2.x, limbo2.y, "limbo2")
        .setImmovable(true);
      limbo2.objeto.body.setAllowGravity(false);
      this.physics.add.overlap(
        this.jogador_1,
        limbo2.objeto,
        this.reiniciar_fase2,
        null,
        this
      );
    });

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

    this.cameras.main.setBounds(0, 0, 32000, 1920);
    this.physics.world.setBounds(0, 0, 32000, 1924);
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

  coletar_tp(jogador, tp) {
    tp.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.tp.map((tp) => tp.objeto.visible)
      );
      this.jogador_1.x = 18448;
      this.jogador_1.y = 192;
    });
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

  coletar_cristal3(jogador, cristal3) {
    cristal3.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.cristal3.map((cristal3) => cristal3.objeto.visible)
      );
      this.jogador_1.x = 6464;
      this.jogador_1.y = 0;
    });
  }

  coletar_cristal4(jogador, cristal4) {
    cristal4.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.cristal4.map((cristal4) => cristal4.objeto.visible)
      );
      this.jogador_1.x = 9024;
      this.jogador_1.y = 352;
    });
  }

  coletar_cristal5(jogador, cristal5) {
    cristal5.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.cristal5.map((cristal5) => cristal5.objeto.visible)
      );
      this.jogador_1.x = 11552;
      this.jogador_1.y = 352;
    });
  }

  coletar_cristal6(jogador, cristal6) {
    cristal6.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.cristal6.map((cristal6) => cristal6.objeto.visible)
      );
      this.jogador_1.x = 14112;
      this.jogador_1.y = 352;
    });
  }

  coletar_cristal7(jogador, cristal7) {
    cristal7.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.cristal7.map((cristal7) => cristal7.objeto.visible)
      );
      this.jogador_1.x = 16672;
      this.jogador_1.y = 120;
    });
  }

  coletar_cristal8(jogador, cristal8) {
    cristal8.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.cristal8.map((cristal8) => cristal8.objeto.visible)
      );
      this.jogador_1.x = 19260;
      this.jogador_1.y = 352;
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
      this.jogador_1.x = 6432;
      this.jogador_1.y = 160;
    });
  }

  coletar_chave4(jogador, chave4) {
    chave4.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.chave4.map((chave4) => chave4.objeto.visible)
      );
      this.jogador_1.x = 9024;
      this.jogador_1.y = 352;
    });
  }

  coletar_chave5(jogador, chave5) {
    chave5.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.chave5.map((chave5) => chave5.objeto.visible)
      );
      this.jogador_1.x = 11552;
      this.jogador_1.y = 352;
    });
  }

  coletar_chave6(jogador, chave6) {
    chave6.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.chave6.map((chave6) => chave6.objeto.visible)
      );
      this.jogador_1.x = 14112;
      this.jogador_1.y = 352;
    });
  }

  coletar_chave7(jogador, chave7) {
    chave7.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.chave7.map((chave7) => chave7.objeto.visible)
      );
      this.jogador_1.x = 16672;
      this.jogador_1.y = 320;
    });
  }

  coletar_chave8(jogador, chave8) {
    chave8.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.chave8.map((chave8) => chave8.objeto.visible)
      );
      this.jogador_1.x = 19260;
      this.jogador_1.y = 352;
    });
  }

  coletar_zumbi(jogador, zumbi) {
    zumbi.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.zumbi.map((zumbi) => zumbi.objeto.visible)
      );
      this.jogador_1.x = 80;
      this.jogador_1.y = 360;
    });
  }

  coletar_zumbi2(jogador, zumbi2) {
    zumbi2.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.zumbi2.map((zumbi2) => zumbi2.objeto.visible)
      );
      this.jogador_1.x = 2580;
      this.jogador_1.y = 420;
    });
  }

  coletar_zumbi3(jogador, zumbi3) {
    zumbi3.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.zumbi3.map((zumbi3) => zumbi3.objeto.visible)
      );
      this.jogador_1.x = 4520;
      this.jogador_1.y = 296;
    });
  }

  coletar_zumbi4(jogador, zumbi4) {
    zumbi4.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.zumbi4.map((zumbi4) => zumbi4.objeto.visible)
      );
      this.jogador_1.x = 6432;
      this.jogador_1.y = 160;
    });
  }

  coletar_zumbi5(jogador, zumbi5) {
    zumbi5.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.zumbi5.map((zumbi5) => zumbi5.objeto.visible)
      );
      this.jogador_1.x = 9024;
      this.jogador_1.y = 352;
    });
  }

  coletar_zumbi6(jogador, zumbi6) {
    zumbi6.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.zumbi6.map((zumbi6) => zumbi6.objeto.visible)
      );
      this.jogador_1.x = 11552;
      this.jogador_1.y = 352;
    });
  }

  coletar_zumbi7(jogador, zumbi7) {
    zumbi7.disableBody(true, true);
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.game.socket.emit(
        "artefatos-publicar",
        this.game.sala,
        this.zumbi7.map((zumbi7) => zumbi7.objeto.visible)
      );
      this.jogador_1.x = 14112;
      this.jogador_1.y = 352;
    });
  }

  /* Função para saltar no mapa */
  reiniciar_fase() {
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.jogador_1.x = this.fases[this.fase].x;
      this.jogador_1.y = this.fases[this.fase].y;
    });
  }

  reiniciar_fase2() {
    this.cameras.main.fadeOut(250);
    this.cameras.main.once("camerafadeoutcomplete", (camera) => {
      camera.fadeIn(250);
      this.jogador_1.x = 2580;
      this.jogador_1.y = 150;
    });
  }

  passar_de_fase() {
    this.game.scene.stop("cena-principal");
    this.game.scene.start("cena2");
    this.game.socket.emit("cena-publicar", this.game.sala, "cena2");
  }
}
