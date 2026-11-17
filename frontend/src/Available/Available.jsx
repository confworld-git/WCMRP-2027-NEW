import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Available.css";

const CardIcon = () => (
  <svg className="ic" viewBox="0 0 84 84" aria-hidden="true">
    <rect x="6" y="18" width="72" height="48" rx="9" fill="#010ba8" />
    <rect x="6" y="28" width="72" height="9" fill="#fe9a00" />
    <rect x="14" y="48" width="22" height="9" rx="3" fill="#fff" />
    <circle cx="62" cy="52" r="7" fill="#fe9a00" opacity=".9" />
    <circle cx="55" cy="52" r="7" fill="#fff" opacity=".6" />
  </svg>
);

const BankIcon = () => (
  <svg className="ic" viewBox="0 0 84 84" aria-hidden="true">
    <path d="M42 8L8 26h68z" fill="#010ba8" />
    <g fill="#010ba8">
      <rect x="14" y="32" width="9" height="28" rx="2" />
      <rect x="31" y="32" width="9" height="28" rx="2" />
      <rect x="44" y="32" width="9" height="28" rx="2" />
      <rect x="61" y="32" width="9" height="28" rx="2" />
    </g>
    <rect x="8" y="64" width="68" height="9" rx="3" fill="#fe9a00" />
    <circle cx="42" cy="19" r="3.5" fill="#fff" />
  </svg>
);

const PayPalIcon = () => (
  <svg className="ic" viewBox="0 0 84 84" aria-hidden="true">
    <circle cx="42" cy="42" r="34" fill="#010ba8" />
    <path
      d="M33 22h14c9 0 14 5 12 13s-8 12-16 12h-5l-3 13h-9z"
      fill="#fe9a00"
    />
    <path d="M38 30h8c4 0 6 2 5 5s-4 5-8 5h-4z" fill="#010ba8" opacity=".35" />
  </svg>
);

const TransferIcon = () => (
  <svg className="ic" viewBox="0 0 84 84" aria-hidden="true">
    <circle
      cx="42"
      cy="42"
      r="32"
      fill="none"
      stroke="#010ba8"
      strokeWidth="5"
    />
    <ellipse
      cx="42"
      cy="42"
      rx="14"
      ry="32"
      fill="none"
      stroke="#010ba8"
      strokeWidth="4"
    />
    <path
      d="M10 42h64M16 26h52M16 58h52"
      stroke="#010ba8"
      strokeWidth="3"
      fill="none"
    />
    <path
      d="M52 62h26M70 54l8 8-8 8"
      stroke="#fe9a00"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HeroArt = () => (
  <svg viewBox="0 0 300 220" width="100%" aria-hidden="true">
    <rect
      x="40"
      y="40"
      width="210"
      height="130"
      rx="18"
      fill="#fe9a00"
      transform="rotate(-8 145 105)"
    />
    <rect
      x="60"
      y="30"
      width="210"
      height="130"
      rx="18"
      fill="#fff"
      transform="rotate(6 165 95)"
    />
    <rect
      x="82"
      y="62"
      width="40"
      height="30"
      rx="6"
      fill="#010ba8"
      transform="rotate(6 102 77)"
    />
    <g transform="rotate(6 165 95)" fill="#010ba8">
      <rect x="82" y="108" width="120" height="8" rx="4" opacity=".7" />
      <rect x="82" y="124" width="70" height="8" rx="4" opacity=".35" />
    </g>
    <g transform="translate(205 118)">
      <path
        d="M0 -26l26 10v18c0 16-11 26-26 32-15-6-26-16-26-32v-18z"
        fill="#010ba8"
        stroke="#fff"
        strokeWidth="4"
      />
      <path
        d="M-10 4l7 7 14-15"
        fill="none"
        stroke="#fe9a00"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

const HeadsetIcon = () => (
  <svg viewBox="0 0 70 70" aria-hidden="true">
    <circle cx="35" cy="35" r="32" fill="#010ba8" />
    <path
      d="M22 36v-3a13 13 0 0126 0v3"
      fill="none"
      stroke="#fff"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <rect x="17" y="34" width="9" height="15" rx="4" fill="#fff" />
    <rect x="44" y="34" width="9" height="15" rx="4" fill="#fff" />
    <path
      d="M48 49c0 6-6 8-13 8"
      fill="none"
      stroke="#fff"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const METHODS = [
  { name: "Debit/Credit Card", Icon: CardIcon },
  { name: "Net Banking", Icon: BankIcon },
  { name: "PayPal", Icon: PayPalIcon },
  { name: "Bank Transfer (TT)", Icon: TransferIcon },
];

const BANK_DETAILS = [
  ["Beneficiary", "CONFWORLD EDUCATIONAL RESEARCH AND DEVELOPMENT ASSOCIATION"],
  ["Institution", "HDFC Bank"],
  ["Account Number", "50200097123575"],
  ["IFSC Code", "HDFC0000124"],
  ["Swift / BIC", "HDFCINBBCHE"],
  ["Location", "Kilpauk, Chennai, India"],
];

export default function Available() {
  const [toast, setToast] = useState("");
  const timer = useRef(null);

  const copy = async (value) => {
    let msg = "Copied";
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      msg = "Copy failed";
    }
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 1600);
  };

  return (
    <div className="pay">
      <header className="hero">
        <svg
          className="bg"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 800 400"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="paygrid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M40 0H0V40"
                fill="none"
                stroke="#fff"
                strokeOpacity=".28"
              />
            </pattern>
          </defs>
          <rect width="800" height="400" fill="url(#paygrid)" />
          <circle
            cx="700"
            cy="60"
            r="120"
            fill="none"
            stroke="#fe9a00"
            strokeOpacity=".5"
            strokeWidth="2"
          />
          <circle
            cx="700"
            cy="60"
            r="80"
            fill="none"
            stroke="#fff"
            strokeOpacity=".3"
          />
        </svg>
        <div className="wrap">
          <div>
            <div className="crumb">
              <Link to="/">Home</Link> » Payment Systems
            </div>
            <h1>
              Pay your way <span>Securely</span>
            </h1>
            <p>
              Secure processing for WCMRP 2027. All transactions are encrypted
              and audited for compliance.
            </p>
          </div>
          <div className="art">
            <HeroArt />
          </div>
        </div>
      </header>

      <main className="wrap">
        {/* Method cards */}
        <div
          className="methods"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          {METHODS.map(({ name, Icon }) => (
            <article className="m" key={name}>
              {/* <span className="no">{String(i + 1).padStart(2, "0")}</span> */}
              <Icon />
              <h3>{name}</h3>
              <div className="live">
                <i /> Active Gateway
              </div>
            </article>
          ))}
        </div>

        <section>
          {/* Bank ledger */}
          <div
            className="ledger"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <div className="lh">
              <div>
                <h2>Bank Transfer Details</h2>
                <p>
                  International Swift/TT transactions for institutional
                  registrations and individual delegates.
                </p>
              </div>
              <span className="ver">✔ Verified Account</span>
            </div>
            <dl>
              {BANK_DETAILS.map(([label, value]) => (
                <div className="row" key={label}>
                  <div className="t">
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                  <button
                    type="button"
                    className="cp"
                    onClick={() => copy(value)}
                  >
                    Copy
                  </button>
                </div>
              ))}
            </dl>
          </div>

          {/* Support */}
          <aside
            className="help"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <div>
              <HeadsetIcon />
              <h2>Administrative Support</h2>
            </div>
            <p>
              For bulk institutional registrations or tax invoice requests,
              please contact our treasury department directly.
            </p>
            <a href="mailto:wcmrp.cerada@gmail.com">✉ wcmrp.cerada@gmail.com</a>
            <a href="tel:+918072381719">☎ +91 8072381719</a>
          </aside>
        </section>
      </main>

      <div
        className={`toast${toast ? " s" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toast || "Copied"}
      </div>
    </div>
  );
}
