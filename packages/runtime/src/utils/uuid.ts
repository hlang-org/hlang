import { v4, validate } from 'uuid';

class UUIDManager {
  uuidSet: Set<string>;

  constructor() {
    this.uuidSet = new Set;
  }

  create() {
    const uuid = v4();
    const result = this.validate(uuid);
    if (!result) {
      return this.create();
    }
    this.uuidSet.add(uuid);
    return uuid;
  }

  validate(value) {
    if (!validate(value)) {
      console.warn(`uuid ${value} is invalid.`);
      return false;
    }
    if (this.uuidSet.has(value)) {
      console.warn(`${value} exists.`);
      return false;
    }
    return true;
  }

  delete(value) {
    this.uuidSet.delete(value);
    return this.uuidSet;
  }
}

export default new UUIDManager();
