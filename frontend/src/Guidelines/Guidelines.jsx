import "./Guidelines.css";
import { Link } from "react-router-dom";
import {
  Layers,
  SquareText,
  CircleCheck,
  Info,
  Award,
  MailBadge,
} from "lucide-react";

const Guidelines = () => {
  return (
    <div className="Guidelines_main">
      <div className="speaker_head guide_img">
        <div>
          <span>
            <Link to="/">Home</Link> » Submission Guidelines
          </span>
          <h1>
            Author <span>Requirements</span>
          </h1>
          <p>
            Ensure your research meets the WCMRP-2027 quality standards by
            following our standardized submission protocols outlined below.
          </p>
        </div>
      </div>
      <section data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        <div
          className="left_guide"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <div>
            <h1>
              <Layers />
              Abstract Submission Guidelines
            </h1>
            <ul>
              <li>
                <CircleCheck />
                The original work should be described in the abstract.
              </li>
              <li>
                <CircleCheck />
                Abstract should be written in English.
              </li>
              <li>
                <CircleCheck />
                It should be one paragraph with a word limit of 150.
              </li>
              <li>
                <CircleCheck />
                Please provide a slight biography with your abstract (an example
                is given in the template).
              </li>
              <li>
                <CircleCheck />
                The abstract should be submitted in the format of an MS Word
                (.doc or .docx) document.
              </li>
              <li>
                <CircleCheck />
                After you've finished preparing your abstract according to the
                above instructions, submit your abstract here.
              </li>
              <li>
                <CircleCheck />
                After submission, you will be acknowledged of the receipt of the
                abstract via email within three working days.
              </li>
              <li>
                <CircleCheck />
                The Title, Author's Names and Affiliations should be centred.
              </li>
              <li>
                <CircleCheck />
                Please underline the presenting author.
              </li>
              <li>
                <CircleCheck />
                Corresponding author E-mail should be there.
              </li>
            </ul>
          </div>
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            <h1>
              <SquareText />
              Full Paper Submission Guidelines
            </h1>
            <p>
              "You are encouraged to submit full papers if your abstract is
              accepted and you have paid the registration cost for the
              WCMRP-2027"
            </p>
            <ul>
              <li>
                <CircleCheck />
                Total number of pages must be 6–8 in double-column format.
              </li>
              <li>
                <CircleCheck />
                The manuscript should be written in English and checked for
                grammar and language errors.
              </li>
              <li>
                <CircleCheck />
                Tables, figures, and images should be properly named and of good
                quality.
              </li>
              <li>
                <CircleCheck />
                The Title, Author's Names, and Affiliations should be centred.
                Please underline the presenting author. The corresponding
                author's E-mail should be included.
              </li>
              <li>
                <CircleCheck />
                Abstract should not exceed 150 words.
              </li>
              <li>
                <CircleCheck />
                Minimum 5 Keywords should be written in lowercase letters and
                italics (not applicable to names/scientific names) and separated
                by commas.
              </li>
              <li>
                <CircleCheck />
                Names of affiliations should be provided, including the country.
              </li>
              <li>
                <CircleCheck />
                Background/Introduction, Motivation, and Objectives.
              </li>
              <li>
                <CircleCheck />
                Statement of Contribution/Methods.
              </li>
              <li>
                <CircleCheck />
                Results, Discussion, and Conclusion.
              </li>
              <li>
                <CircleCheck />
                Funding statement.
              </li>
              <li>
                <CircleCheck />
                Acknowledgements.
              </li>
              <li>
                <CircleCheck />
                References: Minimum 35 references should be included, with at
                least 30% published within the last 2 years. Authors may submit
                their references in Chicago style. Authors are responsible for
                ensuring that the information in each reference is complete and
                accurate. All references should be numbered consecutively in the
                order of their first citation. Citations in the text should be
                identified using numbers in square brackets, e.g., "as discussed
                by Smith [9]" or "as discussed elsewhere [9, 10]". All
                references should be cited within the text, and uncited
                references will be removed.
              </li>
              <li>
                <CircleCheck />
                The paper should be submitted in the format of an MS Word (.doc
                or .docx) document.
              </li>
              <li>
                <CircleCheck />
                After you've finished preparing your full paper according to the
                above instructions, submit your full paper here.
              </li>
            </ul>
          </div>
        </div>
        <div className="right_guide"></div>
      </section>
      <section
        className="Quick"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <button data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          <MailBadge /> Contact Committee
        </button>
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          <h1>
            <Info />
            Quick Support
          </h1>
          <p>
            Questions regarding formatting or the submission portal? Contact our
            team.
          </p>
        </div>
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          <h1>
            <Award />
            Standardized Formatting
          </h1>
          <p>
            All submissions must follow the MS Word templates provided to ensure
            consistent publication quality.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Guidelines;
