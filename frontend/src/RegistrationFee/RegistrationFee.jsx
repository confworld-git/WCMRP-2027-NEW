import "./RegistrationFee.css";
import {
  UserRoundGroup,
  Award,
  BadgeCheck,
  FileText,
  SquareText,
  BadgeDollarSign,
  ScanText,
  CalendarClock,
} from "lucide-react";
import RegistrationSteps from "../Home/RegistrationSteps/RegistrationSteps.jsx";
import FeeForm from "./FeeForm.jsx";
// import Confetti from "../Confetti/Confetti.jsx";
import Fireworks from "../Confetti/Fireworks.jsx";

const RegistrationFee = () => {
  return (
    <div className="registration_fee">
      <div
        className="celebration"
        data-aos="fade-down"
        data-aos-anchor-placement="top-bottom"
      >
        {/* <Confetti active={true} /> */}
        <Fireworks active={true} burstKey={1} count={20} />
        <h1>
          Claim a <span>5% discount</span> on registration with CERADA's <br />{" "}
          exclusive Premium Membership
        </h1>
        <div>
          <a href="https://confworld.org/student-membership/" target="_blank">
            Student
          </a>
          <a
            href="https://confworld.org/professional-membership"
            target="_blank"
          >
            Professional
          </a>
        </div>
      </div>
      <div
        className="registration_head"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <h1 className="main_head">Registration</h1>
        <p className="bottom_bar">
          Welcome to the WCMRP-2027 registration page. Secure your spot at this
          premier conference to connect with global experts, present your
          research and advance your career. Follow the steps below to complete
          your registration.
        </p>
      </div>
      <section
        className="group_discount"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <div className="group_discount_first">
          <div className="group_discount_first_head">
            <UserRoundGroup />
            <div>
              <h1>Group Discount</h1>
              <p>Maximize savings through collaborative registration</p>
            </div>
          </div>
          <div className="roup_discount_eligible">
            <span>
              <Award />
              Eligibility
            </span>
            <p>
              <BadgeCheck />
              Groups of <span>5 or more</span> individual members.
            </p>
            <p>
              <BadgeCheck />
              Registered <span>co-authors</span> of a paper presentation.
            </p>
          </div>
          <div className="group_discount_large">
            <h1>Large Groups (10+)</h1>
            <p>
              Contact our Academic Partnership Team for bespoke discount
              structures and enhanced institutional benefits.
            </p>
          </div>
        </div>
        <div
          className="paper_submit_discount"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <div className="group_discount_first_head">
            <FileText />
            <div>
              <h1>Paper Submissions</h1>
              <p>Guidelines for multiple presentation entries</p>
            </div>
          </div>
          <div className="paper_submit_discount_list">
            <div>
              <SquareText />
              <h1>Submission Limit</h1>
              <p>Maximum of 3 papers per primary author.</p>
            </div>
            <div>
              <BadgeDollarSign />
              <h1>Additional Fee</h1>
              <p>$150 USD per extra oral/poster presentation</p>
            </div>
            <div>
              <ScanText />
              <h1>Scopus Indexing</h1>
              <p>Separate publication fees apply per paper.</p>
            </div>
          </div>
          <div className="paper_submit_deadline">
            <CalendarClock />
            <h1>Final Confirmation Deadline</h1>
            <p>
              Paper counts must be finalized with the Coordinator{" "}
              <span>3 weeks</span> prior to the final payment date.
            </p>
          </div>
        </div>
      </section>
      <RegistrationSteps />
      <FeeForm />
    </div>
  );
};

export default RegistrationFee;
