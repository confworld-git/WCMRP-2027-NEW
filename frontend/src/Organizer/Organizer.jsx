import "./Organizer.css";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { useEffect, useRef } from "react";
import student from "../assets/Images/Student_membership.jpg";
import professional from "../assets/Images/Professional_membership.jpg";
import institute from "../assets/Images/Institute_membership.jpg";
import confImg from "../assets/commonheroimages/8.webp";
import SEO from "../SEO.jsx";

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

const Organizer = () => {
  return (
    <>
      <SEO
        title="About CERADA | Confworld Educational Research & Development Association"
        description="Discover CERADA, an international educational research and development association promoting academic conferences, research publications, educational initiatives and global collaboration."
        keywords="CERADA, Confworld Educational Research and Development Association, CERADA organization, educational research association, international academic conferences, research publication services, academic collaboration, educational initiatives, research development"
        path="/About-Organizer"
        image="https://confworld.org/images/blog-banner-new.png"
      />
      <div className="about_organizer">
        <div className="speaker_head organizer_img">
          <div>
            <span>
              <Link to="/">Home</Link> » About organizer
            </span>
            <h1>
              About <span>CERADA</span>
            </h1>
            <p>
              Confworld Educational Research And Development Association
              (CERADA)
            </p>
          </div>
        </div>
        <section className="organizer_content">
          <div
            className="organize_head"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <span className="Hybrid">Who We Are</span>
            <h1 className="main_head">CERADA</h1>
            <p className="bottom_bar_left">
              Confworld Educational Research And Development Association
            </p>
          </div>
          <section
            className="about_cerada_cnt"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <div>
              <p>
                The Confworld Educational Research And Development Association
                (CERADA) is an internationally recognized, globally operating
                multidisciplinary professional research and development
                association. CERADA aims to integrate researchers and
                academicians working in the micro disciplines of science and
                technology, fostering collaboration and innovation across a
                broad spectrum of fields. <br /> We organize top-tier
                international conferences, offering a platform for researchers
                and professionals to present their work, share ideas and
                network. Our publication services support the submission of
                research papers to reputable, double blind peer-reviewed
                journals, ensuring successful publication through editing and
                peer-review assistance.
              </p>
              <div className="learn_more">
                <a href="https://confworld.org/" target="_blank">
                  LEARN MORE <MoveRight />
                </a>
              </div>
            </div>
            <div className="conf_img">
              <img src={confImg} alt="" />
            </div>
          </section>
          <section
            className="mission_vision"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <div
              className="mission mis_cl"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
            >
              <InteractiveField />
              <span>Our Mission</span>
              <h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-zap preview-icon"
                >
                  <path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" />
                </svg>
                Mission
              </h1>
              <p>
                CERADA advances global education and research through
                international conferences, research assistance and collaborative
                publications, fostering an inclusive environment for knowledge
                sharing and innovation.
              </p>
              <ul>
                <li>International Conferences & Events</li>
                <li>Research Assistance & Publications</li>
                <li>Knowledge Sharing & Innovation</li>
              </ul>
            </div>
            <div
              className="mission mis_cl"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
            >
              <InteractiveField />
              <span>Our Vision</span>
              <h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-telescope preview-icon"
                >
                  <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
                  <path d="m13.56 11.747 4.332-.924" />
                  <path d="m16 21-3.105-6.21" />
                  <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
                  <path d="m6.158 8.633 1.114 4.456" />
                  <path d="m8 21 3.105-6.21" />
                  <circle cx="12" cy="13" r="2" />
                </svg>
                Vision
              </h1>
              <p>
                CERADA envisions a borderless educational research community
                committed to lifelong learning and excellence — a catalyst for
                transformative advancements through cutting-edge research and
                international partnerships.
              </p>
              <ul>
                <li>Borderless Research Community</li>
                <li>Lifelong Learning & Excellence</li>
                <li>Transformative Global Partnerships</li>
              </ul>
            </div>
          </section>
          <section
            className="our_services"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <span className="mini_head">Our Services</span>
            <h1 className="main_head">What We Do</h1>
            <p>
              Building a dynamic community of professionals, educators,
              researchers and innovators.
            </p>
            <div
              className="service_list"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
            >
              <div>
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-globe-check preview-icon"
                  >
                    <path d="m15 6 2 2 4-4" />
                    <path d="M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10" />
                  </svg>
                </i>
                <h1>International Conferences</h1>
                <p>
                  Top-tier global platforms for researchers to present work,
                  share ideas and network across disciplines.
                </p>
              </div>
              <div>
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-book-open-check preview-icon"
                  >
                    <path d="M12 5v16" />
                    <path d="m16 12 2 2 4-4" />
                    <path d="M22 6V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2h4.001A2 2 0 0022 17v-1.344" />
                  </svg>
                </i>
                <h1>Publication Services</h1>
                <p>
                  Expert support for submitting research to reputable
                  peer-reviewed journals with editing assistance.
                </p>
              </div>
              <div>
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-folder-users preview-icon"
                  >
                    <path d="M5.254 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2V9.255" />
                    <circle cx="13" cy="15" r="3" />
                    <path d="M17 22a4 4 0 0 0-8 0" />
                    <path d="M22 22A4 4 0 0 0 20.24 18.686 1 1 0 0 1 20.1 17.143 3 3 0 0 0 19.5 12.402" />
                  </svg>
                </i>
                <h1>Educational Initiatives</h1>
                <p>
                  Comprehensive programs including workshops, webinars, training
                  and faculty development.
                </p>
              </div>
              <div>
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-microscope preview-icon"
                  >
                    <path d="M6 18h8" />
                    <path d="M3 22h18" />
                    <path d="M14 22a7 7 0 1 0 0-14h-1" />
                    <path d="M9 14h2" />
                    <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
                    <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
                  </svg>
                </i>
                <h1>Research Innovation</h1>
                <p>
                  Fostering curiosity and advancing knowledge in engineering,
                  technology and multidisciplinary fields.
                </p>
              </div>
            </div>
          </section>
          <section
            className="be_part"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <span className="mini_head">Be Part of CERADA</span>
            <h1 className="main_head">Join Our Community</h1>
            <div className="community_list">
              <a
                href="https://confworld.org/institutional-membership"
                target="_blank"
              >
                <img src={institute} alt="" />
                <div>
                  <h1>Institutional</h1>
                  <p>For Organizations</p>
                  <span>
                    Learn More{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-arrow-right preview-icon"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </a>
              <a
                href="https://confworld.org/professional-membership"
                target="_blank"
              >
                <img src={professional} alt="" />
                <div>
                  <h1>Professional</h1>
                  <p>For Professionals</p>
                  <span>
                    Learn More{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-arrow-right preview-icon"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </a>
              <a
                href="https://confworld.org/student-membership"
                target="_blank"
              >
                <img src={student} alt="" />
                <div>
                  <h1>Student</h1>
                  <p>For Students</p>
                  <span>
                    Learn More{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-arrow-right preview-icon"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </a>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default Organizer;
