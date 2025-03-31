import { BeeEnum } from "../shared/enums";
import { membersHp, swarmMembersDamage } from "../shared/model";

export function createSwarm(swarmMembers: any): any {
  return Object.entries(swarmMembers).flatMap(([memberType, numberOfMembers]) =>
    Array.from(Array(numberOfMembers), (_, i) => ({
      type: memberType,
      healthPoints: membersHp[memberType as BeeEnum],
    })),
  );
}

export function getRandomSwarmIndex(swarmlength: number): number {
  return Math.floor(Math.random() * swarmlength);
}

export function hitBee(bee: any): any {
  return {
    ...bee,
    healthPoints: bee.healthPoints - swarmMembersDamage[bee.type as BeeEnum],
  };
}
