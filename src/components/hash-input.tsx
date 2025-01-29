import { useState } from "react";

type HashInputProps = {
  onEnter: (hash: string) => void;
  visible?: boolean;
};

export function HashInput(props: HashInputProps) {
  const [hash, setHash] = useState("");

  return (
    props.visible && (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onEnter(hash);
        }}
      >
        <input
          placeholder="muratadamdir"
          onChange={(e) => setHash(e.target.value)}
        />
        <button>Tamam</button>
      </form>
    )
  );
}
