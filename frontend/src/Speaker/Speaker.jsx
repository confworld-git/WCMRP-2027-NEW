import "./Speaker.css";
import { Link } from "react-router-dom";

export const Skeleton = () => {
  return (
    <div
      className="speaker_card_skeleton"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
    >
      <div className="skeleton_image"></div>
      <div className="skeleton_line skeleton_name"></div>
      <div className="skeleton_line skeleton_text"></div>
      <div className="skeleton_line skeleton_text"></div>
    </div>
  );
};

const Speaker = () => {
  return (
    <div className="speacker_section">
      <div className="speaker_head speaker_img">
        <div>
          <span>
            <Link to="/">Home</Link> » Speakers
          </span>
          <h1>
            Meet Our Distinguished <br />
            <span>Speakers</span>
          </h1>
          <p>
            Learn from renowned academicians, industry experts,
            <br /> and research professionals at WCMRP 2027.
          </p>
        </div>
      </div>
      <section className="speackers_list">
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          <span className="mini_head">Distinguished Roles</span>
          <h1 className="main_head bottom_bar_left">Keynote Speakers</h1>
          <section className="keynote_speaker">
            {/* <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
              <img src={vicky} alt="" />
              <h1> K</h1>
              <p></p>
              <p></p>
            </div> */}
            <Skeleton />
          </section>
        </div>
      </section>
    </div>
  );
};

export default Speaker;
