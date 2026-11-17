import LandingPage from "./LandingPage/LandingPage";
import SDG from "./SDG/SDG";
import Welcome from "./Welcome/Welcome";
import Theme from "./Theme/Theme";
import PublicationList from "./PublicationList/PublicationList";
import Highlights from "./Highlights/Highlights";
import Session from "./Session/Session";
import Deadline from "./Deadline/Deadline";
import Guidelines from "./Guidelines/Guidelines";
import RegistrationSteps from "./RegistrationSteps/RegistrationSteps";
import Why from "./Why/Why";
import Proceeding from "./Proceeding/Proceeding";
import SEO from "../SEO.jsx";

const Homepage = () => {
  return (
    <div className="homepage">
      <SEO
        title="3rd World Conference on Multidisciplinary Research & Practices | WCMRP 2027"
        description="Join WCMRP 2027 on 24–25 May in Kuala Lumpur, Malaysia. Present your research, explore multidisciplinary innovations, connect with global scholars and discover publication opportunities."
        keywords="WCMRP 2027, World Conference on Multidisciplinary Research, international research conference 2027, multidisciplinary conference Malaysia, academic conference Kuala Lumpur, research paper submission, Scopus publication opportunities, global academic conference, call for papers 2027"
        path="/"
        image="https://wcmrp.com/assets/Logo/WCMRPLogo.jpeg"
      />
      <LandingPage />
      <SDG />
      <Welcome />
      <Theme />
      <PublicationList />
      <Highlights />
      <Session />
      <Deadline />
      <Guidelines />
      <RegistrationSteps />
      <Why />
      <Proceeding />
    </div>
  );
};

export default Homepage;
