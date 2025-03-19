import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashInput } from "../components/hash-input";
import NameTag from "../components/name-tag";
import { SpecialThanks } from "../components/special-thanks";

function CreateGame() {
  const navigate = useNavigate();
  const [directing, setDirecting] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div>
        <SpecialThanks />
      </div>

      <div className="flex justify-center items-center h-screen font-mono flex-col gap-2">
        {!directing && (
          <>
            <div className="flex flex-row gap-2 mb-4">
              <NameTag changeable={true} />
            </div>
            <div className="flex flex-row gap-2 mb-12">
              <button onClick={() => navigate("/stats")}>
                <div className="text-sm">İstatistikler</div>
              </button>
            </div>
          </>
        )}
        <HashInput
          visible={!directing}
          onEnter={(hash) => {
            setDirecting(true);

            // Direct to the game page
            navigate(`/g/${hash}`);
          }}
        />
      </div>
    </div>
  );
}

export default CreateGame;
