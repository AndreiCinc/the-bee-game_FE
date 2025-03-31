import { BeeEnum } from "../shared/enums";
import { BeeType } from "../shared/interfaces";
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

export function groupSwarm(swarm: any): Record<string, any[]> {
  return swarm.reduce((acc: Record<string, any[]>, bee: any) => {
    const key = bee.type as BeeType;
    if (!acc[key]) acc[key] = [];
    acc[key].push(bee);
    return acc;
  }, {});
}
