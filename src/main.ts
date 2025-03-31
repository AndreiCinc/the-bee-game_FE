import { swarmMembersNumber } from "./shared/model";
import { SwarmListStorageService } from "./services/swarm-list-storage.service";
import { getRandomSwarmIndex } from "./utils/swarm-utils";
import { SwarmService } from "./services/swarm.service";

const swarmService = new SwarmService(new SwarmListStorageService());
const swarmMembers = swarmService.initializeSwarm(swarmMembersNumber);
console.log(swarmMembers);
const randomSwarmIndex = getRandomSwarmIndex(swarmMembers.length);
const updatedBee = swarmService.handleHitBee(swarmMembers, randomSwarmIndex);
console.log(updatedBee);
