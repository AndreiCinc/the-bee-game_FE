import { BeeEnum } from "../shared/enums";
import { membersHp } from "../shared/model";

export function createSwarm(swarmMembers: any): any {
  return Object.entries(swarmMembers).flatMap(([memberType, numberOfMembers]) =>
    Array.from(Array(numberOfMembers), (_, i) => ({
      type: memberType,
      healthPoints: membersHp[memberType as BeeEnum],
    })),
  );
}
