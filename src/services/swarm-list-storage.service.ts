import { SWARM_LIST } from "../shared/model";

export class SwarmListStorageService {
  constructor(private storage: Storage = localStorage) {}

  getSwarm() {
    const value = this.storage.getItem(SWARM_LIST);
    return value ? JSON.parse(value) : null;
  }

  setSwarm(value: any) {
    this.storage.setItem(SWARM_LIST, JSON.stringify(value));
  }

  updateSwarm(value: any) {
    const existingValue = this.storage.getItem(SWARM_LIST);
    if (existingValue) {
      const updatedValue = [...value];
      this.storage.setItem(SWARM_LIST, JSON.stringify(updatedValue));
    } else {
      this.storage.setItem(SWARM_LIST, JSON.stringify(value));
    }
  }

  removeSwarm() {
    this.storage.removeItem(SWARM_LIST);
  }
}
