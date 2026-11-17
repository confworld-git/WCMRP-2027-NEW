import "./Instructions.css";
import { Link } from "react-router-dom";

/* ---------- SVG illustrations (one per step) ---------- */
const PayIcon = () => (
  <svg viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="60" r="54" fill="#e9ebff" />
    <rect x="22" y="36" width="76" height="50" rx="10" fill="#010ba8" />
    <rect x="22" y="47" width="76" height="10" fill="#fe9a00" />
    <rect x="31" y="68" width="24" height="9" rx="3" fill="#fff" />
    <circle
      cx="86"
      cy="26"
      r="14"
      fill="#fe9a00"
      stroke="#fff"
      strokeWidth="4"
    />
    <path
      d="M80 26l4 4 8-9"
      fill="none"
      stroke="#fff"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="60" r="54" fill="#e9ebff" />
    <path
      d="M34 20h34l20 20v54a6 6 0 01-6 6H34a6 6 0 01-6-6V26a6 6 0 016-6z"
      fill="#fff"
      stroke="#010ba8"
      strokeWidth="4"
    />
    <path
      d="M68 20v20h20"
      fill="#e9ebff"
      stroke="#010ba8"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <path
      d="M58 50v26M46 66l12 12 12-12"
      fill="none"
      stroke="#fe9a00"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="42" y="88" width="32" height="5" rx="2.5" fill="#010ba8" />
  </svg>
);

const FillIcon = () => (
  <svg viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="60" r="54" fill="#e9ebff" />
    <rect
      x="26"
      y="22"
      width="60"
      height="78"
      rx="8"
      fill="#fff"
      stroke="#010ba8"
      strokeWidth="4"
    />
    <g fill="#010ba8">
      <rect x="36" y="36" width="32" height="5" rx="2.5" />
      <rect x="36" y="50" width="40" height="5" rx="2.5" opacity=".5" />
      <rect x="36" y="64" width="26" height="5" rx="2.5" opacity=".5" />
    </g>
    <path
      d="M70 88l4-14 28-28 10 10-28 28z"
      fill="#fe9a00"
      stroke="#fff"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path d="M74 74l10 10" stroke="#fff" strokeWidth="3" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="60" r="54" fill="#e9ebff" />
    <rect x="20" y="36" width="80" height="54" rx="9" fill="#010ba8" />
    <path
      d="M24 42l36 28 36-28"
      fill="none"
      stroke="#fff"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M78 30l22-8-8 22-5-9z"
      fill="#fe9a00"
      stroke="#fff"
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </svg>
);

/* ---------- Data ---------- */
const STEPS = [
  {
    title: "Payment",
    text: "Complete your payment for the conference",
    Icon: PayIcon,
  },
  {
    title: "Download Form",
    text: "After making your payment, download the Registration Form",
    Icon: DownloadIcon,
  },
  {
    title: "Fill Out Form",
    text: "Complete all required fields in the Registration Form",
    Icon: FillIcon,
  },
  {
    title: "Submit Registration",
    text: "Email the filled-out Registration Form along with your payment information to",
    email: "wcmrp.cerada@gmail.com",
    Icon: SendIcon,
  },
];

const GUIDELINES = [
  [
    "Payment Notification",
    "Registered members must inform us about their payments immediately via E-mail.",
  ],
  [
    "Proof of Payment",
    "After completing registration, every participant is required to email a scanned copy of the registration fee receipt or transaction proof to us immediately.",
  ],
  [
    "Paper Submission",
    "No modifications to the paper will be accepted after the final submission date.",
  ],
  [
    "Author Limit",
    "Only one author and one co-author are allowed per registration.",
  ],
  [
    "Late Registration",
    "If you need to register after the deadlines, please contact the coordinator as soon as possible.",
  ],
  [
    "Form Submission",
    "After making your payment, download the Registration Form, fill it out, and email it to us at wcmrp.cerada@gmail.com along with your payment information.",
  ],
];

/* ---------- Component ---------- */
export default function Instructions() {
  return (
    <div className="reg">
      <header className="hero">
        <svg
          className="bg"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 800 400"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="reggrid"
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
          <rect width="800" height="400" fill="url(#reggrid)" />
          <path
            d="M0 340c150-60 250 40 400-10s250-60 400 0"
            fill="none"
            stroke="#fe9a00"
            strokeOpacity=".6"
            strokeWidth="3"
            strokeDasharray="10 10"
          />
        </svg>
        <div className="wrap">
          <div className="crumb">
            <Link to="/">Home</Link> » Registration Instructions
          </div>
          <h1>
            Registration <span>Instructions</span>
          </h1>
          <p>Four simple steps to secure your place at WCMRP 2027.</p>
        </div>
      </header>

      <main
        className="wrap"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <p className="eyebrow">Step-by-step</p>
        <h2 className="h2">How to Register</h2>
        <ol className="steps">
          {STEPS.map(({ title, text, email, Icon }, i) => (
            <li className="step" key={title}>
              <span className="num">{i + 1}</span>
              <div className="pic">
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>
                {text}
                {email && (
                  <>
                    {" "}
                    <a href={`mailto:${email}`}>{email}</a>
                  </>
                )}
              </p>
            </li>
          ))}
        </ol>

        <div
          className="note"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path d="M24 5l21 37H3z" fill="#1a1000" />
            <path
              d="M24 18v11"
              stroke="#fe9a00"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="24" cy="35" r="2.6" fill="#fe9a00" />
          </svg>
          <p>
            <b>Important Note:</b> The payee is responsible for all bank
            convenience fees and bank transaction charges.
          </p>
        </div>

        {/* Guidelines */}
        <p
          className="eyebrow"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          Policies
        </p>
        <h2
          className="h2"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          Registration Guidelines
        </h2>
        <div
          className="rules"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          {GUIDELINES.map(([title, text], i) => (
            <article className="rule" key={title}>
              {/* <span className="big">{i + 1}</span> */}
              <h3>
                <span className="big">{i + 1}</span>
                {title}
              </h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
