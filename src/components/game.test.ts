import { SwarmService } from "../services/swarm.service";
import { UserService } from "../services/user.service";
import { swarmMembersNumber } from "../shared/model";
import Game from "./game";

jest.mock("../services/swarm.service");
jest.mock("../services/user.service");

describe("Game", () => {
  let game: Game;
  let mockSwarmService: jest.Mocked<SwarmService>;
  let mockUserService: jest.Mocked<UserService>;

  beforeEach(() => {
    document.body.innerHTML = `<div id="app"></div>`;

    mockUserService = new UserService() as jest.Mocked<UserService>;
    mockUserService.getUserName.mockReturnValue({ name: "BuzzMaster" });

    mockSwarmService = new SwarmService() as jest.Mocked<SwarmService>;
    mockSwarmService.initializeSwarm.mockReturnValue([
      { type: "Worker", healthPoints: 75, maxHealth: 75 },
      { type: "Drone", healthPoints: 50, maxHealth: 50 },
    ]);
    mockSwarmService.handleHitBee.mockImplementation(
      (swarm: any, index: any) => swarm,
    );

    game = new Game(mockSwarmService, mockUserService);
  });

  it("should set player name from UserService", () => {
    expect(game.playerName).toBe("BuzzMaster");
  });

  it("should initialize swarm members on startGame", () => {
    expect(mockSwarmService.initializeSwarm).toHaveBeenCalledWith(
      swarmMembersNumber,
    );
    expect(game.swarmMembers.length).toBeGreaterThan(0);
  });

  it("should render swarm elements in DOM", () => {
    const beeGroups = document.querySelectorAll(".bee-group");
    expect(beeGroups.length).toBeGreaterThan(0);

    const bees = document.querySelectorAll(".bee");
    expect(bees.length).toBeGreaterThan(0);
    expect(bees[0].textContent).toMatch(/Worker|Drone/);
  });

  it("should log message when bee is hit", () => {
    const originalLogLength = document.querySelectorAll(".log p").length;

    game.hitRandomBee();

    const updatedLogLength = document.querySelectorAll(".log p").length;
    expect(updatedLogLength).toBeGreaterThan(originalLogLength);
  });
});
