type StatsEntry = {
  id: string;
  hash: string;
  startTime: Date;
  duration: number;
  completed: boolean;
  moves: number;
};

type User = {
  id: string;
  name: string;
  stats: StatsEntry[];
};

export type { StatsEntry, User };