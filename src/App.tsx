import { useState } from "react";
import {
  precalculateValidQueensPositions,
  prepareQueensBoard,
} from "./board-util";

precalculateValidQueensPositions();

function App() {
  const [board] = useState(() => prepareQueensBoard());

  return (
    <>
      <div className="inline-grid grid-cols-8">
        {board.map((row, i) => (
          <div key={i}>
            {row.map((cellColor, j) => (
              <div
                key={j}
                className="flex justify-center items-center h-16 w-16 text-2xl cursor-pointer border border-black"
                style={{ background: cellColor }}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
