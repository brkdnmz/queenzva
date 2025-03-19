import { StatsEntry, User as UserType } from "../types/user";
import Storage from "./storage";
import { v4 as uuidv4 } from 'uuid';

const USER_KEY = "queenzva-user";

// Class for user operations
class User {
  private user: UserType;
  private storage: Storage;

  constructor() {
    this.storage = new Storage();
    // Get user from localStorage
    if (!this.storage.checkItem(USER_KEY)) {
      this.user = {
        id: uuidv4(),
        name: "oyuncu",
        stats: [],
      };
      this.storage.setItem(USER_KEY, JSON.stringify(this.user));
    }
    this.user = this.storage.getItem(USER_KEY) as UserType;
  }

  // Getters
  getUser(): UserType {
    return this.user;
  }

  getName(): string {
    return this.user.name;
  }

  getStats(): StatsEntry[] {
    return this.user.stats;
  }

  // Setters
  setUser(user: UserType) {
    this.user = user;
    this.storage.setItem(USER_KEY, JSON.stringify(this.user));
  }

  setName(name: string) {
    this.user.name = name;
    this.storage.setItem(USER_KEY, JSON.stringify(this.user));
  }

  // Functions
  addStats(stats: StatsEntry) {
    // Check if the stats already exists
    if (this.user.stats.find((stat) => stat.id === stats.id)) {
      return;
    }
    this.user.stats.push(stats);
    this.storage.setItem(USER_KEY, JSON.stringify(this.user));
  }

  getStatsByHash(hash: string): StatsEntry | undefined {
    return this.user.stats.find((stat) => stat.hash === hash);
  }

  getBestTime() {
    if (this.user.stats.length === 0) return null;
    const completed = this.user.stats.filter((stat) => stat.completed);
    if (completed.length === 0) return null;
    return completed.reduce((best, current) => {
      return current.duration < best.duration ? current : best;
    }, completed[0]);
  }
  
  checkBestTime(stats: StatsEntry) {
    const bestTime = this.getBestTime();
    console.log(bestTime);
    if (!bestTime) return true;
    console.log(stats.duration, bestTime.duration);
    return stats.duration < bestTime.duration;
  }
}

export default User;