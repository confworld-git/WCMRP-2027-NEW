import "./Session.css";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Session = () => {
  const navigate = useNavigate();
  const images = Object.values(
    import.meta.glob("/src/assets/sessions/*", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  );
  return (
    <div
      className="session_list"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
    >
      <span>Research Tracks</span>
      <div>
        <h1 className="main_head">Session Tracks / Call for Papers</h1>
        <p
          className="Hybrid"
          onClick={() => navigate("/Session-Tracks-&-Call-For-Papers")}
        >
          View All Topics <IoArrowForward />
        </p>
      </div>
      <section data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        {images.map((url, index) => {
          return <img src={url} key={index} />;
        })}
      </section>
    </div>
  );
};

export default Session;
