import { SWARM_LIST } from "../shared/model";
import { SwarmListStorageService } from "./swarm-list-storage.service";

describe("SwarmListStorageService", () => {
  let service: SwarmListStorageService;

  const mockStorage = () => {
    let store: Record<string, string> = {};

    return {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      }),
      key: jest.fn(),
      length: 0,
    };
  };

  let localStorageMock: ReturnType<typeof mockStorage>;

  beforeEach(() => {
    localStorageMock = mockStorage();
    service = new SwarmListStorageService(localStorageMock);
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it("should set swarm value in storage", () => {
    const value = { a: 1 };

    service.setSwarm(value);

    expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
      SWARM_LIST,
      JSON.stringify(value),
    );
  });

  it("should get swarm value from storage", () => {
    const value = { b: 2 };
    localStorageMock.getItem = jest.fn((key: string) => JSON.stringify(value));

    const result = service.getSwarm();

    expect(localStorageMock.getItem).toHaveBeenLastCalledWith(SWARM_LIST);
    expect(result).toEqual(value);
  });

  it("should return null if value does not exist", () => {
    localStorageMock.getItem = jest.fn((key: string) => null);

    const result = service.getSwarm();

    expect(result).toBeNull();
  });

  it("should update swarm by merging existing value", () => {
    const existing = { a: 1, b: 2 };
    const update = [{ b: 3, c: 4 }];

    localStorageMock.getItem = jest.fn((key: string) =>
      JSON.stringify(existing),
    );

    service.updateSwarm(update);

    expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
      SWARM_LIST,
      JSON.stringify(update),
    );
  });

  it("should set swarm if key does not exist during update", () => {
    const value = { x: 123 };

    localStorageMock.getItem = jest.fn((key: string) => null);

    service.updateSwarm(value);

    expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
      SWARM_LIST,
      JSON.stringify(value),
    );
  });

  it("should remove swarm from storage", () => {
    service.removeSwarm();

    expect(localStorageMock.removeItem).toHaveBeenLastCalledWith(SWARM_LIST);
  });
});
