import "./Committee.css";
import { Link } from "react-router-dom";
import vicky from "../../assets/Images/vicky.jpeg";

export const Skeleton = () => {
  return (
    <div className="speaker_card_skeleton" data-aos="fade-up"
     data-aos-anchor-placement="top-bottom">
      <div className="skeleton_image"></div>
      <div className="skeleton_line skeleton_name"></div>
      <div className="skeleton_line skeleton_text"></div>
      <div className="skeleton_line skeleton_text"></div>
    </div>
  );
};

const Committee = () => {
  return (
    <div className="speacker_section">
      <div className="speaker_head speaker_img">
        <div>
          <span>
            <Link to="/">Home</Link> » Organizing Committee
          </span>
          <h1>
            Organizing Committee <br />
            <span>Members</span>
          </h1>
          <p>
            Learn from renowned academicians, industry experts,
            <br /> and research professionals at WCMRP 2027.
          </p>
        </div>
      </div>
      <section className="speackers_list" data-aos="fade-up"
     data-aos-anchor-placement="top-bottom">
        <div>
          <span className="mini_head">Committee Division</span>
          <h1 className="main_head bottom_bar_left">Scientific Committee</h1>
          <section className="keynote_speaker">
            <div data-aos="fade-up"
     data-aos-anchor-placement="top-bottom">
              <img src={vicky} alt="" />
              <h1>Vigneshwaran K</h1>
              <p>Professional full-stack web developer,</p>
              <p>GKM Institute of Marine Science and Technology, chennai.</p>
            </div>
            <Skeleton />
          </section>
        </div>
      </section>
    </div>
  );
};

export default Committee;
