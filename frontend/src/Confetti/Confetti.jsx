import { useMemo } from "react";
import "./Confetti.css";

const COLORS = [
  "#ff6b6b",
  "#ffd93d",
  "#6bc5ff",
  "#4dd599",
  "#ff9ff3",
  "#a29bfe",
  "#ff8c42",
  "#00d2d3",
];
const EMOJIS = ["✨", "🪷", "💥", "💐", "🌷", "🌹"];

const createRandom = (seed) => {
  let state = 2166136261;
  for (const ch of String(seed)) {
    state = Math.imul(state ^ ch.charCodeAt(0), 16777619);
  }
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 0x100000000;
  };
};

const generatePieces = (seed, count) =>
  Array.from({ length: count }, (_, i) => {
    const r = createRandom(`piece-${seed}-${i}`);
    const isEmoji = r() > 0.92;
    return {
      id: `piece-${seed}-${i}`,
      isEmoji,
      emoji: EMOJIS[Math.floor(r() * EMOJIS.length)],
      // color: COLORS[Math.floor(r() * COLORS.length)],
      startX: r() * 100, // % across the stage
      sway1: r() * 80 - 40,
      sway2: r() * 80 - 40,
      drift: r() * 120 - 60,
      rotMid: r() * 360 - 180,
      rotEnd: r() * 1080 - 540,
      flipDur: 0.5 + r() * 0.8,
      delay: r() * 2.5, // spreads pieces out so it "rains"
      duration: 3.5 + r() * 3,
      size: isEmoji ? 16 + r() * 10 : 6 + r() * 8,
      shape: r() > 0.6 ? "50%" : r() > 0.5 ? "2px" : "0",
    };
  });

const generateStreamers = (seed, count) =>
  Array.from({ length: count }, (_, i) => {
    const r = createRandom(`stream-${seed}-${i}`);
    return {
      id: `stream-${seed}-${i}`,
      color: COLORS[Math.floor(r() * COLORS.length)],
      startX: r() * 100,
      sway: r() * 100 - 50,
      rotEnd: r() * 400 - 200,
      delay: r() * 2.5,
      duration: 4 + r() * 2.5,
    };
  });

/**
 * Confetti rain. Parent must be position: relative.
 * @param {boolean} active
 * @param {number|string} burstKey - change to trigger a new shower
 * @param {number} count - number of confetti pieces
 */
const Confetti = ({ active, burstKey = 0, count = 120 }) => {
  const data = useMemo(() => {
    if (!active) return null;
    return {
      pieces: generatePieces(burstKey, count),
      streamers: generateStreamers(burstKey, 14),
    };
  }, [active, burstKey, count]);

  if (!active || !data) return null;

  return (
    <div className="confetti-stage" key={burstKey}>
      {data.pieces.map((p) => {
        const style = {
          left: `${p.startX}%`,
          "--sway1": `${p.sway1}px`,
          "--sway2": `${p.sway2}px`,
          "--drift": `${p.drift}px`,
          "--rotMid": `${p.rotMid}deg`,
          "--rotEnd": `${p.rotEnd}deg`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
        };
        return p.isEmoji ? (
          <span
            key={p.id}
            className="confetti-piece"
            style={{ ...style, fontSize: `${p.size}px` }}
          >
            {p.emoji}
          </span>
        ) : (
          <span key={p.id} className="confetti-piece" style={style}>
            <span
              className="confetti-flutter"
              style={{
                animationDuration: `${p.flipDur}s`,
                backgroundColor: p.color,
                width: `${p.size}px`,
                height: `${p.size}px`,
                borderRadius: p.shape,
              }}
            />
          </span>
        );
      })}

      {data.streamers.map((s) => (
        <span
          key={s.id}
          className="confetti-streamer"
          style={{
            left: `${s.startX}%`,
            background: s.color,
            "--sway": `${s.sway}px`,
            "--rotEnd": `${s.rotEnd}deg`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
