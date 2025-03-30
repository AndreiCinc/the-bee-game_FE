import { BeeEnum } from "../shared/enums";
import { membersHp } from "../shared/model";
import { createSwarmRecursive } from "./swarm-utils";

describe("createSwarmRecursive", () => {
  it("should generate correct swarm based on input object", () => {
    const input = {
      [BeeEnum.Queen]: 1,
      [BeeEnum.Worker]: 2,
      [BeeEnum.Drone]: 3,
    };

    const result = createSwarmRecursive(input);

    expect(result).toHaveLength(6);
    const queens = result.filter(
      (member: { type: BeeEnum }) => member.type === BeeEnum.Queen,
    );
    expect(queens).toHaveLength(1);
    expect(queens[0].healthPoints).toBe(membersHp.Queen);
    const workers = result.filter(
      (member: { type: BeeEnum }) => member.type === BeeEnum.Worker,
    );
    expect(workers).toHaveLength(2);
    expect(
      workers.every(
        (w: { healthPoints: any }) => w.healthPoints === membersHp.Worker,
      ),
    ).toBe(true);
    const drones = result.filter(
      (member: { type: BeeEnum }) => member.type === BeeEnum.Drone,
    );
    expect(drones).toHaveLength(3);
    expect(
      drones.every(
        (d: { healthPoints: any }) => d.healthPoints === membersHp.Drone,
      ),
    ).toBe(true);
  });

  it("should return empty array if input is empty", () => {
    const result = createSwarmRecursive({});
    expect(result).toEqual([]);
  });
});
