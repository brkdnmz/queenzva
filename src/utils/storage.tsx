// Class for LocalStorage operations
class Storage {
  private storage;

  constructor() {
    this.storage = window.localStorage;
  }

  setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }
  
  getItem(key: string): Record<string, any> | null {
    const item = this.storage.getItem(key);
    if (!item) return null;
    return JSON.parse(item);
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }

  checkItem(key: string) {
    return this.storage.getItem(key) !== null;
  }
}

export default Storage;
