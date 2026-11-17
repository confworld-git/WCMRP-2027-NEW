import "./Welcome.css";
import { LuBookOpen } from "react-icons/lu";
import { LuClipboardList } from "react-icons/lu";
import { LuLayers3 } from "react-icons/lu";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="welcome_section">
      <div
        className="welcome_left"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <span>WELCOME TO WCMRP-2027</span>
        <h1>WELCOME TO WCMRP - 2027</h1>
        <p>
          Welcome to the 3<sup>rd</sup> World Conference on Multidisciplinary Research and
          Practice (WCMRP-2027). This premier international conference brings
          together leading scholars, researchers, engineers and practitioners
          from around the globe to share breakthrough research, exchange
          pioneering ideas and address critical challenges across diverse
          academic fields.
          <br />
          <br />
          <strong>Our mission</strong> is to foster cross-disciplinary
          collaboration and promote sustainable solutions that shape the future
          of global research and education.
        </p>
      </div>
      <div
        className="welcome_right"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <div onClick={() => navigate("/abstract-full-paper-submission")}>
          <div>
            <h1>
              <div>
                <LuClipboardList />
              </div>
              Abstract Submission
            </h1>
            <p>Submit your research abstract for evaluation</p>
          </div>
          <FiArrowUpRight />
        </div>
        <div onClick={() => navigate("/Registration-Fee")}>
          <div>
            <h1>
              <div>
                <LuLayers3 />
              </div>
              Registration Fees
            </h1>
            <p>View packages for delegates and presenters</p>
          </div>
          <FiArrowUpRight />
        </div>
        <div onClick={() => navigate("/Publication")}>
          <div>
            <h1>
              <div>
                <LuBookOpen />
              </div>
              Research Publications
            </h1>
            <p>Explore Scopus & WoS indexings</p>
          </div>
          <FiArrowUpRight />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
