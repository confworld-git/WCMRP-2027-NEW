import "./Guidelines.css";
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Guidelines = () => {
  const navigate = useNavigate();
  return (
    <div
      className="Guidelines"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
    >
      <div className="guidelines-card">
        <div className="guidelines-copy">
          <span className="mini_head">Submission Guidelines</span>
          <h1 className="main_head">Prepare Your Research Submission</h1>
          <p>
            Access detailed submission instructions, formatting requirements and
            publication guidelines for abstracts and full papers.
          </p>
        </div>

        <div className="guidelines-actions">
          <p>
            Ensure your submission meets all conference standards and
            publication criteria before final submission.
          </p>

          <div className="guidelines-buttons">
            <button
              className="primary-btn"
              type="button"
              onClick={() => navigate("/Registration-Fee")}
            >
              Register Now{" "}
              <span aria-hidden="true">
                <GoArrowUpRight />
              </span>
            </button>
            <button
              className="secondary-btn"
              type="button"
              onClick={() => navigate("/abstract-full-paper-submission")}
            >
              Submit Paper{" "}
              <span aria-hidden="true">
                <GoArrowUpRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
