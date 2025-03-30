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
    const key = "testSwarm";
    const value = { a: 1 };

    service.setSwarm(key, value);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value),
    );
  });

  it("should get swarm value from storage", () => {
    const key = "testSwarm";
    const value = { b: 2 };
    localStorageMock.getItem = jest.fn((key: string) => JSON.stringify(value));

    const result = service.getSwarm(key);

    expect(localStorageMock.getItem).toHaveBeenCalledWith(key);
    expect(result).toEqual(value);
  });

  it("should return null if value does not exist", () => {
    const key = "missingSwarm";
    localStorageMock.getItem = jest.fn((key: string) => null);

    const result = service.getSwarm(key);

    expect(result).toBeNull();
  });

  it("should update swarm by merging existing value", () => {
    const key = "mergeSwarm";
    const existing = { a: 1, b: 2 };
    const update = { b: 3, c: 4 };
    const expected = { a: 1, b: 3, c: 4 };

    localStorageMock.getItem = jest.fn((key: string) =>
      JSON.stringify(existing),
    );

    service.updateSwarm(key, update);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(expected),
    );
  });

  it("should set swarm if key does not exist during update", () => {
    const key = "newSwarm";
    const value = { x: 123 };

    localStorageMock.getItem = jest.fn((key: string) => null);

    service.updateSwarm(key, value);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value),
    );
  });

  it("should remove swarm from storage", () => {
    const key = "removeSwarm";

    service.removeSwarm(key);

    expect(localStorageMock.removeItem).toHaveBeenCalledWith(key);
  });
});
