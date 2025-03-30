import { BeeEnum } from "./enums";

export const swarmMembersNumber = {
  [BeeEnum.Queen]: 1,
  [BeeEnum.Worker]: 5,
  [BeeEnum.Drone]: 8,
};

export const membersHp = {
  [BeeEnum.Queen]: 100,
  [BeeEnum.Worker]: 75,
  [BeeEnum.Drone]: 50,
};
