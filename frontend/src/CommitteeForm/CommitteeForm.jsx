import "./CommitteeForm.css";
import { Link } from "react-router-dom";
import {
  Compass,
  CalendarDays,
  MessageSquareText,
  FileSearch,
  Network,
  Megaphone,
  GraduationCap,
  ClipboardList,
  Radio,
  Users,
  BookCheck,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { FaCog, FaUserTie, FaFlask, FaHandshake } from "react-icons/fa";
import { useState, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countryList from "react-select-country-list";
import SEO from "../SEO.jsx";

const committees = [
  {
    id: "organizing",
    title: "Organizing Committee",
    icon: FaCog,
    requirements: [
      "Doctorates with over 10 years of professional experience",
      "Keynote speakers in at least 5 international conferences",
      "CEOs / Managing Directors / Deans / Principals",
      "Research Experts",
    ],
    responsibilities:
      "Their responsibilities include selecting the conference venue, deciding on institutional and media partners and identifying potential co-hosts. They also have the authority to choose keynote speakers, appoint program chairs and determine session topics.",
  },
  {
    id: "advisory",
    title: "Advisory Committee",
    icon: FaUserTie,
    requirements: [
      "Dean / Director / Principal with a doctorate",
      "Professors / HODs with 10+ years of experience",
      "Associate / Assistant Professors with 5+ years of experience",
      "Industrial Professionals with 8+ years of experience",
      "Professionals from the host country",
    ],
    responsibilities:
      "The committee works closely with other teams to maintain the event schedule, assist with hospitality and registration and coordinate venue setup, ensuring the conference environment runs smoothly.",
  },
  {
    id: "scientific",
    title: "Scientific Committee",
    icon: FaFlask,
    requirements: [
      "Dean / Director / Principal with a Doctorate",
      "Editorial Board Member of a Prestigious Journal",
      "Must be an experienced Reviewer",
      "Served on review committee for 10+ international conferences",
    ],
    responsibilities:
      "Comprises the Review, Technical and Editorial subcommittees. Sets key conference dates, manages paper submissions, develops the final program and evaluates abstracts for acceptance.",
  },
  {
    id: "hospitality",
    title: "Hospitality Committee",
    icon: FaHandshake,
    requirements: [
      "Dean / Director / Principal with a Doctorate",
      "Professor / HODs with 10+ years of Experience",
      "Associate / Assistant Professor with 5+ years of Experience",
      "Industrial Professionals with 8+ years of Experience",
      "Professionals from the host country",
    ],
    responsibilities:
      "Provides conference venue details, shares organizational background and addresses participant inquiries. Volunteers assist with hospitality, registration, venue setup and activities on a rotating schedule.",
  },
];

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
      "(prefers-reduced-motion: reduce)",
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

const CommitteeForm = () => {
  const countries = useMemo(() => countryList().getData(), []);
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommittee = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("phone", phone || "");
    formData.set("country", country || "");
    setIsSubmitting(true);

    try {
      await toast.promise(
        axios.post(
          `${import.meta.env.VITE_API_URL}/api/committee-applications/`,
          formData,
        ),
        {
          loading: "Submitting your committee application...",
          success: (response) =>
            response.data?.message || "Committee application submitted.",
          error: (error) =>
            error.response?.data?.message ||
            "We could not submit your application. Please try again.",
        },
      );
      form.reset();
      setPhone(undefined);
      setCountry(null);
    } catch (error) {
      console.error("Committee application submission failed:", error);
      if (error.response?.data?.saved) {
        form.reset();
        setPhone(undefined);
        setCountry(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Organizing Committee Member Application"
        description="Apply to join the WCMRP 2027 Organizing Committee. Explore committee roles, eligibility requirements, responsibilities and opportunities to contribute to international research conferences."
        path="/organizing-committee-member-form"
        keywords="WCMRP organizing committee, organizing committee member application, CERADA committee membership, academic conference committee, international research conference committee, advisory committee, scientific committee, hospitality committee, conference volunteer opportunities"
      />
      <div className="committee_form">
        <div className="speaker_head committee_form_img">
          <div>
            <span>
              <Link to="/">Home</Link> » Organizing Committee Member Form
            </span>
            <h1>
              Organizing Committee Member <span>Form</span>
            </h1>
          </div>
        </div>
        <section
          className="committee_res_section"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <div className="committee_res_head">
            <span className="mini_head">What You'll Do</span>
            <h1 className="main_head bottom_bar_left">Key Responsibilities</h1>
            <p style={{ marginTop: "6px" }}>
              Essential duties of our organizing committee members across all
              roles.
            </p>
          </div>
          <section
            className="res_list"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <div>
              <Compass />
              <h1>Strategic Guidance</h1>
              <p>Offering expert advice to guide CERADA's direction.</p>
            </div>

            <div>
              <CalendarDays />
              <h1>Conference Planning</h1>
              <p>
                Assisting in the development of conference themes and selection
                of speakers.
              </p>
            </div>

            <div>
              <MessageSquareText />
              <h1>Review and Feedback</h1>
              <p>
                Reviewing research submissions and providing constructive
                feedback.
              </p>
            </div>

            <div>
              <FileSearch />
              <h1>Abstract / Full Paper Review</h1>
              <p>
                Evaluating submissions and ensuring alignment with the
                conference theme.
              </p>
            </div>

            <div>
              <Network />
              <h1>Networking</h1>
              <p>
                Facilitating connections with other researchers and
                professionals.
              </p>
            </div>

            <div>
              <Megaphone />
              <h1>Outreach</h1>
              <p>
                Promoting CERADA's initiatives and recruiting new members and
                participants.
              </p>
            </div>

            <div>
              <GraduationCap />
              <h1>Mentorship</h1>
              <p>
                Facilitating sessions, guiding attendees and managing technical
                issues during the hybrid event.
              </p>
            </div>

            <div>
              <ClipboardList />
              <h1>Planning & Coordination</h1>
              <p>
                Assisting with the overall event organization, including venue
                logistics, agenda setting and speaker arrangements.
              </p>
            </div>

            <div>
              <Radio />
              <h1>Promotion</h1>
              <p>
                Engaging in marketing and outreach to attract participants and
                speakers.
              </p>
            </div>

            <div>
              <Users />
              <h1>Onsite Management</h1>
              <p>
                Facilitating sessions, guiding attendees and managing technical
                issues during the hybrid event.
              </p>
            </div>

            <div>
              <BookCheck />
              <h1>Post-Conference Tasks</h1>
              <p>
                Ensuring the publication of proceedings and addressing feedback.
              </p>
            </div>
          </section>
        </section>
        <section
          className="Eligibility"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <div className="committee_res_head">
            <span className="mini_head">Eligibility</span>
            <h1 className="main_head bottom_bar_left">Who We're Looking For</h1>
            <p>
              Four specialized committees, each with distinct qualifications and
              scopes of work.
            </p>
          </div>
          <section
            className="Eligibility_list"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            {committees.map(
              ({ id, title, icon: Icon, requirements, responsibilities }) => {
                return (
                  <div key={id}>
                    <InteractiveField />
                    <h1>
                      <Icon />
                      {title}
                    </h1>
                    <section>
                      <h1>Requirement</h1>
                      <ul>
                        {requirements.map((value) => {
                          return <li key={value}>{value}</li>;
                        })}
                      </ul>
                      <div>
                        <h1>responsibilities</h1>
                        <p>{responsibilities}</p>
                      </div>
                    </section>
                  </div>
                );
              },
            )}
          </section>
        </section>
        <section
          className="committee_form_field"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <div
            className="committee_res_head"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <span className="mini_head">Apply Now</span>
            <h1 className="main_head bottom_bar_left">Ready to Join?</h1>
            <p>
              Complete the form below to join our distinguished committee and
              help shape the future of research.
            </p>
          </div>
          <div
            className="committee_form_head"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <div>
              <span className="mini_head">CERADA</span>
              <h1>Committee Application</h1>
            </div>
            <div>
              <p>Personal</p>
              <ChevronRight />
              <p>Professional</p>
              <ChevronRight />
              <p>Academic</p>
              <ChevronRight />
              <p>Submit</p>
            </div>
          </div>
          <form
            className="committee_member_form mis_cl"
            onSubmit={handleCommittee}
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <InteractiveField />
            <fieldset>
              <div className="committee_form_section_heading">
                <h1>1. Personal Information</h1>
                <p>Your basic contact details</p>
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-title">Title *</label>
                <select id="committee-title" name="title" required>
                  <option value="">Select Title</option>
                  <option>Mr</option>
                  <option>Ms</option>
                  <option>Dr</option>
                  <option>Prof</option>
                </select>
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-full-name">Full Name *</label>
                <input
                  id="committee-full-name"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-email">Email *</label>
                <input
                  id="committee-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-whatsapp">
                  WhatsApp / Viber Number *
                </label>
                <PhoneInput
                  international
                  defaultCountry="IN"
                  name="phone"
                  value={phone}
                  onChange={setPhone}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-country">Country *</label>
                <select
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c.value} value={c.label}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-member-category">
                  Member Category *
                </label>
                <select
                  id="committee-member-category"
                  name="memberCategory"
                  required
                >
                  <option value="">Select Category</option>
                  <option>Advisory</option>
                  <option>Scientific</option>
                  <option>Hospitality</option>
                </select>
              </div>
            </fieldset>

            <fieldset>
              <div className="committee_form_section_heading">
                <h1>2. Professional Background</h1>
                <p>Your institution and experience</p>
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-organization">
                  University / Institute / Organization *
                </label>
                <input
                  id="committee-organization"
                  type="text"
                  name="organization"
                  placeholder="Enter your university or organization"
                  required
                />
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-department">Department *</label>
                <input
                  id="committee-department"
                  type="text"
                  name="department"
                  placeholder="Enter your department"
                  required
                />
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-qualification">Qualification *</label>
                <input
                  id="committee-qualification"
                  type="text"
                  name="qualification"
                  placeholder="Enter your qualification"
                  required
                />
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-professional-experience">
                  Professional Experience *
                </label>
                <input
                  id="committee-professional-experience"
                  type="text"
                  name="professionalExperience"
                  placeholder="e.g. 5 years"
                  required
                />
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-industry-experience">
                  Industry Experience *
                </label>
                <input
                  id="committee-industry-experience"
                  type="text"
                  name="industryExperience"
                  placeholder="e.g. 3 years"
                  required
                />
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-specialization">
                  Area of Specialization *
                </label>
                <input
                  id="committee-specialization"
                  type="text"
                  name="specialization"
                  placeholder="Enter your area of specialization"
                  required
                />
              </div>

              <div
                className="committee_form_group committee_radio_group"
                role="group"
                aria-labelledby="committee-associated-label"
              >
                <span
                  id="committee-associated-label"
                  className="committee_form_label"
                >
                  Associated with CERADA? *
                </span>
                <div className="committee_radio_options">
                  <label>
                    <input
                      type="radio"
                      name="ceradaAssociated"
                      value="Yes"
                      required
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="ceradaAssociated"
                      value="No"
                      required
                    />
                    No
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <div className="committee_form_section_heading">
                <h1>3. Academic Profile</h1>
                <p>Your research and publication record</p>
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-h-index">H-Index *</label>
                <input
                  id="committee-h-index"
                  type="number"
                  min="0"
                  name="hIndex"
                  placeholder="Enter your H-Index"
                  required
                />
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-scopus-publications">
                  No. of Scopus Publications *
                </label>
                <input
                  id="committee-scopus-publications"
                  type="number"
                  min="0"
                  name="scopusPublications"
                  placeholder="Enter the number of publications"
                  required
                />
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-sci-publications">
                  No. of SCI / WoS Publications *
                </label>
                <input
                  id="committee-sci-publications"
                  type="number"
                  min="0"
                  name="sciPublications"
                  placeholder="Enter the number of publications"
                  required
                />
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-editor-reviewer">
                  Editor / Reviewer in Journals *
                </label>
                <input
                  id="committee-editor-reviewer"
                  type="text"
                  name="editorReviewer"
                  placeholder="Enter your journal roles"
                  required
                />
              </div>
            </fieldset>

            <fieldset>
              <div className="committee_form_section_heading">
                <h1>4. Submission</h1>
                <p>Final details and your CV</p>
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-found-event">
                  How Did You Find Out About the Event? *
                </label>
                <input
                  id="committee-found-event"
                  type="text"
                  name="foundEventVia"
                  placeholder="How did you hear about the event?"
                  required
                />
              </div>

              <div className="committee_form_group">
                <label htmlFor="committee-cv">
                  Upload CV * (PDF, DOC, DOCX)
                </label>
                <input
                  id="committee-cv"
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  required
                />
                <small>Maximum file size: 300KB</small>
              </div>
            </fieldset>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Submitting Application..."
                : "Submit Application"}
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default CommitteeForm;
