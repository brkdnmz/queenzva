import CreateGame from "./pages/CreateGame";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Game from "./pages/Game";

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
