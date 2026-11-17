import "./About.css";
import {
  UsersRound,
  Leaf,
  Lightbulb,
  Landmark,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../SEO.jsx";

const About = () => {
  return (
    <>
      <SEO
        title="About WCMRP 2027 | Multidisciplinary Research Conference"
        description="Discover WCMRP 2027, the 3rd World Conference on Multidisciplinary Research and Practices, bringing global researchers together to address challenges through innovation."
        keywords="About WCMRP 2027, multidisciplinary research conference, international research conference, interdisciplinary collaboration, sustainable development, research and innovation, academic conference Malaysia"
        path="/About-WCMRP"
        image={`${import.meta.env.VITE_FRONT_END_ULR}/assets/Images/aw.jpg`}
      />
      <div>
        <div className="speaker_head about_wcmrp_img">
          <div>
            <span>
              <Link to="/">Home</Link> » About WCMRP
            </span>
            <h1>
              About <span>WCMRP</span>
            </h1>
            <p>
              3rd World Conference on Multidisciplinary Research and Practices
            </p>
          </div>
        </div>

        <div className="about_wcmrp">
          <section
            className="about_section"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <div className="about_section_left">
              <span className="mini_head">About the Conference</span>
              <h1 className="main_head">
                3<sup>rd</sup> Edition of WCMRP-2027
              </h1>
              <h3>
                The{" "}
                <span>
                  3<sup>rd</sup> World Conference on Multidisciplinary Research
                  and Practices
                </span>{" "}
                is a premier event designed to bring together researchers,
                professionals, and scholars from diverse fields — focused on
                innovative approaches and collaborative research to address
                global challenges.
              </h3>
              <p>
                By fostering interdisciplinary dialogue, WCMRP aims to inspire
                new ideas and solutions that contribute to sustainable
                development and societal advancement.
              </p>
              <div>
                <div>
                  <h1>Hybrid</h1>
                  <p>In-Person + Virtual</p>
                </div>
                <div>
                  <h1>KL</h1>
                  <p>Kuala Lumpur, Malaysia</p>
                </div>
                <div>
                  <h1>2027</h1>
                  <p>
                    3<sup>rd</sup> Edition
                  </p>
                </div>
              </div>
            </div>
            <div className="about_section_right">
              <span className="mini_head">Conference Theme</span>
              <h1>
                Integrating Knowledge Across Disciplines for Global Impact:
                Innovations, Challenges and Sustainable Solutions
              </h1>
              <p>
                This theme emphasizes the importance of interdisciplinary
                collaboration and innovative strategies in addressing pressing
                global issues — generating impactful solutions for sustainable
                development and societal resilience.
              </p>
            </div>
          </section>
          <section
            className="key_focus"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <span className="mini_head">Research Domains</span>
            <h1 className="main_head">Key Focus Areas</h1>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
              <div>
                <div>
                  <UsersRound />
                  <h1>Interdisciplinary Collaboration</h1>
                </div>
                <p>
                  Encouraging partnerships across various fields to enhance
                  research impact.
                </p>
              </div>

              <div>
                <div>
                  <Leaf />
                  <h1>Sustainable Development</h1>
                </div>
                <p>
                  Exploring innovative solutions for environmental, social and
                  economic sustainability.
                </p>
              </div>

              <div>
                <div>
                  <Lightbulb />
                  <h1>Technology and Innovation</h1>
                </div>
                <p>
                  Leveraging new technologies and methods to tackle global
                  challenges.
                </p>
              </div>

              <div>
                <div>
                  <Landmark />
                  <h1>Policy and Governance</h1>
                </div>
                <p>
                  Discussing effective strategies for implementing research
                  findings in policy frameworks.
                </p>
              </div>

              <div>
                <div>
                  <GraduationCap />
                  <h1>Education and Capacity Building</h1>
                </div>
                <p>
                  Enhancing skills and knowledge-sharing among researchers and
                  practitioners.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="redirection_link">
          <h1>Ready to contribute? Submit your paper and join WCMRP-2027.</h1>
          <a href="">
            Submit Paper
          </a>
        </div>
      </div>
    </>
  );
};

export default About;
