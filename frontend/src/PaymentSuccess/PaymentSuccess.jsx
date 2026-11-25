import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

const COLORS = ["#ffd84d", "#ff6b5a", "#7df0c0", "#ffffff", "#b8f5d6"];

export default function PaymentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const receipt = state?.receipt;
  const hasReceipt = Boolean(
    receipt &&
    typeof receipt.orderId === "string" &&
    typeof receipt.paymentId === "string" &&
    Number.isSafeInteger(receipt.amount) &&
    receipt.amount > 0 &&
    typeof receipt.currency === "string" &&
    typeof receipt.registration?.title === "string" &&
    typeof receipt.registration?.firstName === "string" &&
    typeof receipt.registration?.lastName === "string" &&
    typeof receipt.paidAt === "string",
  );
  const amount = hasReceipt ? receipt.amount : 0;
  const [shown, setShown] = useState(0);
  const canvasRef = useRef(null);
  const badgeRef = useRef(null);

  const money = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: hasReceipt ? receipt.currency : "USD",
        minimumFractionDigits: 2,
      }),
    [hasReceipt, receipt?.currency],
  );

  const paidAt = hasReceipt ? new Date(receipt.paidAt) : null;
  const date =
    paidAt && !Number.isNaN(paidAt.getTime())
      ? paidAt.toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      : "Unavailable";

  useEffect(() => {
    if (!hasReceipt) return;

    // if (typeof window !== "undefined") {
    //   window.dataLayer = window.dataLayer || [];
    //   window.dataLayer.push({
    //     event: "Registration",
    //     conference_name: "WCMRP-2027",
    //     ecommerce: {
    //       transaction_id: receipt.orderId,
    //       value: Number(receipt.amount) / 100,
    //       currency: receipt.currency || "USD",
    //     },
    //   });
    // }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let parts = [];
    let raf = 0;
    let countRaf = 0;
    const timers = [];

    const resize = () => {
      const d = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * d;
      canvas.height = window.innerHeight * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      parts = parts.filter((p) => p.life > 0 && p.y < window.innerHeight + 40);
      parts.forEach((p) => {
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 + 0.28;
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        p.life -= 0.0065;
        ctx.save();
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        if (p.round) {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      });
      raf = parts.length ? requestAnimationFrame(tick) : 0;
      if (!raf) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const burst = () => {
      if (reduce || !badgeRef.current) return;
      const b = badgeRef.current.getBoundingClientRect();
      const cx = b.left + b.width / 2;
      const cy = b.top + b.height / 2;
      for (let i = 0; i < 130; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = 4 + Math.random() * 10;
        parts.push({
          x: cx,
          y: cy,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v - 4,
          w: 5 + Math.random() * 7,
          h: 3 + Math.random() * 6,
          r: Math.random() * 6,
          vr: (Math.random() - 0.5) * 0.4,
          c: COLORS[i % COLORS.length],
          round: Math.random() < 0.25,
          life: 1,
        });
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const count = () => {
      if (reduce) {
        setShown(amount);
        return;
      }
      setShown(0);
      timers.push(
        setTimeout(() => {
          const t0 = performance.now();
          const dur = 1100;
          const step = (t) => {
            const k = Math.min((t - t0) / dur, 1);
            const e = 1 - Math.pow(1 - k, 4);
            setShown(k < 1 ? amount * e : amount);
            if (k < 1) countRaf = requestAnimationFrame(step);
          };
          countRaf = requestAnimationFrame(step);
        }, 3150),
      );
    };

    timers.push(setTimeout(burst, reduce ? 0 : 900));
    timers.push(setTimeout(burst, reduce ? 0 : 3700));
    count();

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(countRaf);
      window.removeEventListener("resize", resize);
    };
  }, [amount, hasReceipt]);

  const rows = hasReceipt
    ? [
        [
          "Registrant",
          `${receipt.registration.title} ${receipt.registration.firstName} ${receipt.registration.lastName}`,
        ],
        ["Order ID", receipt.orderId],
        ["Payment ID", receipt.paymentId],
        ["Payment date", date],
      ]
    : [];

  return (
    <div className="ps-page">
      <canvas ref={canvasRef} className="ps-fx" aria-hidden="true" />
      <main className="ps-main">
        {hasReceipt ? (
          <>
            <section className="ps-left">
              <div className="ps-badge" ref={badgeRef} aria-hidden="true">
                <div className="ps-pulse" />
                <div className="ps-pulse ps-pulse--b" />
                <div className="ps-disc" />
                <svg viewBox="0 0 132 132">
                  <circle className="ps-ring" cx="66" cy="66" r="54" />
                  <path className="ps-tick" d="M44 68 L60 84 L90 48" />
                </svg>
              </div>

              <h1 className="ps-title" aria-label="Payment received">
                <span>
                  <i>Payment</i>
                </span>
                <span>
                  <i>Successful</i>
                </span>
              </h1>
              <p className="ps-sub">
                Thank you for joining us in wcmrp-2027. We look forward to your
                participation and contributions to the Confworld Educational
                Research and Development Association (CERADA) Conference.
              </p>
              <div className="ps-help">
                <p>Need help? Contact us</p>
                <div>
                  <a href="mailto:wcmrp.cerada@gmail.com">
                    wcmrp.cerada@gmail.com
                  </a>
                  <a href="tel:+918072381719">+91 8072381719</a>
                </div>
              </div>
            </section>

            <section className="ps-right">
              <div className="ps-printer">
                <div className="ps-slot" />
                <div className="ps-feed">
                  <div className="ps-receipt">
                    <h2>Thank you for your Registration!</h2>
                    <h2>Receipt</h2>
                    {rows.map(([label, value], i) => (
                      <div className="ps-row" style={{ "--i": i }} key={label}>
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                    <div className="ps-total">
                      <span>Total paid</span>
                      <output>{money.format(shown / 100)}</output>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ps-actions">
                <button
                  type="button"
                  className="ps-btn ps-btn--primary"
                  onClick={() => navigate("/")}
                >
                  Back to home
                </button>
              </div>
            </section>
          </>
        ) : (
          <section className="ps-left">
            <h1 className="ps-title">Receipt unavailable</h1>
            <p className="ps-sub">
              Registration payment details are not available in this session. If
              your payment was successful, please contact us for assistance.
            </p>
            <button
              type="button"
              className="ps-btn ps-btn--primary"
              onClick={() => navigate("/")}
            >
              Back to home
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
