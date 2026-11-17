import {
  FaUsers,
  FaBookOpen,
  FaFileAlt,
  FaChartLine,
  FaGlobe,
} from "react-icons/fa";
import "./Why.css";

const reasons = [
  {
    icon: <FaUsers />,
    title: "Global Research Exposure",
    description:
      "Connect with experts, scholars and practitioners across various disciplines from around the world.",
  },
  {
    icon: <FaBookOpen />,
    title: "Knowledge Sharing",
    description:
      "Gain insights from keynote speakers, diverse presentations and cutting-edge interdisciplinary research.",
  },
  {
    icon: <FaFileAlt />,
    title: "Publication Prospects",
    description:
      "Present your research and get published in reputable Scopus-indexed journals and Clarivate WoS proceedings.",
  },
  {
    icon: <FaChartLine />,
    title: "Professional Development",
    description:
      "Enhance your skills and expertise through collaborative discussions and hands-on workshops.",
  },
  {
    icon: <FaGlobe />,
    title: "Global Perspective",
    description:
      "Engage with international participants addressing global challenges through innovative interdisciplinary solutions.",
  },
];

const Why = () => {
  return (
    <section className="why-section" data-aos="fade-up"
     data-aos-anchor-placement="top-bottom">
      <div className="why-header">
        <span className="mini_head">JOIN US</span>
        <h1 className="main_head">Why Do You Join Us?</h1>
      </div>

      <div className="why-grid" data-aos="fade-up"
     data-aos-anchor-placement="top-bottom">
        {reasons.map(({ icon, title, description }) => (
          <article key={title} className="why-card" >
            <div className="why-icon-wrap">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Why;
