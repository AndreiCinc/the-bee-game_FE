import { BeeEnum } from "./enums";
import { SwarmMembersType } from "./interfaces";

export const swarmMembersNumber: SwarmMembersType = {
  [BeeEnum.Queen]: 1,
  [BeeEnum.Worker]: 5,
  [BeeEnum.Drone]: 8,
};

export const membersHp: SwarmMembersType = {
  [BeeEnum.Queen]: 100,
  [BeeEnum.Worker]: 75,
  [BeeEnum.Drone]: 50,
};

export const swarmMembersDamage: SwarmMembersType = {
  [BeeEnum.Queen]: 8,
  [BeeEnum.Worker]: 10,
  [BeeEnum.Drone]: 12,
};

export const SWARM_LIST = "swarmList";
