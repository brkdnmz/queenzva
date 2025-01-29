export function InzvaQueen({ won }: { won: boolean }) {
  return (
    <div className={!won ? "" : "rounded-full overflow-hidden bg-[gold]"}>
      <img
        src="https://avatars.githubusercontent.com/u/26366279?s=280&v=4"
        style={{
          filter: !won ? "" : "",
          // : "brightness(0) saturate(100%) invert(53%) sepia(61%) saturate(1275%) hue-rotate(22deg) brightness(107%) contrast(101%)",
        }}
      />
    </div>
  );
}
