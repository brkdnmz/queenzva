import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashInput } from "../components/hash-input";

function CreateGame() {
  const navigate = useNavigate();
  const [directing, setDirecting] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen font-mono flex-col gap-2">
      <HashInput
        visible={!directing}
        onEnter={(hash) => {
          setDirecting(true);

          // Direct to the game page
          navigate(`/g/${hash}`);
        }}
      />
    </div>
  );
}

export default CreateGame;
