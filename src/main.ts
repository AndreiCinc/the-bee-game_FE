import { swarmMembersNumber } from "./shared/model";
import { SwarmListStorageService } from "./services/swarm-list-storage.service";
import { createSwarm } from "./utils/swarm-utils";

const swarmList = createSwarm(swarmMembersNumber);
const swarmListStorage = new SwarmListStorageService();
swarmListStorage.setSwarm("swarmList", swarmList);
console.log("Swarm List:", swarmListStorage.getSwarm("swarmList"));
swarmListStorage.setSwarm("userDetails", { name: "John Doe" });
console.log("User Details:", swarmListStorage.getSwarm("userDetails"));
