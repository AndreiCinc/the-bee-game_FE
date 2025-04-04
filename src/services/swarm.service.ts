import { SwarmListStorageService } from "./swarm-list-storage.service";
import { createSwarm, hitBee } from "./../utils/swarm-utils";
import { SwarmMembersType } from "../shared/interfaces";
import { swarmMembersNumber } from "../shared/model";

export class SwarmService {
  constructor(
    private swarmListStorageService: SwarmListStorageService = new SwarmListStorageService(),
  ) {}

  initializeSwarm(swarmMembers: SwarmMembersType = swarmMembersNumber): any[] {
    const existingSwarm = this.swarmListStorageService.getSwarm();
    if (
      existingSwarm &&
      Array.isArray(existingSwarm) &&
      existingSwarm.length > 0
    ) {
      return existingSwarm;
    }

    const swarm = createSwarm(swarmMembers);
    this.swarmListStorageService.setSwarm(swarm);
    return swarm;
  }

  handleHitBee(swarm: any, index: number): any[] {
    const bee = swarm[index];
    const updatedBee = hitBee(bee);
    if (updatedBee.healthPoints <= 0) {
      if (updatedBee.type === "Queen") {
        alert("Game Over! 👑 The Queen is dead! The swarm has collapsed!");
        this.swarmListStorageService.removeSwarm();
        return [];
      }
      alert(`The ${bee.type} is dead!`);
      swarm.splice(index, 1);
    } else {
      swarm[index] = updatedBee;
    }
    this.swarmListStorageService.updateSwarm(swarm);
    return swarm;
  }
}
