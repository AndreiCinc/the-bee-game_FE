import { UserInterface } from "../shared/interfaces";

export class UserService {
  constructor(private storage: Storage = localStorage) {}

  setUserName(user: UserInterface) {
    this.storage.setItem("user", JSON.stringify(user));
  }
  getUserName() {
    const user = this.storage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
  removeUserName() {
    this.storage.removeItem("user");
  }
}
