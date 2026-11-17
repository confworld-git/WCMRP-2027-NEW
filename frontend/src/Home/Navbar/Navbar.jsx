import { BsGlobe } from "react-icons/bs";
import { IoMailOpenOutline } from "react-icons/io5";
import { MdOutlineCall } from "react-icons/md";
import { LiaHandshake } from "react-icons/lia";
import WCMRP_Logo from "../../assets/Logo/WCMRPLogo.png";
import { MdOutlinePerson } from "react-icons/md";
import { LuUserRoundCheck } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    const closeOnDesktopResize = () => {
      if (window.innerWidth > 900) {
        setMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktopResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktopResize);
    };
  }, [mobileMenuOpen]);

  const closeMenuAfterNavigation = (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) {
        return;
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
      return;
    }

    if (document.getElementById("google-translate-script")) {
      return;
    }

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <nav className="navbar">
      <div className="scroll_content">
        <p>
          <strong>HYBRID EVENT</strong> - You can participate in person at
          <strong>
            {" "}
            <Link to="/venue">Kuala Lumpur, Malaysia</Link>
          </strong>{" "}
          or{" "}
          <Link to="/Registration-Fee">
            <strong>Virtually</strong>
          </Link>{" "}
          from your home or office.
        </p>
        <p>
          <strong>HYBRID EVENT</strong> - You can participate in person at
          <strong>
            {" "}
            <Link to="/venue">Manila, Philippines</Link>
          </strong>{" "}
          or{" "}
          <Link to="/Registration-Fee">
            <strong>Virtually</strong>
          </Link>{" "}
          from your home or office.
        </p>
      </div>
      <div className="top_nav">
        <div className="translate_control">
          <BsGlobe aria-hidden="true" />
          <span>Translate:</span>
          <div id="google_translate_element"></div>
        </div>
        <ul>
          <li>
            <LuUserRoundCheck aria-hidden="true" />
            <Link to="/Registration-Fee">Register Now</Link>
          </li>
          <li>
            <IoMailOpenOutline aria-hidden="true" />
            <a href="mailto:wcmrp.cerada@gmail.com">wcmrp.cerada@gmail.com</a>
          </li>
          <li>
            <MdOutlineCall aria-hidden="true" />
            <a href="tel:+918072381719">+91 8072381719</a>
          </li>
          <li>
            <LiaHandshake aria-hidden="true" />
            <Link to="/Academic-Partnership">Apply for Academic Partner</Link>
          </li>
        </ul>
      </div>
      <div
        className={`bot_nav ${mobileMenuOpen ? "is-menu-open" : ""}`}
        onClick={closeMenuAfterNavigation}
      >
        <Link to="/" className="navbar-logo" aria-label="Home">
          <img
            src={WCMRP_Logo}
            alt="3rd World Conference on Multidisciplinary Research & Practices | WCMRP 2026 conference logo"
          />
        </Link>
        <button
          className="navbar-menu-toggle"
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
        {mobileMenuOpen && (
          <button
            className="navbar-overlay"
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        <ul
          className={`navbar-nav ${mobileMenuOpen ? "is-open" : ""}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          <li className="nav-item dropdown">
            <Link to="/About-WCMRP" className="nav-link dropdown-toggle">
              About
              <MdKeyboardArrowDown />
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/About-WCMRP">
                  About WCMRP
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/About-Organizer">
                  About Organizer
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/Speakers">
                  Speakers
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/Committee-Members">
                  Organizing Committee Member
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/organizing-committee-member-form"
                >
                  Organizing Committee Member Form
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link
              to="/Session-Tracks-&-Call-For-Papers"
              className="nav-link dropdown-toggle"
            >
              Session Tracks
              <MdKeyboardArrowDown />
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="/Session-Tracks-&-Call-For-Papers">
                  Session Tracks/Call For Papers
                </Link>
              </li>
              <li>
                <Link to="/Essential-Downloads">Essential Download</Link>
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link
              to="/abstract-full-paper-submission"
              className="nav-link dropdown-toggle"
            >
              Paper Submission
              <MdKeyboardArrowDown />
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="/abstract-full-paper-submission">
                  Abstract/Full Paper Submission
                </Link>
              </li>
              <li>
                <Link to="/Submission-Guidelines">Submission Guidelines</Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link to="/Publication" className="nav-link">
              Publication
            </Link>
          </li>

          <li className="nav-item dropdown">
            <Link to="/Registration-Fee" className="nav-link dropdown-toggle">
              Registration
              <MdKeyboardArrowDown />
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="/Registration-Fee">Registration Fees</Link>
              </li>
              <li>
                <Link to="/Available-payment-methods">
                  Available Payment Methods
                </Link>
              </li>
              <li>
                <Link to="/Registration-Instructions">
                  Registration Instruction
                </Link>
              </li>
              <li>
                <Link to="/Terms-and-Conditions">Terms and Conditions</Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link to="/frequently-asked-questions" className="nav-link">
              FAQ
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/venue" className="nav-link">
              Venue
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
          </li>

          <li className="nav-item" style={{ display: "block" }}>
            {/* style={{ display: "none" }} */}
            <button onClick={() => navigate("/login")}>
              <MdOutlinePerson aria-hidden="true" />
              Login
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
