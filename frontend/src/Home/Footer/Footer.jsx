import "./Footer.css";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import logo from "../../assets/Logo/logo1.png";

const quickLinks = [
  [
    { label: "Home", href: "/" },
    { label: "About", href: "/About-WCMRP" },
    { label: "Available Payment", href: "/Available-payment-methods" },
    { label: "Terms & Conditions", href: "/Terms-and-Conditions" },
    {
      label: "Call for Papers",
      href: "/Session-Tracks-&-Call-For-Papers",
    },
    { label: "Enquiries", href: "/contact" },
  ],
  [
    { label: "Instructions", href: "/Registration-Instructions" },
    { label: "Guidelines", href: "/Submission-Guidelines" },
    {
      label: "Paper Submission",
      href: "/abstract-full-paper-submission",
    },
    { label: "Publication", href: "/Publication" },
    { label: "Registration Fee", href: "/Registration-Fee" },
    {
      label: "Submission",
      href: "/organizing-committee-member-form",
    },
  ],
];

const socialLinks = [
  {
    icon: <FaFacebookF />,
    label: "Facebook",
    Link: "https://www.facebook.com/people/Confworld-Educational-Research-and-Development-Association/61560894663027/",
  },
  { icon: <FaXTwitter />, label: "X", Link: "https://x.com/infoconfworld" },
  {
    icon: <FaInstagram />,
    label: "Instagram",
    Link: "https://www.instagram.com/confworld_inc/",
  },
  {
    icon: <FaYoutube />,
    label: "YouTube",
    Link: "https://www.youtube.com/@Confworld",
  },
  {
    icon: <FaLinkedinIn />,
    label: "LinkedIn",
    Link: "https://www.linkedin.com/authwall?trk=bf&trkInfo=AQEkkgjFMdoocgAAAaHkC-gg0qqbdNk9Ou0etuSEdSxl_GH7Zh4sQmbcHNiUt4weoG6S_rww0aFf0b7y3lipczoyOdzM8YB5wng95Qi2sravo2O3FD5rSevNvDB58ouPfQ6FmnM=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fconfworld-educational-research-and-development-association%2F",
  },
  {
    icon: <FaWhatsapp />,
    label: "WhatsApp",
    Link: "https://www.whatsapp.com/channel/0029VbCQG5z4inos7Mt6r61W",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo-wrap">
              <img className="footer__logo-circle" src={logo} alt="" />
            </div>
            <h2 className="footer__title">WCMRP-2027</h2>
            <p className="footer__subtitle">
              MULTIDISCIPLINARY RESEARCH
              <br />
              CONFERENCE
            </p>
            <div className="footer__description">
              <p>
                3rd World Conference on Multidisciplinary Research (WCMRP-2027)
              </p>
              <p>
                Theme: Integrating Knowledge Across Disciplines for Global
                Impact: Innovations, Challenges and Sustainable Solutions
              </p>
              <p>
                Organized by: Conford Educational Research and Development
                Association
              </p>
            </div>
          </div>

          <div className="footer__links-block">
            <h3>QUICK LINKS</h3>
            <div className="footer__links">
              <ul>
                {quickLinks[0].map(({ label, href }) => (
                  <li key={label}>
                    <RouterLink to={href}>{label}</RouterLink>
                  </li>
                ))}
              </ul>
              <ul>
                {quickLinks[1].map(({ label, href }) => (
                  <li key={label}>
                    <RouterLink to={href}>{label}</RouterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer__contact-block">
            <h3>CONTACT</h3>
            <ul className="footer__contact-list">
              <li>
                <span className="footer__icon">
                  <FiPhone />
                </span>
                <a href="tel:+919072381719">+91 8072381719</a>
              </li>
              <li>
                <span className="footer__icon">
                  <FiMail />
                </span>
                <a href="mailto:wcmrp.cerada@gmail.com">
                  wcmrp.cerada@gmail.com
                </a>
              </li>
              <li>
                <span className="footer__icon">
                  <FiMapPin />
                </span>
                <a href="mailto:wcmrp.cerada@gmail.com">
                  Kuala Lumpur, Malaysia
                </a>
              </li>
            </ul>

            <div className="footer__address-card">
              <h4>Organizer Address</h4>
              <p>
                Old No.1A, New No.3, Second Floor, Ragavan Street,
                <br />
                Perambur, Chennai - 600011, Tamil Nadu, India.
              </p>
            </div>
          </div>
        </div>

        <div className="footer__social">
          <h4>Follow us on Social Media</h4>
          <div className="footer__social-links">
            {socialLinks.map(({ icon, label, Link }) => (
              <a
                key={label}
                href={Link}
                aria-label={label}
                target="_blank"
                className="footer__social-link"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__copyright">
          Copyright © 2027 CERADA. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
