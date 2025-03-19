import { useRef, useState } from "react";
import User from "../utils/user";

type NameTagProps = {
  changeable?: boolean;
};

function NameTag({ changeable = false }: NameTagProps) {
  const user = useRef(new User());
  const [name, setName] = useState(user.current.getUser().name);

  const updateName = (name: string) => {
    user.current.setName(name);
    setName(name);
  };

  return (
    <div className="flex flex-row items-center gap-2">
      {changeable && (
        <div className="relative flex items-center">
          <input
            type="text"
            value={name}
            onChange={(e) => updateName(e.target.value)}
            style={{ width: `${Math.max(name.length * 0.8, 4)}em` }}
            className="px-2 min-w-[4em] text-center border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      )}
      {!changeable && (
        <div className="text-md text-center">{name}</div>
      )}
    </div>
  );
}

export default NameTag;
