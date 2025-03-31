import { UserService } from "./user.service";
import { UserInterface } from "../shared/interfaces";

describe("UserService", () => {
  let service: UserService;

  const localStorageMock = (() => {
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
    };
  })();

  beforeEach(() => {
    Object.defineProperty(global, "localStorage", {
      value: localStorageMock,
    });

    localStorage.clear();
    jest.clearAllMocks();

    service = new UserService();
  });

  it("should save user in localStorage", () => {
    const mockUser: UserInterface = { name: "Andrei" };

    service.setUserName(mockUser);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "user",
      JSON.stringify(mockUser),
    );
  });

  it("should get user from localStorage", () => {
    const mockUser: UserInterface = { name: "Daniel" };
    localStorage.getItem = jest.fn(() => JSON.stringify(mockUser));

    const result = service.getUserName();

    expect(localStorage.getItem).toHaveBeenCalledWith("user");
    expect(result).toEqual(mockUser);
  });

  it("should return null if no user in localStorage", () => {
    localStorage.getItem = jest.fn(() => null);

    const result = service.getUserName();

    expect(result).toBeNull();
  });

  it("should remove user from localStorage", () => {
    service.removeUserName();

    expect(localStorage.removeItem).toHaveBeenCalledWith("user");
  });
});
