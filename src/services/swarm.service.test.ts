import { SwarmListStorageService } from "./swarm-list-storage.service";
import { createSwarm, hitBee } from "../utils/swarm-utils";
import { swarmMembersNumber } from "../shared/model";
import { SwarmService } from "./swarm.service";

jest.mock("../utils/swarm-utils", () => ({
  createSwarm: jest.fn(),
  hitBee: jest.fn(),
}));

describe("SwarmService", () => {
  let service: SwarmService;
  let mockStorageService: jest.Mocked<SwarmListStorageService>;

  beforeEach(() => {
    mockStorageService = {
      getSwarm: jest.fn(),
      setSwarm: jest.fn(),
      updateSwarm: jest.fn(),
    } as unknown as jest.Mocked<SwarmListStorageService>;

    service = new SwarmService(mockStorageService);

    jest.clearAllMocks();
  });

  describe("initializeSwarm", () => {
    it("should return existing swarm if it exists", () => {
      const existingSwarm = [{ type: "Queen", healthPoints: 100 }];
      mockStorageService.getSwarm.mockReturnValue(existingSwarm);

      const result = service.initializeSwarm();

      expect(mockStorageService.getSwarm).toHaveBeenCalled();
      expect(result).toBe(existingSwarm);
      expect(mockStorageService.setSwarm).not.toHaveBeenCalled();
    });

    it("should create and save swarm if none exists", () => {
      const mockNewSwarm = [{ type: "Worker", healthPoints: 75 }];
      (createSwarm as jest.Mock).mockReturnValue(mockNewSwarm);
      mockStorageService.getSwarm.mockReturnValue(null);

      const result = service.initializeSwarm();

      expect(createSwarm).toHaveBeenLastCalledWith(swarmMembersNumber);
      expect(mockStorageService.setSwarm).toHaveBeenLastCalledWith(
        mockNewSwarm,
      );
      expect(result).toBe(mockNewSwarm);
    });
  });

  describe("handleHitBee", () => {
    it("should remove bee if health drops to 0 or less", () => {
      const swarm = [{ type: "Drone", healthPoints: 10 }];
      const updatedBee = { type: "Drone", healthPoints: 0 };
      (hitBee as jest.Mock).mockReturnValue(updatedBee);

      const result = service.handleHitBee([...swarm], 0);

      expect(hitBee).toHaveBeenLastCalledWith(swarm[0]);
      expect(result).toEqual([]);
      expect(mockStorageService.updateSwarm).toHaveBeenLastCalledWith([]);
    });

    it("should update bee in swarm if health > 0", () => {
      const swarm = [{ type: "Worker", healthPoints: 75 }];
      const updatedBee = { type: "Worker", healthPoints: 50 };
      (hitBee as jest.Mock).mockReturnValue(updatedBee);

      const result = service.handleHitBee([...swarm], 0);

      expect(hitBee).toHaveBeenLastCalledWith(swarm[0]);
      expect(result).toEqual([updatedBee]);
      expect(mockStorageService.updateSwarm).toHaveBeenLastCalledWith([
        updatedBee,
      ]);
    });
  });
});
