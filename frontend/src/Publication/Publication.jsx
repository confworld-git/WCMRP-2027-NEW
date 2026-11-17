import "./Publication.css";
import { Link } from "react-router-dom";
import proceeding from "../assets/Images/proceeding.jpeg";
import scopus from "../assets/Logo/scopus-logo.png";
import { FileCheckCorner, UserStar } from "lucide-react";
import PublicationList from "../Home/PublicationList/PublicationList";
import Proceeding from "../Home/Proceeding/Proceeding";

const Publication = () => {
  return (
    <div className="Publication_section publication-shell">
      <div className="speaker_head publication_img">
        <div>
          <span>
            <Link to="/">Home</Link> » Publiction
          </span>
          <h1>
            <span>Publication</span>
          </h1>
          <p>
            Discover publishing opportunities that enhance research visibility
            and promote academic excellence worldwide.
          </p>
        </div>
      </div>
      <div className="pub_lst">
        <PublicationList />
      </div>
      <div
        className="publication-intro"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <span className="Hybrid">Publication Venues</span>
        <h1 className="main_head">Presented Research Outlets</h1>
        <p className="bottom_bar">
          The WCMRP-2027 provides several peer-reviewed publication
          opportunities for all accepted and registered papers.
        </p>
      </div>
      <section
        className="publication-showcase"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <div
          className="publication-card"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <img src={proceeding} alt="Conference proceedings" />
          <div className="publication-card-body">
            <h1>Conference Proceedings</h1>
            <p>
              All accepted and registered abstracts will be published in the
              official Conference Proceedings with an ISBN Number.
            </p>
          </div>
        </div>
        <div
          className="publication-card"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <img src={scopus} alt="Scopus journal publication logo" />
          <div className="publication-card-body">
            <h1>Journal Publication</h1>
            <p>
              Elevate your presented paper's reach by submitting to premier Web
              of Science, Scopus, and other internationally indexed journals.
            </p>
          </div>
        </div>
      </section>
      <div
        className="publication-intro publication-ethics-header"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <span className="Hybrid">Ethics & Standards</span>
        <h1 className="main_head bottom_bar">
          Plagiarism Policy & Publication Ethics
        </h1>
      </div>
      <section
        className="publication-ethics"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <div
          className="ethics-item"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <div className="ethics-icon">
            <FileCheckCorner />
          </div>
          <div className="ethics-content">
            <h1>Plagiarism Check</h1>
            <ul>
              <li>
                Every submission undergoes a thorough plagiarism check using
                Crossref Similarity Check, powered by iThenticate.
              </li>
              <li>
                This ensures that all articles submitted to the conference are
                original and conform to standard scientific citation policies.
              </li>
            </ul>
          </div>
        </div>
        <div
          className="ethics-item"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <div className="ethics-icon">
            <UserStar />
          </div>
          <div className="ethics-content">
            <h1>Review Process</h1>
            <ul>
              <li>
                Submissions that pass the plagiarism screening are sent directly
                to the scientific committee for peer evaluation.
              </li>
              <li>
                Any manuscript found to be plagiarized at any stage of
                evaluation will be automatically rejected.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Proceeding />
    </div>
  );
};

export default Publication;
