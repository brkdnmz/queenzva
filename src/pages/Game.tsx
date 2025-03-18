import clsx from "clsx";
import {
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import Rand from "rand-seed";
import { useEffect, useState } from "react";
import {
  M,
  N,
  precalculateValidQueensPositions,
  prepareQueensBoard,
} from "../board-util";
import { InzvaQueen } from "../inzva-queen";
import { random } from "../random";
import { useParams } from "react-router-dom";
import User from "../utils/user";
import { StatsEntry } from "../types/user";
import { v4 as uuidv4 } from 'uuid';

precalculateValidQueensPositions();

function isInDanger(
  row: number,
  col: number,
  queenInserted: Record<number, string>
) {
  const sameRowCol = Object.entries(queenInserted).some(([key, value]) => {
    const i = Math.floor(+key / N);
    const j = +key % M;
    return (
      value === "q" && (i === row || j === col) && !(i === row && j === col)
    );
  });
  // queen in one in 8 neighbors
  // copilot ate it copilot is so hungry
  const neighbor = Object.entries(queenInserted).some(([key, value]) => {
    const i = Math.floor(+key / N);
    const j = +key % M;
    return value === "q" && Math.abs(i - row) === 1 && Math.abs(j - col) === 1;
  });
  return sameRowCol || neighbor;
}

function hasWon(board: string[][], queenInserted: Record<string, string>) {
  const queenCnt: Record<string, number> = {};
  let filledCnt = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (queenInserted[N * i + j] === "q") {
        if (isInDanger(i, j, queenInserted)) return false;
        queenCnt[board[i][j]] ??= 0;
        if (queenCnt[board[i][j]]++ > 0) return false;
        filledCnt++;
      }
    }
  }

  return filledCnt === N;
}

function Game() {
  const { hash } = useParams();
  const user = new User();
  const [stats, setStats] = useState<StatsEntry | null>(null);
  const [statsSaved, setStatsSaved] = useState(false);
  const [statsBestTime, setStatsBestTime] = useState(false);

  const [board, setBoard] = useState<string[][]>();
  const [queenInserted, setQueenInserted] = useState<Record<string, string>>(
    {}
  );
  const [startTime, setStartTime] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prepared, setPrepared] = useState(false);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState("");
  const won = hasWon(board!, queenInserted);

  // Handle game completion
  useEffect(() => {
    if (won && stats && !statsSaved) {
      const updatedStats = {
        ...stats,
        duration: differenceInMilliseconds(currentTime, startTime),
        moves: Object.keys(queenInserted).length,
        completed: true
      };

      const bestTime = user.checkBestTime(updatedStats);
      if (bestTime) {
        setStatsBestTime(true);
      }

      user.addStats(updatedStats);
      setStatsSaved(true);
    }
  }, [won, stats, statsSaved, currentTime, startTime, queenInserted]);

  // Handle timer
  useEffect(() => {
    if (won) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [won]);

  if (won) {
    console.log("You win!");
  }

  const onClear = () => {
    setQueenInserted({});
  };

  // Check if the hash is valid
  const isValidHash = (hash: string | undefined) => {
    return typeof hash === "string" && hash.length > 0;
  };

  // Get the hash from the url and prepare the board
  const prepareGameBoard = () => {
    if (!hash) return;
    random.generator = new Rand(hash);
    setBoard(prepareQueensBoard());
    setPrepared(true);
    setStartTime(new Date());
  };

  useEffect(() => {
    if (!isValidHash(hash)) {
      setError("Hatalı kod");
      return;
    }

    prepareGameBoard();
  }, [hash]);

  return (
    <div className="flex justify-center items-center h-screen font-mono flex-col gap-2">  
      {error && (
        <div className="text-red-500 text-2xl">{error}</div>
      )}

      {!prepared && !error && (
        <div className="text-2xl">Loading...</div>
      )}


      {prepared && !started && !error && (
        <button
          onClick={() => {
            setStarted(true);
            setStartTime(new Date());
            setStats({
              hash: hash!,
              duration: 0,
              moves: 0,
              completed: false,
              startTime: startTime,
              id: uuidv4(),
            });
          }}
          className="text-xl bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          Başlat
        </button>
      )}

      {started && !error && (
        <>
          <button
            onClick={onClear}
            className="text-xl bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          >
            Temizle
          </button>
          <div className="text-4xl">
            {differenceInMinutes(currentTime, startTime)
              .toString()
              .padStart(2, "0")}
            :
            {(differenceInSeconds(currentTime, startTime) % 60)
              .toString()
              .padStart(2, "0")}
            {won
              ? (
                  "." +
                  (differenceInMilliseconds(currentTime, startTime) % 1000)
                )
                  .toString()
                  .padStart(3, "0")
              : null}
          </div>
          {won && <InzvaQueen won={false} />}
          {statsBestTime && (
            <div className="text-green-800 text-2xl">
              Yeni en iyi süre!
            </div>
          )}
          <div
            className={`inline-grid ${N === 8 ? "grid-cols-8" : "grid-cols-9"}`}
          >
            {board!.map((row, i) => (
              <div
                key={i}
                className="grid"
              >
                {row.map((cellColor, j) => (
                  <div
                    key={j}
                    className={clsx(
                      "flex select-none justify-center items-center h-12 w-12 text-2xl cursor-pointer border border-black p-3"
                    )}
                    style={{
                      background:
                        !won || queenInserted[N * i + j] !== "q"
                          ? cellColor
                          : "gold",
                    }}
                    onClick={() =>
                      setQueenInserted((prev) => ({
                        ...prev,
                        [N * i + j]:
                          (prev[N * i + j] || "") === ""
                            ? "x"
                            : prev[N * i + j] === "x"
                            ? "q"
                            : "",
                      }))
                    }
                  >
                    {queenInserted[N * i + j] === "q" ? (
                      <InzvaQueen won={won} />
                    ) : isInDanger(i, j, queenInserted) ? (
                      "x"
                    ) : (
                      queenInserted[N * i + j]
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Game;
