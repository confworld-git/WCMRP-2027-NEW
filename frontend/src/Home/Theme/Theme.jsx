import "./Theme.css";
import { LuBookOpen } from "react-icons/lu";
import { HiOutlineChip } from "react-icons/hi";
import { RiHeart3Line } from "react-icons/ri";
import { LuGlobe } from "react-icons/lu";

const Theme = () => {
  return (
    <div className="conference_theme" data-aos="fade-up" data-aos-anchor-placement="top-bottom" >
      <div>
        <span>Conference Theme</span>
        <h1>
          "Integrating Knowledge Across Disciplines for Global Impact:
          Innovations, Challenges and Sustainable Solutions"
        </h1>
        <p>
          The WCMRP - 2027 theme emphasizes the importance of bringing together
          diverse fields of study to address pressing global issues through
          innovation and collaboration.
        </p>
      </div>
      <section className="theme_category" data-aos="fade-up" data-aos-anchor-placement="top-bottom" >
        <div>
          <div>
            <LuBookOpen />
          </div>
          <h1>Education</h1>
          <p>Pedagogy & Learning</p>
        </div>
        <div>
          <div>
            <HiOutlineChip />
          </div>
          <h1>Technology</h1>
          <p>Engineering & Science</p>
        </div>
        <div>
          <div>
            <RiHeart3Line />
          </div>
          <h1>Social</h1>
          <p>Humanities & Arts</p>
        </div>
        <div>
          <div>
            <LuGlobe />
          </div>
          <h1>Global</h1>
          <p>Sustainability & Growth</p>
        </div>
      </section>
    </div>
  );
};

export default Theme;
