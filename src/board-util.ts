import { random } from "./random";
import { QueenPositions } from "./types";
import { shuffle } from "./util";

export const N = 8;
export const M = 8;

const COLORS = [
  "#fbb392",
  "#809884",
  "#e5d185",
  "#f193a4",
  "#d99ffb",
  "#94e1bb",
  "#97bafe",
  "#ffcdd8",
  "#f1f1f1",
];

export const VALID_QUEENS_POSITIONS: QueenPositions[] = [];

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
  const queens =
    VALID_QUEENS_POSITIONS[
      Math.floor(random.next() * VALID_QUEENS_POSITIONS.length)
    ];

  console.log(Date.now());

  let foundBoard: string[][] = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => "")
  );

  // eslint-disable-next-line no-constant-condition
  while (1) {
    const colors = shuffle([...COLORS]);
    const board = Array.from({ length: N }, () =>
      Array.from({ length: M }, () => "")
    );

    let cnt = N * M;
    for (let i = 0; i < queens.length; i++) {
      const { x, y } = queens[i];
      board[x][y] = colors[i];
      cnt--;
      // while (1) {
      // color a random neighbor also
      const dx = [-1, 0, 1, 0];
      const dy = [0, -1, 0, 1];
      const dir = Math.floor(random.next() * 4);
      const nrow = x + dx[dir];
      const ncol = y + dy[dir];
      if (nrow < 0 || nrow >= N || ncol < 0 || ncol >= M) {
        continue;
      }
      if (!board[nrow][ncol]) {
        board[nrow][ncol] = colors[i];
        cnt--;
        // break;
      }
      // }
    }

    const dx = [-1, 0, 1, 0];
    const dy = [0, -1, 0, 1];

    while (cnt) {
      const row = Math.floor(random.next() * N);
      const col = Math.floor(random.next() * M);

      if (!board[row][col]) {
        continue;
      }

      const dir = Math.floor(random.next() * 4);

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

    let solutionCount = 0;
    for (const otherQueens of VALID_QUEENS_POSITIONS) {
      const colorsOccupied = new Set();
      let ok = true;
      for (const queen of otherQueens) {
        if (colorsOccupied.has(board[queen.x][queen.y])) {
          ok = false;
          break;
        }
        colorsOccupied.add(board[queen.x][queen.y]);
      }
      solutionCount += +ok;
      // if (solutionCount > 1) {
      //   console.log(solutionCount);
      // }

      if (solutionCount > 1) break;
    }

    // console.log(solutionCount);
    if (solutionCount !== 1) continue;

    console.log(solutionCount);
    console.log(Date.now());

    foundBoard = board;
    break;
  }

  return foundBoard;
}
