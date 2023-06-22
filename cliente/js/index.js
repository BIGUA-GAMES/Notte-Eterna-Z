import config from "./config.js";
import abertura from "./cena-abertura.js";
import sala from "./cena-sala.js";
import principal from "./cena-principal.js";
import fim_do_jogo from "./cena-fim-do-jogo.js";
import final_feliz from "./cena-final-feliz.js";
import info_inicial from "./info-inicial.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    let iceServers;
    if (window.location.host === "ifsc.digital") {
      this.socket = io.connect({ path: "/Notte-Eterna-Z/socket.io/" });

      iceServers = [
        {
          urls: "stun:ifsc.digital",
        },
        {
          urls: "turns:ifsc.digital",
          username: "adcipt",
          credential: "adcipt20231",
        },
      ];
    } else {
      this.socket = io();

      iceServers = [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ];
    }
    this.ice_servers = { iceServers };
    this.audio = document.querySelector("audio");

    this.socket.on("connect", () => {
      console.log("Conectado ao servidor para troca de mensagens.");
    });

    this.scene.add("abertura", abertura);
    this.scene.add("sala", sala);
    this.scene.add("principal", principal);
    this.scene.add("fim-do-jogo", fim_do_jogo);
    this.scene.add("final-feliz", final_feliz);
    this.scene.add("info-inicial", info_inicial);

    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};
