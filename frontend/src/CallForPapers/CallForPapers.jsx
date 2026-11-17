import "./CallForPapers.css";
import { Link } from "react-router-dom";
import sessoion1 from "../assets/sessions/session1.png";
import sessoion2 from "../assets/sessions/session2.png";
import sessoion3 from "../assets/sessions/session3.png";
import sessoion4 from "../assets/sessions/session4.png";
import sessoion5 from "../assets/sessions/session5.png";
import SEO from "../SEO";
import { conferenceEventSchema, SITE_URL } from "../seoSchemas";
import Deadline from "../Home/Deadline/Deadline.jsx";

const TRACKS = [
  {
    id: "t1",
    name: "Engineering and Technical Advancements",
    img: sessoion1,
    topics: [
      "Advanced Materials and Nanotechnology",
      "Artificial Intelligence and Machine Learning",
      "Biomedical Engineering",
      "Civil Engineering",
      "Cybersecurity in Engineering and Critical Infrastructure",
      "Digital Image Processing",
      "Emerging Technologies in Aerospace and Automotive Engineering",
      "Geographic Information Systems (GIS)",
      "IoT, Big Data and Automation in Modern Manufacturing",
      "Mechanical Engineering",
      "Renewable Energy and Waste Management",
      "Satellite Communication Systems",
      "Soft Computing",
      "Telecommunication and 5G Technology",
      "Water Resources and Environmental Engineering",
      "Architecture",
      "Bioengineering",
      "Chemical Engineering",
      "Cloud Computing",
      "Data Analytics",
      "Digital Transformation and Industry 4.0",
      "Electronic Computer-Aided Design (ECAD)",
      "Industrial Engineering",
      "Mathematical Modelling",
      "Power & Energy Engineering",
      "Robotics and Automation",
      "Smart Cities and Urban Development",
      "Sustainable Engineering and Green Technologies",
      "Virtual Reality",
      "Wireless/Mobile Communication",
    ],
  },
  {
    id: "t2",
    name: "Physical and Life Science",
    img: sessoion2,
    topics: [
      "Biochemistry and Biotechnology",
      "Cancer Research and Immunology",
      "Chemistry",
      "Ecology and Environmental Science",
      "Geology and Earth Sciences",
      "Mathematics and Theoretical Physics",
      "Molecular Biology and Genetics",
      "Physics of Materials and Condensed Matter",
      "Quantum Biology",
      "Astronomy and Astrophysics",
      "Biomedical Science and Public Health",
      "Cellular and Molecular Neuroscience",
      "Computational Biology and Bioinformatics",
      "Forestry",
      "Marine and Aquatic Sciences",
      "Microbiology and Virology",
      "Nanoscience and Nanotechnology in Life Sciences",
      "Plant and Agricultural Sciences",
      "Synthetic Biology and Genetic Engineering",
    ],
  },
  {
    id: "t3",
    name: "Business & Management Studies",
    img: sessoion3,
    topics: [
      "Accounting and Financial Reporting",
      "Business Ethics and Corporate Governance",
      "Digital Marketing",
      "Emerging Markets and Economic Development",
      "Financial Management and Investment Strategies",
      "Human Resource Management and Organizational Behavior",
      "Innovation Management and Product Development",
      "Marketing and Consumer Behavior",
      "Strategic Management and Leadership",
      "Tourism and Hospitality Management",
      "Business Analytics and Data Science",
      "Corporate Social Responsibility (CSR) and Sustainability",
      "Digital Transformation and E-Business",
      "Entrepreneurship and Startups",
      "Global Business and International Trade",
      "Innovation in Education and Knowledge Management",
      "IT Governance & E-business",
      "Project Management and Agile Methodologies",
      "Supply Chain and Operations Management",
    ],
  },
  {
    id: "t4",
    name: "Emerging Technologies & Education",
    img: sessoion4,
    topics: [
      "Artificial Intelligence and Machine Learning in Education",
      "Data Analytics and Learning Analytics",
      "Digital Transformation in Education",
      "Educational Robotics and STEM Education Innovations",
      "E-learning",
      "Gamification and Game-Based Learning",
      "Hybrid Learning Models and Flexible Education",
      "Innovations in Education Raising Scientific Literacy",
      "Internet of Things (IoT) and Smart Learning Environments",
      "Music Education",
      "Social Media and Collaborative Learning",
      "Augmented Reality (AR) and Virtual Reality (VR) in the Classroom",
      "Digital Literacy and 21st Century Skills Development",
      "EdTech Startups and Innovation in Education",
      "Educational Technology",
      "Emerging Tech in Vocational and Technical Training",
      "Health & Sports Education",
      "Imaginative Education",
      "Innovative Teaching Methods",
      "Language Education",
      "Quality and Standards in Educational Curriculum & Pedagogy",
      "Special Education, Learning Difficulties and Learner Diversity",
    ],
  },
  {
    id: "t5",
    name: "Social Sciences and Humanities",
    img: sessoion5,
    topics: [
      "Arts, Literature and Creative Expression",
      "Anthropology",
      "Cultural Studies and Globalization",
      "Educational Theories and Learning Practices",
      "Gender Studies and Women’s Empowerment",
      "Health, Wellness and Society",
      "Human Rights and Social Justice",
      "Law",
      "Media Studies and Communication",
      "Philosophy and Ethics in Contemporary Society",
      "Psychology and Human Development",
      "Sociology of Technology and Digital Societies",
      "Archaeology",
      "Criminology and Legal Studies",
      "Economics and Societal Development",
      "Environmental Humanities and Social Impact",
      "Geography",
      "History and the Modern World",
      "Journalism",
      "Linguistics and Language Studies",
      "Migration, Diaspora and Transnational Communities",
      "Political Science and Public Policy",
      "Religious Spirituality and Society",
      "Urban Studies and Community Development",
    ],
  },
];

const pad = (n) => String(n).padStart(2, "0");

export default function CallForPapers({ accent = "#0B6E6E" }) {
  return (
    <>
      <SEO
        title="Call for Papers | Multidisciplinary Research Conference"
        description="Submit your research paper to WCMRP 2027. Explore five multidisciplinary research tracks covering engineering, life sciences, business, education, technology, social sciences and humanities."
        keywords="WCMRP 2027 call for papers, call for papers 2027, international conference paper submission, multidisciplinary research topics, engineering research conference, physical and life sciences conference, business management research, educational technology conference, social sciences conference, humanities research conference, academic paper submission"
        path="/Session-Tracks-&-Call-For-Papers"
        jsonLd={{
          ...conferenceEventSchema,
          url: `${SITE_URL}/Session-Tracks-&-Call-For-Papers`,
        }}
      />
      <div className="cfp" style={{ "--accent": accent }}>
        <div className="speaker_head session_img">
          <div>
            <span>
              <Link to="/">Home</Link> » Session Tracks
            </span>
            <h1>
              Session Tracks / <br /> Call for Papers
            </h1>
            <p>
              We invite scholars, academicians and practitioners to share
              groundbreaking <br /> perspectives across various fields to
              advance interdisciplinary innovations.
            </p>
          </div>
        </div>

        <section
          className="cfp__picker"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <div
            className="cfp__picker-inner"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <p className="cfp__eyebrow">Choose your track</p>
            <div className="cfp__cards">
              {TRACKS.map((t, i) => (
                <a key={t.id} className="cfp__card" href={`#${t.id}`}>
                  <span className="cfp__card-num">{pad(i + 1)}</span>
                  <span className="cfp__h cfp__card-name">{t.name}</span>
                  <span className="cfp__card-count">
                    {t.topics.length} topics
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {TRACKS.map((t, i) => (
          <section
            key={t.id}
            id={t.id}
            className={`cfp__track${i % 2 === 1 ? " cfp__track--alt" : ""}`}
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <div
              className="cfp__row"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
            >
              <div className="cfp__left">
                <img className="cfp__track-img" src={t.img} alt={t.name} />
              </div>
              <ul className="cfp__right cfp__chips">
                <div>
                  <p className="cfp__eyebrow">Track {pad(i + 1)}</p>
                  <h2 className="cfp__h cfp__track-title">{t.name}</h2>
                  <p className="cfp__track-note">
                    Select a topic domain below to submit your manuscript for
                    presentation.
                  </p>
                </div>
                {t.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
      <Deadline />
    </>
  );
}
