import { QueenPositions } from "./types";
import { shuffle } from "./util";

const N = 8;
const M = 8;

const COLORS = [
  "gray",
  "white",
  "yellow",
  "red",
  "blue",
  "green",
  "purple",
  "orange",
];

const VALID_QUEENS_POSITIONS: QueenPositions[] = [];

export function precalculateValidQueensPositions() {
  const queens: QueenPositions = [];
  const colsTaken = new Set<number>();

  const helper = (row: number) => {
    if (row === N) {
      VALID_QUEENS_POSITIONS.push([...queens]);
      return;
    }

    for (let col = 0; col < M; col++) {
      const lastQueen = queens[queens.length - 1];
      const valid =
        !row ||
        (!colsTaken.has(col) &&
          ![lastQueen.y - 1, lastQueen.y, lastQueen.y + 1].includes(col));
      if (valid) {
        queens.push({ x: row, y: col });
        colsTaken.add(col);
        helper(row + 1);
        queens.pop();
        colsTaken.delete(col);
      }
    }
  };

  helper(0);

  return VALID_QUEENS_POSITIONS;
}

export function prepareQueensBoard() {
  const board = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => "")
  );

  const queens =
    VALID_QUEENS_POSITIONS[
      Math.floor(Math.random() * VALID_QUEENS_POSITIONS.length)
    ];
  const colors = shuffle([...COLORS]);

  let cnt = N * M;
  for (let i = 0; i < queens.length; i++) {
    const { x, y } = queens[i];
    board[x][y] = colors[i];
    cnt--;
  }

  const dx = [-1, 0, 1, 0];
  const dy = [0, -1, 0, 1];

  while (cnt) {
    const row = Math.floor(Math.random() * N);
    const col = Math.floor(Math.random() * M);

    if (!board[row][col]) {
      continue;
    }

    const dir = Math.floor(Math.random() * 4);

    const nrow = row + dx[dir];
    const ncol = col + dy[dir];

    if (nrow < 0 || nrow >= N || ncol < 0 || ncol >= M) {
      continue;
    }

    if (!board[nrow][ncol]) {
      board[nrow][ncol] = board[row][col];
      cnt--;
    }
  }

  return board;
}
