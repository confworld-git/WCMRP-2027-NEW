import { useEffect, useId, useRef, useState } from "react";
import toast from "react-hot-toast";
import "./Login.css";

const RADIUS = 150; // cursor influence radius (px)
const PUSH = 52; // how far nodes are shoved away at the cursor (px)

const seeded = (seed) => {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const r1 = (n) => Math.round(n * 10) / 10;

const InteractiveField = () => {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const glowRef = useRef(null);
  const meshRef = useRef(null);
  const midRef = useRef(null);
  const hotRef = useRef(null);
  const dotsRef = useRef(null);
  const dotsHotRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const mouse = { x: 0, y: 0, on: false };
    let gx = 0; // smoothed glow position
    let gy = 0;
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let n = 0;
    let hx, hy, x, y, vx, vy, ph, prox;
    let raf = 0;

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const spacing = w < 700 ? 44 : 58;
      cols = Math.ceil(w / spacing) + 3;
      rows = Math.ceil(h / spacing) + 3;
      n = cols * rows;

      hx = new Float32Array(n);
      hy = new Float32Array(n);
      x = new Float32Array(n);
      y = new Float32Array(n);
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      ph = new Float32Array(n);
      prox = new Float32Array(n);

      const rnd = seeded(7);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i;
          hx[k] = (i - 1) * spacing + (rnd() - 0.5) * spacing * 0.35;
          hy[k] = (j - 1) * spacing + (rnd() - 0.5) * spacing * 0.35;
          x[k] = hx[k];
          y[k] = hy[k];
          ph[k] = rnd() * Math.PI * 2;
        }
      }
      svgRef.current.setAttribute("viewBox", `0 0 ${w} ${h}`);
    };

    const draw = (t) => {
      const mx = mouse.x;
      const my = mouse.y;
      const on = mouse.on;

      // 1. physics
      for (let k = 0; k < n; k++) {
        let tx = hx[k];
        let ty = hy[k];
        if (!reduceMotion) {
          tx += Math.sin(t * 0.0007 + ph[k]) * 5;
          ty += Math.cos(t * 0.0006 + ph[k] * 1.3) * 5;
        }
        let p = 0;
        if (on) {
          const dx = tx - mx;
          const dy = ty - my;
          const d = Math.hypot(dx, dy);
          if (d < RADIUS) {
            p = 1 - d / RADIUS;
            const push = p * p * PUSH;
            const inv = d > 0.01 ? 1 / d : 0;
            tx += dx * inv * push;
            ty += dy * inv * push;
          }
        }
        prox[k] = p;
        vx[k] = (vx[k] + (tx - x[k]) * 0.1) * 0.8;
        vy[k] = (vy[k] + (ty - y[k]) * 0.1) * 0.8;
        x[k] += vx[k];
        y[k] += vy[k];
      }

      // 2. geometry
      let mesh = "";
      let mid = "";
      let hot = "";
      let dots = "";
      let dotsHot = "";

      const seg = (a, b) => {
        const p = (prox[a] + prox[b]) * 0.5;
        const s = `M${r1(x[a])} ${r1(y[a])}L${r1(x[b])} ${r1(y[b])}`;
        if (p > 0.45) hot += s;
        else if (p > 0.1) mid += s;
        else mesh += s;
      };

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i;
          const dot = `M${r1(x[k])} ${r1(y[k])}h.01`;
          if (prox[k] > 0.18) dotsHot += dot;
          else dots += dot;
          if (i < cols - 1) seg(k, k + 1);
          if (j < rows - 1) seg(k, k + cols);
        }
      }

      meshRef.current.setAttribute("d", mesh);
      midRef.current.setAttribute("d", mid);
      hotRef.current.setAttribute("d", hot);
      dotsRef.current.setAttribute("d", dots);
      dotsHotRef.current.setAttribute("d", dotsHot);

      // 3. soft glow that trails the cursor
      gx += (mx - gx) * 0.18;
      gy += (my - gy) * 0.18;
      const glow = glowRef.current;
      glow.setAttribute("cx", r1(gx));
      glow.setAttribute("cy", r1(gy));
      glow.style.opacity = on ? 1 : 0;
    };

    const loop = (t) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    build();
    if (reduceMotion) draw(0);
    else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      build();
      if (reduceMotion) draw(0);
    });
    ro.observe(wrap);

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      if (!mouse.on) {
        mouse.on = true;
        gx = mouse.x;
        gy = mouse.y;
      }
    };
    const onLeave = () => {
      mouse.on = false;
    };
    const onUp = (e) => {
      if (e.pointerType === "touch") mouse.on = false;
    };

    if (!reduceMotion) {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("blur", onLeave);
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="field" ref={wrapRef} aria-hidden="true">
      <svg ref={svgRef} preserveAspectRatio="none">
        <defs>
          <radialGradient id="field-glow-grad">
            <stop offset="0%" stopColor="#ffc857" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ffc857" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          className="field-glow"
          r={RADIUS * 1.7}
          fill="url(#field-glow-grad)"
        />
        <path ref={meshRef} className="field-mesh" />
        <path ref={midRef} className="field-mid" />
        <path ref={hotRef} className="field-hot" />
        <path ref={dotsRef} className="field-dots" />
        <path ref={dotsHotRef} className="field-dots-hot" />
      </svg>
    </div>
  );
};

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7.5 8 6 8-6" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4.5" y="10.5" width="15" height="9.5" rx="3" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </svg>
);

const EyeIcon = ({ off }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M4 4l16 16" />}
  </svg>
);

const Login = ({ onLogin }) => {
  const emailId = useId();
  const passwordId = useId();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Enter your email address and password to continue.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      toast.error("That email address isn't valid. Check it and try again.");
      return;
    }
    if (typeof onLogin !== "function") {
      toast.error("Sign in is not configured yet.");
      return;
    }

    setLoading(true);
    try {
      await toast.promise(
        onLogin({ email: email.trim(), password, remember }),
        {
          loading: "Signing in...",
          success: "Signed in successfully.",
          error: (err) =>
            err?.message || "Sign in failed. Check your details and try again.",
        },
      );
    } catch (err) {
      console.error("Sign in failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login">
      <InteractiveField />
      <section className="login-hero">
        <h1>Welcome <br/> back</h1>
        <p>Sign in to manage content and settings</p>
      </section>

      <section className="login-card" aria-labelledby="login-title">
        <h2 id="login-title">Welcome back</h2>
        <p className="login-card__sub">Sign in to your admin account.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form_field">
            <label htmlFor={emailId}>Email address</label>
            <div className="input_wrap">
              <span className="input_icon"><MailIcon /></span>
              <input
                id={emailId}
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form_field">
            <label htmlFor={passwordId}>Password</label>
            <div className="input_wrap">
              <span className="input_icon"><LockIcon /></span>
              <input
                id={passwordId}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="pw_toggle"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                <EyeIcon off={showPassword} />
              </button>
            </div>
          </div>

          <div className="form_row">
            <label className="check">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Keep me signed in</span>
            </label>
          </div>

          <button type="submit" className="log_btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
