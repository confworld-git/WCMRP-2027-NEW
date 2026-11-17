import "./Highlights.css";
import {
  PiUsersThreeFill,
  PiMicrophoneStageFill,
  PiShareNetworkFill,
  PiChalkboardTeacherFill,
  PiBooksFill,
  PiBroadcastFill,
} from "react-icons/pi";
import cm from "../../assets/Images/corporate-membership.png";

const Highlights = () => {
  return (
    <div className="highlights" data-aos="fade-up" data-aos-anchor-placement="top-bottom" >
      <span>What Awaits You</span>
      <h1>Key Highlights</h1>
      <div>
        <p>
          Discover a conference experience designed to inspire collaboration,
          innovation and meaningful global engagement.
        </p>
        <div className="Hybrid">Hybrid · International · Research Focused</div>
      </div>
      <section className="highlight_list" data-aos="fade-up" data-aos-anchor-placement="top-bottom" >
        <div>
          <div>
            <PiUsersThreeFill />
          </div>
          <div>
            <h1>Interdisciplinary Collaboration</h1>
            <p>
              Foster innovative partnerships across diverse fields to tackle
              global challenges.
            </p>
            <span>Global Reach</span>
          </div>
        </div>
        <div>
          <div>
            <PiMicrophoneStageFill />
          </div>
          <div>
            <h1>Expert Speakers</h1>
            <p>
              Hear from leading researchers and thought leaders sharing insights
              on innovative methodologies and best practices.
            </p>
            <span>World-Class Speakers</span>
          </div>
        </div>
        <div>
          <div>
            <PiShareNetworkFill />
          </div>
          <div>
            <h1>Networking Opportunities</h1>
            <p>
              Connect with professionals, academics and practitioners from
              various disciplines.
            </p>
            <span>Build Connections</span>
          </div>
        </div>
        <div>
          <div>
            <PiChalkboardTeacherFill />
          </div>
          <div>
            <h1>Workshops and Panels</h1>
            <p>
              Participate in interactive sessions that encourage knowledge
              sharing and collaborative problem-solving.
            </p>
            <span>Interactive Sessions</span>
          </div>
        </div>
        <div>
          <div>
            <PiBooksFill />
          </div>
          <div>
            <h1>Publication Opportunities</h1>
            <p>
              Present your research and get it published in Scopus-indexed
              journals and Clarivate WoS proceedings.
            </p>
            <span>Scopus · WoS</span>
          </div>
        </div>
        <div>
          <div>
            <PiBroadcastFill />
          </div>
          <div>
            <h1>Hybrid Flexibility</h1>
            <p>
              Choose to attend in person or virtually, with full access to all
              sessions, materials and networking opportunities.
            </p>
            <span>In-Person & Virtual</span>
          </div>
        </div>
        <div>
          <img src={cm} alt="Cerada Awards" />
          <div>
            <h1 style={{fontSize:"30px"}}>CERADA Awards</h1>
            <p>
              The CERADA Awards recognize and celebrate outstanding achievements
              in research, innovation, leadership, and professional
              contribution. These prestigious awards honor individuals who
              demonstrate excellence, originality, and meaningful impact within
              their respective fields. Through the CERADA Awards, exceptional
              researchers, scholars, professionals, and innovators are
              acknowledged for their dedication to advancing knowledge,
              developing innovative ideas, inspiring others, and making valuable
              contributions to the academic and professional community.
            </p>
            <span style={{marginTop:"10px"}}>Prestigious Award</span>
            <span style={{marginTop:"10px"}}>Best Paper Award</span>
            <span style={{marginTop:"10px"}}>Best Paper Presentation Award</span>
            <span style={{marginTop:"10px"}}>Best Innovative Idea Award</span>
            <span style={{marginTop:"10px"}}>Leadership and Contribution Award</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Highlights;
