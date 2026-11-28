import "./Committee.css";
import { Link } from "react-router-dom";
import male from "../../assets/speakers/male.jpg";
import female from "../../assets/speakers/female.jpg";

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
      <section
        className="speackers_list"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <div>
          <span className="mini_head">Committee Division</span>
          <h1 className="main_head bottom_bar_left">Scientific Committee</h1>
          <section className="keynote_speaker">
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
              <img src={female} alt="Female Profile Picture" />
              <h1>Dr. Shanthi Makka</h1>
              <p>Professor,</p>
              <p>Dept. of CSE,</p>
              <p>Vardhaman College of Engineering,</p>
              <p>Hyderabad, India.</p>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
              <img src={male} alt="Male Profile Picture" />
              <h1>Dr. Rubén González Vallejo</h1>
              <p>Associate Professor,</p>
              <p>University of Malaga, Spain.</p>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
              <img src={male} alt="Male Profile Picture" />
              <h1>Mr. Drilon Krasniqi</h1>
              <p>Lecturer,</p>
              <p>
                Teachers' Professional Development, Education Efficacy,
                Education Policy.
              </p>
              <p>University of Hasan Prishtina, Kosovo.</p>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
              <img src={male} alt="Male Profile Picture" />
              <h1>Dr. Udaya Kumar Addanki</h1>
              <p>
                Senior Assistant Professor at Gayatri Vidya Parishad College of
                Engineering for Women(A),
              </p>
              <p>Ph.D. (CSE) in Acharya Nagarjuna University, India.</p>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
              <img src={male} alt="Male Profile Picture" />
              <h1>Dr. Raja Yateesh Yadav</h1>
              <p>Associate Professor,</p>
              <p>Department of Mechanical Engineering,</p>
              <p>SMVITM Bantakal,</p>
              <p>Karnataka, India.</p>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
              <img src={female} alt="Female Profile Picture" />
              <h1>Dr.M.Sujithra</h1>
              <p>Associate Professor,</p>
              <p>Department of Computing,</p>
              <p>Coimbatore Institute of Technology, India.</p>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
              <img src={male} alt="Male Profile Picture" />
              <h1>Dr. Ganesh kumar</h1>
              <p>Lecturer,</p>
              <p>Computer and Information Sciences,</p>
              <p>Universiti Teknologi PETRONAS (UTP), Malaysia.</p>
            </div>
            {/* <Skeleton /> */}
          </section>
        </div>
        <div style={{ marginTop: "50px" }}>
          <span className="mini_head">Committee Division</span>
          <h1 className="main_head bottom_bar_left">Review Committee</h1>
          <section className="keynote_speaker">
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
              <img src={female} alt="Female Profile Picture" />
              <h1>Dr. Norhaya Hanum Binti Mohamad</h1>
              <p>Senior Lecturer,</p>
              <p>Faculty of Hotel &Tourism Management,</p>
              <p>Universiti Teknologi MARA, Malaysia.</p>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
              <img src={male} alt="Male Profile Picture" />
              <h1>Dr. Abdul Mateen Ahmed</h1>
              <p>Associate Professor & Head of Department (EE),</p>
              <p>ISL Engineering College, Osmania University,</p>
              <p>
                Dean of Research & Development | MSME Convener | Institute
                Innovation Council (IIC).
              </p>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
              <img src={male} alt="Male Profile Picture" />
              <h1>Dr. Laxmi Narayan Soni</h1>
              <p>Assistant Professor,</p>
              <p>Dept.of Computer Science and Engineering,</p>
              <p>AKS University, India.</p>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
              <img src={male} alt="Male Profile Picture" />
              <h1>Dr. Jhonnel J. Abalajon</h1>
              <p>
                Assistant Professor I & Gender and Development Focal Person,
              </p>
              <p>Hospitality Management,</p>
              <p>Capiz State University, Philippines.</p>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
              <img src={male} alt="Male Profile Picture" />
              <h1>Dr. Mamatha I</h1>
              <p>Associate Professor,</p>
              <p>Department of Artificial Intelligence and Machine Learning,</p>
              <p>SMVITM Bantakal,</p>
              <p>Karnataka, India.</p>
            </div>
            {/* <Skeleton /> */}
          </section>
        </div>
      </section>
    </div>
  );
};

export default Committee;
