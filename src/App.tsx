import CreateGame from "./pages/create-game";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Game from "./pages/game";

function App() {
  return (
    <div className="w-screen h-screen">
      <BrowserRouter basename="/queenzva">
        <Routes>
          <Route path="/" element={<CreateGame />} />
          <Route path="/g/:hash" element={<Game />} />
          <Route path="/g/" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
