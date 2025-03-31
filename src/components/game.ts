import { SwarmService } from "../services/swarm.service";
import { UserService } from "../services/user.service";
import { swarmMembersNumber } from "../shared/model";
import { getRandomSwarmIndex, groupSwarm } from "../utils/swarm-utils";

class Game {
  playerName: string = "";
  logEl!: HTMLElement;
  swarmEl!: HTMLElement;
  swarmMembers: any[] = [];

  constructor(
    private swarmService: SwarmService = new SwarmService(),
    private userService: UserService = new UserService(),
  ) {
    this.initUI();
  }

  initUI() {
    const app = document.getElementById("app")!;
    app.innerHTML = "";

    const user = this.userService.getUserName();
    if (user?.name) {
      this.playerName = user.name;
      this.startGame();
      return;
    }
    const title = document.createElement("h1");
    title.textContent = "🐝 Bee Game";

    const nameInput = document.createElement("input");
    nameInput.placeholder = "Enter your name...";

    const startBtn = document.createElement("button");
    startBtn.textContent = "Start Game";
    startBtn.onclick = () => {
      const name = nameInput.value.trim();
      if (!name) return alert("Please enter your name!");
      this.userService.setUserName({ name: name });
      this.playerName = name;
      this.startGame();
    };

    app.append(title, nameInput, startBtn);
  }

  startGame() {
    this.swarmMembers = this.swarmService.initializeSwarm(swarmMembersNumber);

    const app = document.getElementById("app")!;
    app.innerHTML = "";

    const header = document.createElement("div");
    header.innerHTML = `<h2>Welcome, <strong>${this.playerName}</strong>!</h2>`;

    const hitBtn = document.createElement("button");
    hitBtn.textContent = "💥 Hit";
    hitBtn.onclick = () => this.hitRandomBee();

    this.swarmEl = document.createElement("div");
    this.swarmEl.className = "swarm";

    this.logEl = document.createElement("div");
    this.logEl.className = "log";

    app.append(header, hitBtn, this.swarmEl, this.logEl);

    this.renderSwarm();
  }

  hitRandomBee() {
    const randomIndex = getRandomSwarmIndex(this.swarmMembers.length);
    const updatedSwarm = this.swarmService.handleHitBee(
      this.swarmMembers,
      randomIndex,
    );
    if (updatedSwarm.length === 0) {
      this.swarmMembers = [];
      this.logs("🐝 All bees are dead! Game Over.");
      this.renderSwarm();
      return;
    }

    this.swarmMembers = updatedSwarm;

    const hitBee = this.swarmMembers[randomIndex];
    this.logs(`💢 ${hitBee.type} Bee was hit! -${hitBee.healthPoints} HP`);
    this.renderSwarm();
  }

  renderSwarm() {
    const groupedSwarm = groupSwarm(this.swarmMembers);

    this.swarmEl.innerHTML = "";

    for (const [type, group] of Object.entries(groupedSwarm)) {
      const container = document.createElement("div");
      container.className = "bee-group";

      const title = document.createElement("h3");
      title.textContent = `${type} Bees (${group.length})`;
      container.appendChild(title);

      group.forEach((bee: any, index: number) => {
        const beeDiv = document.createElement("div");
        beeDiv.className = "bee";
        beeDiv.innerHTML = `${type} #${index + 1} – ${bee.healthPoints} HP`;
        container.appendChild(beeDiv);
      });

      this.swarmEl.appendChild(container);
    }
  }

  logs(message: string) {
    const entry = document.createElement("p");
    entry.textContent = message;
    this.logEl.prepend(entry);
  }
}

export default Game;
