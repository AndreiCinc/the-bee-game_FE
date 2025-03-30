export class SwarmListStorageService {
  constructor(private storage: Storage = localStorage) {}

  getSwarm(key: string) {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  setSwarm(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  updateSwarm(key: string, value: any) {
    const existingValue = this.storage.getItem(key);
    if (existingValue) {
      const updatedValue = { ...JSON.parse(existingValue), ...value };
      this.storage.setItem(key, JSON.stringify(updatedValue));
    } else {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }

  removeSwarm(key: string) {
    this.storage.removeItem(key);
  }
}
