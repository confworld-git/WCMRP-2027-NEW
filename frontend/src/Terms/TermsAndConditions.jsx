import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  AlertTriangle,
  ShieldCheck,
  XCircle,
  Globe,
  Database,
  ListChecks,
  Share2,
  Scale,
  Plane,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import "./TermsAndConditions.css";

/* body item types:
   "text"                      -> paragraph
   { list: [...] }             -> bullet list
   { h: "Title", icon: Icon }  -> sub-heading with icon
   { venue: {...} }            -> venue + coordinator ticket           */
const SECTIONS = [
  {
    id: "terms",
    title: "Terms and Conditions",
    icon: FileText,
    body: [
      "By registering for the conference, you hereby agree with the terms and conditions outlined below.",
      {
        list: [
          "The organization reserves the right to make alterations to the program, date, and/or venue at any time without prior notice.",
          "The organization is not responsible for any loss or damage as a result of substitution, alteration, postponement, or cancellation of an event due to causes beyond its control including without limitation, force majeure, natural disasters, sabotage, accident, trade or industrial disputes, terrorism, strikes, or hostilities.",
          "The organization reserves the right and holds the sole discretion to cancel any conference at any time in case of any unavoidable and unforeseeable circumstances. The organizer will have no further liability to the client.",
          "Registrations remain valid for the event with new dates or for future editions if the conference has to be postponed by causes beyond the organizer's control. The refund policy is not applicable to this condition.",
          "In the event of cancellation, the organization will use reasonable and suitable alternative arrangements such as posting the news of cancellation on the appropriate event website to alert those who have booked or purchased tickets to attend the event.",
        ],
      },
      "The organizers will not accept any liability for personal injuries or for loss or damage to property belonging to the delegates, either during, or as a result of the conference.",
    ],
  },
  {
    id: "important-notice",
    title: "Important Notice",
    icon: AlertTriangle,
    important: true,
    body: [
      "Delegates are responsible for checking this information prior to the event. We advise you to keep checking the website for updates regarding the conference schedule.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    icon: ShieldCheck,
    body: [
      { h: "1. Information Collection", icon: Database },
      "We collect personal information that you voluntarily provide to us when registering for conferences, subscribing to newsletters, submitting inquiries, or participating in forums on our website.",
      {
        list: [
          "Full Name",
          "Email Address",
          "Contact Number",
          "Mailing Address",
          "Payment Details",
          "Affiliation Data",
        ],
      },
      { h: "2. How We Use Your Information", icon: ListChecks },
      {
        list: [
          "To process registrations for events and conferences",
          "To communicate regarding updates, announcements, and scheduling details",
          "To respond to inquiries and provide administrative customer support",
          "To manage website operations and optimize layout responsiveness",
          "To process billing payments and secure transaction receipts",
        ],
      },
      { h: "3. Sharing of Information", icon: Share2 },
      "We do not sell, trade, or rent your personal information to third parties. We may share transaction records solely with logistics providers and secure payment processing services assisting in conference execution.",
      { h: "4. Your Legal Rights", icon: Scale },
      "You have the right to access, update, or request deletion of your personal records at any time.",
      "To exercise these options, email our privacy desk: wcmrp.cerada@gmail.com",
    ],
  },
  {
    id: "cancellation",
    title: "Cancellation & Refund",
    icon: XCircle,
    important: true,
    body: [
      "If the registrant is unable to attend, please review the refund timeline scale which factors in commitments made to venues, catering, print booklets, and administrative shipping overheads:",
      {
        list: [
          "50 Days Prior: 40% Refund",
          "30-40 Days Prior: 35% Refund",
          "Under 30 Days: No Refund",
        ],
      },
      "Transfer of Registration: Registrations can alternatively be transferred to another event organized by the same association of the registrant's choice without penalty.",
      "Program Slot Policy: No changes to allocated presentation slots or oral presentation sessions will be allowed once the official program agenda schedule is released.",
      "Refunds are processed 2-4 weeks after the conference date, excluding global bank convenience charges and transaction taxes. Special conditions apply if postponement is caused by act of God / force majeure.",
    ],
  },
  {
    id: "visa",
    title: "VISA & Venue Info",
    icon: Globe,
    body: [
      { h: "Visa Invitation Letter", icon: Plane },
      "CERADA does not directly contact embassies or consulates on behalf of visa applicants.",
      "All delegates and invitees must apply for a Business Visa only. Visa rejection issues do not fall under refund considerations.",
      { h: "Conference Venue", icon: MapPin },
      {
        venue: {
          place: "Kuala Lumpur",
          country: "Malaysia",
          name: "Ms. Aishwarya S",
          phone: "+91 8072381719",
          email: "wcmrp.cerada@gmai.com",
        },
      },
    ],
  },
];

// const LAST_UPDATED = "January 2027";

/* ---------- Hero art ---------- */
const ScrollIcon = () => (
  <svg viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="60" r="54" fill="#e9ebff" />
    <path d="M38 24h40a8 8 0 018 8v50a14 14 0 01-14 14H44a14 14 0 01-14-14V32a8 8 0 018-8z" fill="#fff" stroke="#010ba8" strokeWidth="4" />
    <g fill="#010ba8">
      <rect x="42" y="38" width="32" height="5" rx="2.5" />
      <rect x="42" y="52" width="38" height="5" rx="2.5" opacity=".5" />
      <rect x="42" y="66" width="26" height="5" rx="2.5" opacity=".5" />
    </g>
    <circle cx="86" cy="86" r="16" fill="#fe9a00" stroke="#fff" strokeWidth="4" />
    <path d="M79 86l5 5 9-10" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- Venue ticket ---------- */
const Skyline = () => (
  <svg className="sky" viewBox="0 0 420 190" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
    {/* small buildings */}
    <g fill="rgba(255,255,255,.1)">
      <rect x="0" y="120" width="34" height="70" />
      <rect x="40" y="96" width="28" height="94" />
      <rect x="74" y="132" width="40" height="58" />
      <rect x="300" y="110" width="30" height="80" />
      <rect x="336" y="136" width="38" height="54" />
      <rect x="380" y="100" width="40" height="90" />
    </g>
    {/* twin towers */}
    <g fill="rgba(255,255,255,.22)">
      <path d="M150 190V70l8-18 8 18v120z" />
      <path d="M200 190V70l8-18 8 18v120z" />
      <rect x="166" y="104" width="34" height="8" />
    </g>
    <g stroke="#fe9a00" strokeWidth="3" strokeLinecap="round">
      <path d="M158 52V30" />
      <path d="M208 52V30" />
    </g>
    {/* tower with sphere */}
    <g fill="rgba(255,255,255,.2)">
      <rect x="262" y="82" width="6" height="108" />
      <ellipse cx="265" cy="88" rx="14" ry="9" />
    </g>
    <path d="M265 79V50" stroke="#fe9a00" strokeWidth="3" strokeLinecap="round" />
    <circle cx="265" cy="46" r="4" fill="#fe9a00" />
    {/* ground glow */}
    <rect x="0" y="184" width="420" height="6" fill="#fe9a00" opacity=".7" />
  </svg>
);

function Venue({ place, country, name, phone, email }) {
  const initials = name
    .replace(/^(Ms|Mr|Mrs|Dr)\.?\s+/i, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place} ${country}`)}`;

  return (
    <div className="venue">
      <div className="vmap">
        <Skyline />
        <span className="vtag">
          <MapPin size={14} /> Venue City
        </span>
        <div className="vname">
          <h4>{place}</h4>
          <span>{country}</span>
        </div>
        <a className="vgo" href={map} target="_blank" rel="noreferrer">
          Open in Maps <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="vdesk">
        <span className="vlabel">Coordinator Desk</span>
        <div className="vperson">
          <span className="vav">{initials}</span>
          <b>{name}</b>
        </div>
        <a className="vlink" href={`tel:${phone.replace(/\s/g, "")}`}>
          <span className="vi"><Phone size={16} /></span>
          <span>{phone}</span>
          <ArrowUpRight size={16} className="va" />
        </a>
        <a className="vlink" href={`mailto:${email}`}>
          <span className="vi"><Mail size={16} /></span>
          <span>{email}</span>
          <ArrowUpRight size={16} className="va" />
        </a>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
export default function TermsAndConditions() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-170px 0px -65% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="terms">
      <header className="hero">
        <svg className="bg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 400" aria-hidden="true">
          <defs>
            <pattern id="termsgrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="#fff" strokeOpacity=".28" />
            </pattern>
          </defs>
          <rect width="800" height="400" fill="url(#termsgrid)" />
          <circle cx="680" cy="70" r="110" fill="none" stroke="#fe9a00" strokeOpacity=".5" strokeWidth="2" />
          <circle cx="680" cy="70" r="70" fill="none" stroke="#fff" strokeOpacity=".3" />
        </svg>
        <div className="wrap">
          <div>
            <div className="crumb">
              <Link to="/">Home</Link> » Terms &amp; Conditions
            </div>
            <h1>
              Terms <span>&amp; Conditions</span>
            </h1>
            <p style={{ fontSize: "14px" }}>
              Please read these terms carefully before registering for WCMRP 2027.
            </p>
            {/* {LAST_UPDATED && <div className="stamp">Last updated · {LAST_UPDATED}</div>} */}
          </div>
          <div className="art">
            <ScrollIcon />
          </div>
        </div>
      </header>

      <main className="wrap layout" >
        <nav className="index" aria-label="Sections">
          <p className="mini_head">On this page</p>
          <ol>
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={active === s.id ? "on" : ""} onClick={(e) => go(e, s.id)}>
                    <Icon size={16} />
                    {s.title}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Clauses */}
        <div className="clauses" data-aos="fade-up"
     data-aos-anchor-placement="top-bottom">
          {SECTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <article id={s.id} key={s.id} className={`clause${s.important ? " imp" : ""}`}>
                <span className="big">{String(i + 1).padStart(2, "0")}</span>
                <div className="head">
                  <span className="ic"><Icon size={22} /></span>
                  <h2>{s.title}</h2>
                </div>
                {s.body.map((b, j) => {
                  if (typeof b === "string") return <p key={j}>{b}</p>;
                  if (b.list)
                    return (
                      <ul key={j}>
                        {b.list.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    );
                  if (b.h) {
                    const SubIcon = b.icon;
                    return (
                      <h3 key={j} className="sub">
                        <span className="si"><SubIcon size={16} /></span>
                        {b.h}
                      </h3>
                    );
                  }
                  if (b.venue) return <Venue key={j} {...b.venue} />;
                  return null;
                })}
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
