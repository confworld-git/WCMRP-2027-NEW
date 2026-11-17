import { useMemo } from "react";
import "./Fireworks.css";

const COLORS = [
  "#f0198c", // pink
  "#0a7cf0", // blue
  "#ffd93d", // yellow
  "#4dd599", // green
  "#ff6b6b", // red
  "#a29bfe", // purple
  "#ff8c42", // orange
  "#00d2d3", // cyan
  "#ff9ff3", // light pink
  "#6bc5ff", // sky blue
  "#c6ff4d", // lime
];

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

const TYPES = {
  rays: { n: 14, len: 9, w: 2, radius: [42, 60] }, // dashed ring
  dots: { n: 16, len: 4, w: 4, radius: [38, 56] }, // dotted ring
  star: { n: 10, len: 7, w: 2, radius: [14, 22] }, // small dense starburst
};
const TYPE_KEYS = Object.keys(TYPES);

const generateFireworks = (seed, count) =>
  Array.from({ length: count }, (_, i) => {
    const r = createRandom(`fw-${seed}-${i}`);
    const type = TYPE_KEYS[Math.floor(r() * TYPE_KEYS.length)];
    const t = TYPES[type];
    const cycle = 2.8 + r() * 2.2; // seconds per loop
    const y = 12 + r() * 45; // burst height, % from top
    return {
      id: `fw-${seed}-${i}`,
      color: COLORS[Math.floor(r() * COLORS.length)],
      x: 8 + r() * 84,
      y,
      rise: 100 - y,
      tilt: r() * 30 - 15,
      cycle,
      delay: r() * cycle, // staggers launches so they don't all fire together
      radius: t.radius[0] + r() * (t.radius[1] - t.radius[0]),
      type,
      rays: Array.from({ length: t.n }, (_, k) => (360 / t.n) * k),
      len: t.len,
      w: t.w,
    };
  });

/**
 * Fireworks: line shoots up, then booms. Loops forever.
 * Parent must be position: relative.
 */
const Fireworks = ({ active, burstKey = 0, count = 18 }) => {
  const data = useMemo(
    () => (active ? generateFireworks(burstKey, count) : null),
    [active, burstKey, count]
  );

  if (!active || !data) return null;

  return (
    <div className="fw-stage" key={burstKey}>
      {data.map((f) => (
        <div
          key={f.id}
          className="fw"
          style={{
            "--x": `${f.x}%`,
            "--y": `${f.y}%`,
            "--c": f.color,
            "--rise": f.rise,
            "--tilt": `${f.tilt}deg`,
            "--cycle": `${f.cycle}s`,
            "--delay": `${f.delay}s`,
            "--radius": `${f.radius}px`,
            "--len": `${f.len}px`,
            "--w": `${f.w}px`,
          }}
        >
          <span className="fw-rocket" />
          <div className="fw-burst">
            {f.rays.map((a) => (
              <span
                key={a}
                className={`fw-ray${f.type === "dots" ? " fw-ray--dot" : ""}`}
                style={{ "--a": `${a}deg` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Fireworks;