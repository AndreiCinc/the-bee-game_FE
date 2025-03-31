import { SwarmListStorageService } from "./swarm-list-storage.service";
import { createSwarm, hitBee } from "./../utils/swarm-utils";
import { SwarmMembersType } from "../shared/interfaces";
import { swarmMembersNumber } from "../shared/model";

export class SwarmService {
  constructor(private swarmListStorageService: SwarmListStorageService) {}

  initializeSwarm(swarmMembers: SwarmMembersType = swarmMembersNumber): any {
    const existingSwarm = this.swarmListStorageService.getSwarm();
    if (existingSwarm?.length) {
      return existingSwarm;
    }
    // If no swarm exists, create a new one and store it
    const swarm = createSwarm(swarmMembers);
    this.swarmListStorageService.setSwarm(swarm);
    return swarm;
  }

  handleHitBee(swarm: any, index: number): any {
    const bee = swarm[index];
    const updatedBee = hitBee(bee);
    if (updatedBee.healthPoints <= 0) {
      swarm.splice(index, 1);
    } else {
      swarm[index] = updatedBee;
    }
    this.swarmListStorageService.updateSwarm(swarm);
    return swarm;
  }
}
