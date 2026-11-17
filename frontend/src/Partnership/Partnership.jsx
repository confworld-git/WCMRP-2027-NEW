import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  FileText,
  Globe,
  Megaphone,
  Mic,
  Monitor,
  Phone,
  Presentation,
  Search,
  Send,
  UsersRound,
} from "lucide-react";
import conferencePhoto from "../assets/Images/66.jpg";
import "./Partnership.css";

const benefits = [
  {
    icon: Award,
    title: "Registration Discounts",
    description:
      "Exclusive faculty and student registration discounts for all CERADA international conferences.",
  },
  {
    icon: Presentation,
    title: "Research Presentation",
    description:
      "Priority slots for institutional research presentation opportunities globally.",
  },
  {
    icon: Mic,
    title: "Keynote Opportunities",
    description:
      "Nominate distinguished faculty for keynote and session speaker roles.",
  },
  {
    icon: Briefcase,
    title: "Session Chairing",
    description:
      "Leadership roles for senior professionals in various academic tracks.",
  },
  {
    icon: Search,
    title: "Reviewer Panels",
    description:
      "Eligibility for faculty to join global conference peer-review committees.",
  },
  {
    icon: UsersRound,
    title: "Committee Membership",
    description:
      "Research scholars can join the Organizing Committee for major events.",
  },
  {
    icon: BookOpen,
    title: "SCOPUS Publication",
    description:
      "Enhanced publication pathways in SCOPUS and high-impact journals.",
  },
  {
    icon: Globe,
    title: "Academic Networking",
    description:
      "Direct access to a global network of partner universities and institutes.",
  },
];

const promotionChannels = [
  { icon: Globe, label: "Conference Website" },
  { icon: FileText, label: "Digital Brochures" },
  { icon: CalendarDays, label: "Event Posters" },
  { icon: Megaphone, label: "Social Media Campaigns" },
  { icon: Monitor, label: "Digital Promotions" },
  { icon: Award, label: "On-site Branding" },
];

const idealPartners = [
  "Universities",
  "Colleges",
  "Research Institutes",
  "Academic Departments",
  "Research Centers",
];

const partnershipContacts = [
  {
    initials: "S",
    name: "Ms. Suhana S",
    role: "Partnership & Promotional Activities",
    phone: "+91 8610656424",
    phoneLink: "tel:+918610656424",
  },
  {
    initials: "A",
    name: "Ms. Aishwarya S",
    role: "General Information & Queries",
    phone: "+91 8072381719",
    phoneLink: "tel:+918072381719",
  },
  {
    initials: "M",
    name: "Ms. Malathy G",
    role: "General Information & Queries",
    phone: "+91 6383055014",
    phoneLink: "tel:+916383055014",
  },
];

const Partnership = () => {
  return (
    <main className="partnership-page">
      <section className="partnership-benefits" aria-labelledby="benefits-title">
        <header className="partnership-heading">
          <span className="partnership-eyebrow">CERADA Academic Network</span>
          <h1 id="benefits-title">Benefits of Academic Partnership</h1>
          <span className="partnership-heading__accent" aria-hidden="true" />
        </header>

        <div className="partnership-benefits__grid">
          {benefits.map(({ icon: Icon, title, description }) => (
            <article className="partnership-benefit" key={title}>
              <span className="partnership-icon">
                <Icon size={19} aria-hidden="true" />
              </span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="partnership-overview">
        <article className="promotion-card">
          <h2>Institutional Promotion</h2>
          <p>
            Your institution&apos;s brand will be prominently showcased across
            our multi-faceted marketing channels, reaching thousands of
            academics worldwide.
          </p>
          <ul className="promotion-channels">
            {promotionChannels.map(({ icon: Icon, label }) => (
              <li key={label}>
                <span className="partnership-icon partnership-icon--small">
                  <Icon size={16} aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </article>

        <div className="partnership-aside">
          <article className="partnership-info-card partnership-eligibility">
            <h2>Eligibility</h2>
            <div className="partnership-info-card__content">
              <span className="partnership-icon partnership-icon--primary">
                <UsersRound size={20} aria-hidden="true" />
              </span>
              <p>
                Minimum 5-10 registrations (any category) from your institution
                for the respective conference.
              </p>
            </div>
          </article>

          <article className="partnership-info-card partnership-ideal">
            <h2>Ideal Partners</h2>
            <div className="partnership-info-card__content">
              <span className="partnership-icon partnership-icon--secondary">
                <Building2 size={20} aria-hidden="true" />
              </span>
              <ul>
                {idealPartners.map((partner) => (
                  <li key={partner}>{partner}</li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="partnership-cta" aria-labelledby="partner-cta-title">
        <div className="partnership-cta__content">
          <span className="partnership-eyebrow">Let&apos;s collaborate</span>
          <h2 id="partner-cta-title">Partner with CERADA Today</h2>
          <p>
            Discover how CERADA sponsorship can benefit your organization. We
            look forward to partnering with you and creating a memorable and
            impactful experience at the next CERADA International Conference.
          </p>
          <p className="partnership-contact-note">
            <strong>Contact Us:</strong> Reach out to our team to discuss
            customized sponsorship and exhibition packages at{" "}
            <a href="mailto:collaboration@confworld.org">
              collaboration@confworld.org
            </a>
            . For more information or to secure your spot, please contact us
            today.
          </p>
          <a
            className="partnership-cta__button"
            href="mailto:collaboration@confworld.org?subject=Academic%20Partnership%20Enquiry"
          >
            Ask Enquiries
            <Send size={15} aria-hidden="true" />
          </a>
        </div>
        <img
          className="partnership-cta__image"
          src={conferencePhoto}
          alt="CERADA conference participants gathered at an international event"
        />
      </section>

      <section className="partnership-team" aria-labelledby="team-title">
        <header className="partnership-heading">
          <h2 id="team-title">Contact Our Partnership Team</h2>
          <p>Reach out to discuss customized sponsorship and exhibition packages.</p>
        </header>
        <div className="partnership-team__grid">
          {partnershipContacts.map((contact) => (
            <article className="partnership-contact-card" key={contact.name}>
              <span className="partnership-contact-card__initial">
                {contact.initials}
              </span>
              <h3>{contact.name}</h3>
              <p>{contact.role}</p>
              <a href={contact.phoneLink}>
                <Phone size={14} aria-hidden="true" />
                {contact.phone}
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Partnership;